import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const isRoot = process.argv.includes("--root");
const segmentCount = isRoot ? 0 : 1;
const rewriteBase = isRoot ? "/" : "/cauzasi2030/";
const indexPath = isRoot ? "/index.html" : "/cauzasi2030/index.html";
const spaRoutes = [
  "harta",
  "voluntari",
  "actiuni",
  "evenimente",
  "evenimente/vecini-pe-parfumului",
  "prieteni",
  "echipa",
  "contact",
];

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

if (!indexHtml.includes("locationRef.search[1]")) {
  writeFileSync(
    distIndexPath,
    indexHtml.replace("</head>", `    ${spaBootstrap}\n  </head>`),
  );
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

const distIndex = join("dist", "index.html");
for (const route of spaRoutes) {
  const routeDir = join("dist", route);
  mkdirSync(routeDir, { recursive: true });
  copyFileSync(distIndex, join(routeDir, "index.html"));
}

const htaccess = `DirectoryIndex index.html

<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>

<IfModule mod_dir.c>
  FallbackResource ${indexPath}
</IfModule>

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase ${rewriteBase}
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule ^ ${indexPath} [L]
</IfModule>

ErrorDocument 404 ${indexPath}
`;

writeFileSync(join("dist", ".htaccess"), htaccess);
