import { Link } from "react-router-dom";
import { getFeaturedEvent, getFeaturedEventPath } from "../../content/eventPromo";
import { siteContent } from "../../content/siteContent";
import { useEventPromo } from "../../context/EventPromoContext";
import { EventMeta } from "../ui/EventMeta";

export function EventPromoBanner() {
    const { shouldShowBanner } = useEventPromo();
    const event = getFeaturedEvent();
    const path = getFeaturedEventPath();

    if (!shouldShowBanner || !event || !path) {
        return null;
    }

    return (
        <aside className="event-promo-banner" aria-label={event.title}>
            <div className="event-promo-banner__inner">
                <div className="event-promo-banner__copy">
                    <p className="event-promo-banner__title">{event.title}</p>
                    <EventMeta date={event.date} location={event.location} />
                </div>
                <Link className="event-promo-banner__link" to={path}>
                    {siteContent.events.readMoreLabel}
                </Link>
            </div>
        </aside>
    );
}
