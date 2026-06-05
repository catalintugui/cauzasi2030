import { Link } from "react-router-dom";
import { MapEmbed } from "../components/ui/MapEmbed";
import { siteContent } from "../content/siteContent";

export function HomePage() {
    const streetList =
        "Matei Basarab, Romulus, Parfumului, Anton Pann, Căuzași, Ion Filibiliu, Zossima Demarat, Vintilă Vodă, Radu Ceauș și Vulturilor";
    const [leadBeforeStreetList, leadAfterStreetList] =
        siteContent.home.lead.split(streetList);

    return (
        <>
            <section className="story-hero">
                <div className="story-hero-grid">
                    <div className="story-copy">
                        <p className="section-kicker">
                            {siteContent.home.kicker}
                        </p>
                        <h1>{siteContent.home.title}</h1>
                        <p className="hero-lead">
                            {leadBeforeStreetList}
                            <strong>{streetList}</strong>
                            {leadAfterStreetList}
                        </p>
                    </div>

                    <aside
                        className="hero-map-card"
                        aria-label={siteContent.home.map.ariaLabel}
                    >
                        <div className="hero-map-heading">
                            <p>{siteContent.home.map.kicker}</p>
                        </div>
                        <MapEmbed />
                        <a
                            className="map-link"
                            href={siteContent.map.externalUrl}
                            rel="noreferrer"
                            target="_blank"
                        >
                            {siteContent.map.openLabel}
                        </a>
                    </aside>
                </div>
            </section>

            <section className="story-panel" aria-label="Povestea Căuzași 2030">
                <div className="story-panel-heading">
                    <p className="section-kicker">Viziune</p>
                    <h2>
                        Un cartier viu, sigur, verde și demn de istoria lui.
                    </h2>
                </div>
                <div className="story-body">
                    {siteContent.home.story.map((paragraph, index) => (
                        <p
                            className={index === 0 ? "story-intro" : undefined}
                            key={paragraph}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            <section
                className="story-actions"
                aria-label={siteContent.home.actionsAriaLabel}
            >
                <div>
                    <p className="section-kicker">Participă</p>
                    <h2>Schimbarea poate începe acum.</h2>
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
            </section>
        </>
    );
}
