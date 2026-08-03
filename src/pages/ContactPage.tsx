import { SocialLinks } from "../components/ui/SocialLinks";
import { siteContent } from "../content/siteContent";
import { emphasizePerimeter } from "../utils/emphasizePerimeter";

type ContactPageProps = {
    compact?: boolean;
};

export function ContactPage({ compact = false }: ContactPageProps) {
    const paragraphs = compact
        ? siteContent.contact.body.slice(0, 2)
        : siteContent.contact.body;
    const PanelTag = compact ? "div" : "section";

    if (compact) {
        return (
            <PanelTag className="contact-panel snap-panel">
                <div>
                    <p className="section-kicker">{siteContent.contact.kicker}</p>
                    <h2>{emphasizePerimeter(siteContent.contact.title)}</h2>
                    <div className="contact-copy">
                        {paragraphs.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
                <SocialLinks variant="cards" />
            </PanelTag>
        );
    }

    return (
        <PanelTag className="contact-panel page-panel">
            <header className="contact-panel__header">
                <p className="section-kicker">{siteContent.contact.kicker}</p>
                <h2>{emphasizePerimeter(siteContent.contact.title)}</h2>
            </header>

            <div className="contact-copy">
                {paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                ))}
            </div>

            <SocialLinks variant="cards" />
        </PanelTag>
    );
}
