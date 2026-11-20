import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SITE_ORIGIN = "https://cauzasi.ro";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/vision/01-strada-verde-trotuar-larg.webp`;
const BRAND = "Căuzași 2030";

const isRoot = process.argv.includes("--root");
const segmentCount = isRoot ? 0 : 1;
const rewriteBase = isRoot ? "/" : "/cauzasi2030/";
const indexPath = isRoot ? "/index.html" : "/cauzasi2030/index.html";

/** @typedef {{ path: string; title: string; description: string; image?: string }} PageSeo */

/** Keep in sync with src/seo.ts page metadata. */
/** @type {Record<string, PageSeo>} */
const routeSeo = {
  harta: {
    path: "/harta",
    title: `Hartă cartier — ${BRAND}`,
    description:
      "Descoperă harta zonei Căuzași – Matei Basarab – Anton Pann: locuri valoroase, probleme urbane și oportunități de regenerare.",
  },
  voluntari: {
    path: "/voluntari",
    title: `Voluntari — ${BRAND}`,
    description:
      "Alătură-te echipei Căuzași 2030: comunitate, PR, fundraising, evenimente, research și coordonare de voluntari în cartier.",
  },
  actiuni: {
    path: "/actiuni",
    title: `Implică-te și donează — ${BRAND}`,
    description:
      "Susține Asociația Cartier Viu și proiectul Căuzași 2030: chestionar, petiție, donații, Formular 230 și sponsorizări.",
  },
  evenimente: {
    path: "/evenimente",
    title: `Evenimente — ${BRAND}`,
    description:
      "De la activări de stradă la momente culturale și întâlniri de cartier — aici anunțăm evenimentele Căuzași 2030.",
  },
  "evenimente/mahala-negustoreasca": {
    path: "/evenimente/mahala-negustoreasca",
    title: `Descoperă comorile ascunse ale mahalalei negustorești — ${BRAND}`,
    description:
      "O zi de tur ghidat, pauză la CIZ Wine Bar, vizită privată la Muzeul Recordurilor Românești și proiecție de scurtmetraje One World Romania în curtea Bisericii „Radu Ceauș”.",
    image: `${SITE_ORIGIN}/events/mahala-negustoreasca/hero.jpg`,
  },
  prieteni: {
    path: "/prieteni",
    title: `Prieteni și parteneri — ${BRAND}`,
    description:
      "Devino partener al Căuzași 2030: donații, sponsorizări, servicii pro bono și sprijin pentru regenerarea cartierului.",
  },
  echipa: {
    path: "/echipa",
    title: `Echipa și Asociația Cartier Viu — ${BRAND}`,
    description:
      "Cunoaște echipa din spatele Căuzași 2030 și viziunea, misiunea și valorile Asociației Cartier Viu.",
  },
  contact: {
    path: "/contact",
    title: `Contact — ${BRAND}`,
    description:
      "Scrie-ne la salut@cauzasi.ro sau pe social media. Locuiești în zona Căuzași, Matei Basarab sau Anton Pann? Implică-te.",
  },
};

const spaRoutes = Object.keys(routeSeo);

/**
 * @param {string} path
 */
function absoluteUrl(path) {
  if (path === "/") {
    return `${SITE_ORIGIN}/`;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  // Match Apache directory URLs (…/harta/ → harta/index.html).
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `${SITE_ORIGIN}${withSlash}`;
}

/**
 * @param {string} html
 * @param {PageSeo} seo
 */
function applySeoToHtml(html, seo) {
  const url = absoluteUrl(seo.path);
  const image = seo.image ?? DEFAULT_OG_IMAGE;
  const escapedDescription = seo.description
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");

  return html
    .replace(
      /<title>[\s\S]*?<\/title>/,
      `<title>${seo.title}</title>`,
    )
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta\n            name="description"\n            content="${escapedDescription}"\n        />`,
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${url}" />`,
    )
    .replace(
      /<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/,
      `<meta\n            property="og:title"\n            content="${seo.title}"\n        />`,
    )
    .replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
      `<meta\n            property="og:description"\n            content="${escapedDescription}"\n        />`,
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${url}" />`,
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta\n            property="og:image"\n            content="${image}"\n        />`,
    )
    .replace(
      /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/,
      `<meta\n            name="twitter:title"\n            content="${seo.title}"\n        />`,
    )
    .replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
      `<meta\n            name="twitter:description"\n            content="${escapedDescription}"\n        />`,
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta\n            name="twitter:image"\n            content="${image}"\n        />`,
    );
}

const distIndexPath = join("dist", "index.html");
const indexHtml = readFileSync(distIndexPath, "utf8");

const spaBootstrap = `<script>
(function (locationRef) {
  if (locationRef.search[1] === "/") {
    var decoded = locationRef.search
      .slice(1)
      .split("&")
      .map(function (segment) {
        return segment.replace(/~and~/g, "&");
      })
      .join("?");
    window.history.replaceState(
      null,
      null,
      locationRef.pathname.slice(0, -1) + decoded + locationRef.hash
    );
  }
})(window.location);
</script>`;

let rootHtml = indexHtml;
if (!rootHtml.includes("locationRef.search[1]")) {
  rootHtml = rootHtml.replace("</head>", `    ${spaBootstrap}\n  </head>`);
  writeFileSync(distIndexPath, rootHtml);
}

// Hostico/cPanel: keep the static branded 404 from public/404.html.
// GitHub Pages: overwrite with the SPA redirect stub.
if (!isRoot) {
  const redirect404 = `<!DOCTYPE html>
<html lang="ro">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <script>
      var segmentCount = ${segmentCount};
      var locationRef = window.location;
      locationRef.replace(
        locationRef.protocol +
          "//" +
          locationRef.hostname +
          (locationRef.port ? ":" + locationRef.port : "") +
          locationRef.pathname
            .split("/")
            .slice(0, 1 + segmentCount)
            .join("/") +
          "/?/" +
          locationRef.pathname
            .slice(1)
            .split("/")
            .slice(segmentCount)
            .join("/")
            .replace(/&/g, "~and~") +
          (locationRef.search
            ? "&" + locationRef.search.slice(1).replace(/&/g, "~and~")
            : "") +
          locationRef.hash
      );
    </script>
  </head>
  <body></body>
</html>
`;
  writeFileSync(join("dist", "404.html"), redirect404);
} else if (!readFileSync(join("dist", "404.html"), "utf8").includes("Pagina nu a fost")) {
  copyFileSync(join("public", "404.html"), join("dist", "404.html"));
}

writeFileSync(join("dist", ".nojekyll"), "");

const distIndexHtml = readFileSync(distIndexPath, "utf8");
for (const route of spaRoutes) {
  const seo = routeSeo[route];
  const routeDir = join("dist", route);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, "index.html"), applySeoToHtml(distIndexHtml, seo));
}

const hostRedirect = isRoot
  ? `# www → apex (HTTPS)
  RewriteCond %{HTTP_HOST} ^www\\.cauzasi\\.ro$ [NC]
  RewriteRule ^ https://cauzasi.ro%{REQUEST_URI} [R=301,L]

  # HTTP → HTTPS (skip when TLS is terminated upstream)
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !https [NC]
  RewriteRule ^ https://cauzasi.ro%{REQUEST_URI} [R=301,L]

  # Avoid indexing /index.html as a separate URL
  RewriteRule ^index\\.html$ / [R=301,L]
`
  : `# GitHub Pages / preview: do not force the production host.
`;

const htaccess = `DirectoryIndex index.html

<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase ${rewriteBase}

  ${hostRedirect}
  # SPA fallback only — avoid FallbackResource + ErrorDocument loops
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule ^ ${indexPath} [L]
</IfModule>
`;

writeFileSync(join("dist", ".htaccess"), htaccess);
