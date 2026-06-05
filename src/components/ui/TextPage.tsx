import type { TextPageContent } from "../../content/siteContent";

type TextPageProps = {
    page: TextPageContent;
};

export function TextPage({ page }: TextPageProps) {
    return (
        <section className="story-panel page-panel" aria-label={page.kicker}>
            <div className="story-panel-heading">
                <p className="section-kicker">{page.kicker}</p>
                <h2>{page.title}</h2>
            </div>
            <div className="story-body">
                {page.body.map((paragraph, index) => (
                    <p
                        className={index === 0 ? "story-intro" : undefined}
                        key={paragraph}
                    >
                        {paragraph}
                    </p>
                ))}
                {page.contactLinks && (
                    <div className="text-page-contact">
                        <strong>Contacteazã-ne:</strong>
                        {page.contactLinks.map((link) => (
                            <a href={link.href} key={link.href}>
                                {link.label}
                            </a>
                        ))}
                    </div>
                )}
                {page.actions && (
                    <div className="hero-actions text-page-actions">
                        {page.actions.map((action) => (
                            <a
                                className="button button-primary"
                                href={action.href}
                                key={action.href}
                                rel="noreferrer"
                                target="_blank"
                            >
                                {action.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
