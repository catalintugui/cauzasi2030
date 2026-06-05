import { siteContent } from "../../content/siteContent";

export function MapEmbed() {
    return (
        <div className="map-frame">
            <iframe
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={siteContent.map.embedUrl}
                title={siteContent.map.iframeTitle}
            />
        </div>
    );
}
