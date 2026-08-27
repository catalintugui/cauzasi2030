import { getEventBySlug } from "./content/events";
import { siteContent } from "./content/siteContent";

export const SITE_ORIGIN = "https://cauzasi.ro";
export const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/vision/01-strada-verde-trotuar-larg.webp`;

export type PageSeo = {
    title: string;
    description: string;
    path: string;
    noindex?: boolean;
    image?: string;
};

const brand = siteContent.site.fullName;

const pages: Record<string, PageSeo> = {
    "/": {
        path: "/",
        title: `${brand} — comunitate, regenerare urbană, cartier viu`,
        description: siteContent.site.description,
    },
    "/harta": {
        path: "/harta",
        title: `Hartă cartier — ${brand}`,
        description:
            "Descoperă harta zonei Căuzași – Matei Basarab – Anton Pann: locuri valoroase, probleme urbane și oportunități de regenerare.",
    },
    "/voluntari": {
        path: "/voluntari",
        title: `Voluntari — ${brand}`,
        description:
            "Alătură-te echipei Căuzași 2030: comunitate, PR, fundraising, evenimente, research și coordonare de voluntari în cartier.",
    },
    "/actiuni": {
        path: "/actiuni",
        title: `Implică-te și donează — ${brand}`,
        description:
            "Susține Asociația Cartier Viu și proiectul Căuzași 2030: chestionar, petiție, donații, Formular 230 și sponsorizări.",
    },
    "/evenimente": {
        path: "/evenimente",
        title: `Evenimente — ${brand}`,
        description: siteContent.events.intro,
    },
    "/prieteni": {
        path: "/prieteni",
        title: `Prieteni și parteneri — ${brand}`,
        description:
            "Devino partener al Căuzași 2030: donații, sponsorizări, servicii pro bono și sprijin pentru regenerarea cartierului.",
    },
    "/echipa": {
        path: "/echipa",
        title: `Echipa și Asociația Cartier Viu — ${brand}`,
        description:
            "Cunoaște echipa din spatele Căuzași 2030 și viziunea, misiunea și valorile Asociației Cartier Viu.",
    },
    "/contact": {
        path: "/contact",
        title: `Contact — ${brand}`,
        description:
            "Scrie-ne la salut@cauzasi.ro sau pe social media. Locuiești în zona Căuzași, Matei Basarab sau Anton Pann? Implică-te.",
    },
};

const notFoundSeo: PageSeo = {
    path: "/",
    title: `Pagina nu a fost găsită — ${brand}`,
    description: siteContent.notFound.body,
    noindex: true,
};

export function getPageSeo(pathname: string): PageSeo {
    const normalized =
        pathname.length > 1 && pathname.endsWith("/")
            ? pathname.slice(0, -1)
            : pathname;

    if (pages[normalized]) {
        return pages[normalized];
    }

    const eventMatch = normalized.match(/^\/evenimente\/([^/]+)$/);
    if (eventMatch) {
        const event = getEventBySlug(eventMatch[1]);
        if (event) {
            return {
                path: normalized,
                title: `${event.title} — ${brand}`,
                description: event.summary,
                image: `${SITE_ORIGIN}${event.image}`,
            };
        }
    }

    return notFoundSeo;
}

export function absoluteUrl(path: string): string {
    if (path === "/") {
        return `${SITE_ORIGIN}/`;
    }
    return `${SITE_ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
}

function upsertMeta(
    attribute: "name" | "property",
    key: string,
    content: string,
) {
    const selector = `meta[${attribute}="${key}"]`;
    let element = document.head.querySelector<HTMLMetaElement>(selector);
    if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }
    element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
    let element = document.head.querySelector<HTMLLinkElement>(
        `link[rel="${rel}"]`,
    );
    if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
    }
    element.setAttribute("href", href);
}

function upsertJsonLd(id: string, data: Record<string, unknown>) {
    let element = document.getElementById(id) as HTMLScriptElement | null;
    if (!element) {
        element = document.createElement("script");
        element.type = "application/ld+json";
        element.id = id;
        document.head.appendChild(element);
    }
    element.textContent = JSON.stringify(data);
}

export function applyPageSeo(pathname: string) {
    const seo = getPageSeo(pathname);
    const url = absoluteUrl(seo.path);
    const robots = seo.noindex ? "noindex, follow" : "index, follow";
    const ogImage = seo.image ?? DEFAULT_OG_IMAGE;

    document.title = seo.title;
    upsertMeta("name", "description", seo.description);
    upsertMeta("name", "robots", robots);
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:locale", "ro_RO");
    upsertMeta("property", "og:site_name", brand);
    upsertMeta("property", "og:title", seo.title);
    upsertMeta("property", "og:description", seo.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", ogImage);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", seo.title);
    upsertMeta("name", "twitter:description", seo.description);
    upsertMeta("name", "twitter:image", ogImage);

    upsertJsonLd("seo-website-jsonld", {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: brand,
        alternateName: ["Cauzasi 2030", "Căuzași2030"],
        url: `${SITE_ORIGIN}/`,
        description: siteContent.site.description,
        inLanguage: "ro-RO",
        publisher: {
            "@type": "Organization",
            name: siteContent.footer.copyrightHolder,
            url: `${SITE_ORIGIN}/`,
            email: "salut@cauzasi.ro",
            sameAs: [
                "https://www.instagram.com/cauzasi2030",
                "https://www.facebook.com/PaginaCauzasiAntonPann",
            ],
        },
    });
}
