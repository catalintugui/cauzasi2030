import { siteContent } from "../../content/siteContent";
import { MapEmbed } from "./MapEmbed";

type MapSectionProps = {
    compact?: boolean;
};

export function MapSection({ compact = false }: MapSectionProps) {
    return (
        <section className={compact ? "map-panel" : "map-panel page-panel"}>
            <div className="section-heading">
                <p className="section-kicker">{siteContent.map.kicker}</p>
                <h2>{siteContent.map.title}</h2>
                <p>{siteContent.map.description}</p>
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
        </section>
    );
}
