import { Link } from "react-router-dom";
import { siteContent } from "../content/siteContent";

export function NotFoundPage() {
    const { notFound } = siteContent;

    return (
        <section
            className="intro-panel page-panel error-panel"
            aria-label={notFound.title}
        >
            <div>
                {notFound.kicker ? (
                    <p className="section-kicker">{notFound.kicker}</p>
                ) : null}
                <h1>{notFound.title}</h1>
            </div>
            <div className="intro-copy">
                <p>{notFound.body}</p>
                <div className="hero-actions">
                    <Link
                        className="button button-primary"
                        to={notFound.cta.to}
                    >
                        {notFound.cta.label}
                    </Link>
                </div>
            </div>
        </section>
    );
}
