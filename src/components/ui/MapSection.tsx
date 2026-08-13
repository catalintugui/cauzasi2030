import { Link } from "react-router-dom";
import { siteContent } from "../../content/siteContent";
import { withBase } from "../../utils/withBase";
import { MapEmbed } from "./MapEmbed";

type MapSectionProps = {
    compact?: boolean;
    snap?: boolean;
};

export function MapSection({ compact = false, snap = false }: MapSectionProps) {
    const PanelTag = snap ? "div" : "section";
    const HeadingTag = compact || snap ? "h2" : "h1";

    return (
        <PanelTag
            className={[
                "map-panel",
                compact || snap ? "snap-panel" : "page-panel",
                snap ? "map-panel--snap" : "",
            ]
                .filter(Boolean)
                .join(" ")}
        >
            <div className="map-panel-heading">
                <p className="section-kicker">{siteContent.map.kicker}</p>
                <HeadingTag>{siteContent.map.title}</HeadingTag>
            </div>
            {!snap && (
                <div className="map-panel-copy">
                    <p>{siteContent.map.intro}</p>
                </div>
            )}
            {!snap && siteContent.map.graphic ? (
                <figure className="map-panel-graphic">
                    <img
                        src={withBase(siteContent.map.graphic.src)}
                        alt={siteContent.map.graphic.alt}
                    />
                </figure>
            ) : null}
            <MapEmbed interactive={!snap} />
            {!snap && (
                <div className="map-panel-copy">
                    {siteContent.map.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            )}
            {!snap && siteContent.map.cta ? (
                <div className="map-panel-actions">
                    <Link
                        className="button button-primary"
                        to={siteContent.map.cta.to}
                    >
                        {siteContent.map.cta.label}
                    </Link>
                </div>
            ) : null}
        </PanelTag>
    );
}
