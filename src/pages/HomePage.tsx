import { useState } from "react";
import { Link } from "react-router-dom";
import { EventWelcomePopup } from "../components/ui/EventWelcomePopup";
import { VisionSlider } from "../components/ui/VisionSlider";
import { heritageSlides } from "../content/heritageSlides";
import { streetSlides } from "../content/streetSlides";
import { visionSlides } from "../content/visionSlides";
import { siteContent } from "../content/siteContent";
import { withBase } from "../utils/withBase";

export function HomePage() {
    const [isStoryExpanded, setIsStoryExpanded] = useState(false);
    const [firstParagraph, secondParagraph, ...hiddenParagraphs] =
        siteContent.home.story.intro;
    const { achievements, plans } = siteContent.home.progress;

    return (
        <section className="home-page" aria-label={siteContent.home.title}>
            <EventWelcomePopup />
            <article className="home-card">
                <header className="home-card__header">
                    <p className="section-kicker">{siteContent.home.kicker}</p>
                    <h1>{siteContent.home.title}</h1>
                    <p className="home-card__lead">
                        {siteContent.home.project.lead}
                    </p>
                </header>

                <div className="home-card__slider">
                    <VisionSlider slides={visionSlides} size="large" />
                </div>

                <p className="home-card__lead home-card__lead--after-slider">
                    {siteContent.home.project.closing}
                </p>

                <div className="home-card__section">
                    <h2 className="home-card__section-title">
                        {siteContent.home.story.title}
                    </h2>
                    <div className="home-card__intro">
                        <p>{firstParagraph}</p>
                        <p>
                            {secondParagraph}{" "}
                            <button
                                className="read-more-toggle"
                                type="button"
                                onClick={() =>
                                    setIsStoryExpanded((expanded) => !expanded)
                                }
                            >
                                {isStoryExpanded
                                    ? "Arată mai puțin"
                                    : "Citește mai mult..."}
                            </button>
                        </p>
                    </div>

                    {isStoryExpanded ? (
                        <div className="home-card__body">
                            {hiddenParagraphs.map((paragraph, index) => (
                                <p key={index + 2}>{paragraph}</p>
                            ))}
                        </div>
                    ) : null}
                </div>

                <div className="home-card__slider">
                    <VisionSlider slides={heritageSlides} size="large" />
                </div>

                <div className="home-card__section">
                    <h2 className="home-card__section-title">
                        {siteContent.home.streetSituation.title}
                    </h2>
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
                    <h2 className="home-card__section-title">
                        {siteContent.home.visionProposals.title}
                    </h2>
                    <ul className="home-card__issue-list">
                        {siteContent.home.visionProposals.proposals.map(
                            (proposal) => (
                                <li key={proposal}>{proposal}</li>
                            ),
                        )}
                    </ul>
                </div>

                <div className="home-card__progress">
                    <article className="home-progress-card">
                        <img
                            className="home-progress-card__icon"
                            src={withBase(achievements.icon)}
                            alt=""
                            aria-hidden="true"
                        />
                        <h2 className="home-card__section-title">
                            {achievements.title}
                        </h2>
                        <ul className="home-card__issue-list home-card__issue-list--stacked">
                            {achievements.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </article>

                    <article className="home-progress-card">
                        <img
                            className="home-progress-card__icon"
                            src={withBase(plans.icon)}
                            alt=""
                            aria-hidden="true"
                        />
                        <h2 className="home-card__section-title">
                            {plans.title}
                        </h2>
                        <ul className="home-card__issue-list home-card__issue-list--stacked">
                            {plans.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </article>
                </div>

                <div className="home-card__actions">
                    <Link
                        className="button button-primary"
                        to={siteContent.home.cta.to}
                    >
                        {siteContent.home.cta.label}
                    </Link>
                </div>
            </article>
        </section>
    );
}
