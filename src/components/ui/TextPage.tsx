import type { TextPageContent } from "../../content/siteContent";
import { emphasizePerimeter } from "../../utils/emphasizePerimeter";

type TextPageProps = {
    page: TextPageContent;
    compact?: boolean;
    fullWidthActions?: boolean;
};

export function TextPage({
    page,
    compact = false,
    fullWidthActions = false,
}: TextPageProps) {
    const paragraphs = compact ? page.body.slice(0, 2) : page.body;
    const PanelTag = compact ? "div" : "section";

    return (
        <PanelTag
            className={compact ? "story-panel snap-panel" : "story-panel page-panel"}
            aria-label={page.kicker}
        >
            <div className="story-panel-heading">
                <p className="section-kicker">{page.kicker}</p>
                <h2>{emphasizePerimeter(page.title)}</h2>
            </div>
            <div className="story-body">
                {paragraphs.map((paragraph, index) => (
                    <p
                        className={index === 0 ? "story-intro" : undefined}
                        key={paragraph}
                    >
                        {emphasizePerimeter(paragraph)}
                    </p>
                ))}
                {page.footnote && (
                    <p className="story-footnote">
                        <span aria-hidden="true">* </span>
                        {page.footnote}
                    </p>
                )}
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
                    <div
                        className={[
                            "hero-actions text-page-actions",
                            fullWidthActions ? "text-page-actions--full" : "",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                    >
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
        </PanelTag>
    );
}
