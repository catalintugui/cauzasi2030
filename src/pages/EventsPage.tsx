import { Link } from "react-router-dom";
import { EventMeta } from "../components/ui/EventMeta";
import { eventPath } from "../content/events";
import { siteContent } from "../content/siteContent";
import { withBase } from "../utils/withBase";

export function EventsPage() {
    const { kicker, title, intro, readMoreLabel, items } = siteContent.events;

    return (
        <section className="events-page page-section" aria-label={title}>
            <div className="section-heading">
                <p className="section-kicker">{kicker}</p>
                <h1>{title}</h1>
                <p className="events-page__intro">{intro}</p>
            </div>

            <div className="events-list">
                {items.map((event) => (
                    <article className="event-card" key={event.slug}>
                        <Link
                            className="event-card__media"
                            to={eventPath(event.slug)}
                            aria-label={`${event.title} — ${readMoreLabel}`}
                        >
                            <img
                                src={withBase(event.image)}
                                alt={event.imageAlt}
                                loading="lazy"
                            />
                        </Link>
                        <div className="event-card__body">
                            <h2>
                                <Link to={eventPath(event.slug)}>
                                    {event.title}
                                </Link>
                            </h2>
                            <EventMeta
                                date={event.date}
                                location={event.location}
                            />
                            <p className="event-card__summary">{event.summary}</p>
                            <Link
                                className="event-card__more"
                                to={eventPath(event.slug)}
                            >
                                {readMoreLabel}
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}
