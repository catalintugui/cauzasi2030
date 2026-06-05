import { siteContent } from "../content/siteContent";

type AboutPageProps = {
    compact?: boolean;
};

export function AboutPage({ compact = false }: AboutPageProps) {
    return (
        <section
            className={compact ? "intro-panel" : "intro-panel page-panel"}
            aria-label={siteContent.about.ariaLabel}
        >
            <div>
                <p className="section-kicker">{siteContent.about.kicker}</p>
                <h2>{siteContent.about.title}</h2>
            </div>
            <div className="intro-copy">
                {Array.isArray(siteContent.about.body) ? (
                    siteContent.about.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))
                ) : (
                    <p>{siteContent.about.body}</p>
                )}
            </div>
        </section>
    );
}
