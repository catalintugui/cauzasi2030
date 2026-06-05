import { SocialLinks } from "../components/ui/SocialLinks";
import { siteContent } from "../content/siteContent";

export function ContactPage() {
    return (
        <section className="contact-panel page-panel">
            <div>
                <p className="section-kicker">{siteContent.contact.kicker}</p>
                <h2>{siteContent.contact.title}</h2>
                <div className="contact-copy">
                    {Array.isArray(siteContent.contact.body) ? (
                        siteContent.contact.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))
                    ) : (
                        <p>{siteContent.contact.body}</p>
                    )}
                </div>
            </div>
            <SocialLinks variant="cards" />
        </section>
    );
}
