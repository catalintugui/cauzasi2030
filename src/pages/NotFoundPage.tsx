import { Link } from "react-router-dom";
import { siteContent } from "../content/siteContent";

export function NotFoundPage() {
    return (
        <section className="intro-panel page-panel" aria-label={siteContent.notFound.kicker}>
            <div>
                <p className="section-kicker">{siteContent.notFound.kicker}</p>
                <h1>{siteContent.notFound.title}</h1>
            </div>
            <div className="intro-copy">
                <p>{siteContent.notFound.body}</p>
                <div className="hero-actions">
                    <Link
                        className="button button-primary"
                        to={siteContent.notFound.cta.to}
                    >
                        {siteContent.notFound.cta.label}
                    </Link>
                </div>
            </div>
        </section>
    );
}
