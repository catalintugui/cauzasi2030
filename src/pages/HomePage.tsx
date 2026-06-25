import { Link } from "react-router-dom";
import { VisionSlider } from "../components/ui/VisionSlider";
import { siteContent } from "../content/siteContent";

export function HomePage() {
    return (
        <section
            className="story-hero"
            aria-label={siteContent.home.title}
        >
            <div className="story-copy story-copy--solo">
                <p className="section-kicker">{siteContent.home.kicker}</p>
                <h1>{siteContent.home.title}</h1>
                <div className="hero-split">
                    <div className="hero-split-copy">
                        {siteContent.home.intro.slice(0, 2).map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                    <VisionSlider />
                </div>
                <div className="hero-intro">
                    {siteContent.home.intro.slice(2).map((paragraph, index) => (
                        <p key={index + 2}>{paragraph}</p>
                    ))}
                </div>
                <div className="hero-actions">
                    <Link
                        className="button button-primary"
                        to={siteContent.home.primaryAction.to}
                    >
                        {siteContent.home.primaryAction.label}
                    </Link>
                    <a
                        className="button button-secondary"
                        href={siteContent.home.secondaryAction.href}
                        rel="noreferrer"
                        target="_blank"
                    >
                        {siteContent.home.secondaryAction.label}
                    </a>
                </div>
            </div>
        </section>
    );
}
