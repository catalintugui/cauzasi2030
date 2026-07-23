import { useState } from "react";
import { Link } from "react-router-dom";
import { VisionSlider } from "../components/ui/VisionSlider";
import { heritageSlides } from "../content/heritageSlides";
import { streetSlides } from "../content/streetSlides";
import { visionSlides } from "../content/visionSlides";
import { siteContent } from "../content/siteContent";

export function HomePage() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [firstParagraph, secondParagraph, ...hiddenParagraphs] =
        siteContent.home.intro;

    return (
        <section className="home-page" aria-label={siteContent.home.title}>
            <article className="home-card">
                <header className="home-card__header">
                    <p className="section-kicker">{siteContent.home.kicker}</p>
                    <h1>{siteContent.home.title}</h1>
                </header>

                <div className="home-card__intro">
                    <p>{firstParagraph}</p>
                    <p>
                        {secondParagraph}{" "}
                        <button
                            className="read-more-toggle"
                            type="button"
                            onClick={() => setIsExpanded((expanded) => !expanded)}
                        >
                            {isExpanded
                                ? "Arată mai puțin"
                                : "Citește mai mult..."}
                        </button>
                    </p>
                </div>

                {isExpanded ? (
                    <div className="home-card__body">
                        {hiddenParagraphs.map((paragraph, index) => (
                            <p key={index + 2}>{paragraph}</p>
                        ))}
                    </div>
                ) : null}

                <div className="home-card__slider">
                    <VisionSlider slides={heritageSlides} size="large" />
                </div>

                <div className="home-card__section">
                    <h1>{siteContent.home.streetSituation.title}</h1>
                    <ul className="home-card__issue-list">
                        {siteContent.home.streetSituation.issues.map((issue) => (
                            <li key={issue}>{issue}</li>
                        ))}
                    </ul>
                </div>

                <div className="home-card__slider">
                    <VisionSlider slides={streetSlides} size="large" />
                </div>

                <div className="home-card__section">
                    <h1>{siteContent.home.visionProposals.title}</h1>
                    <ul className="home-card__issue-list">
                        {siteContent.home.visionProposals.proposals.map(
                            (proposal) => (
                                <li key={proposal}>{proposal}</li>
                            ),
                        )}
                    </ul>
                </div>

                <div className="home-card__slider">
                    <VisionSlider slides={visionSlides} size="large" />
                </div>

                <div className="home-card__actions">
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
            </article>
        </section>
    );
}
