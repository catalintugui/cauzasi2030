import { Link, Navigate, useParams } from "react-router-dom";
import { EventMeta } from "../components/ui/EventMeta";
import { getEventBySlug } from "../content/events";
import {
    getGoogleCalendarUrl,
    isEventPromoAvailable,
} from "../content/eventPromo";
import { siteContent } from "../content/siteContent";
import { withBase } from "../utils/withBase";

export function EventDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const event = slug ? getEventBySlug(slug) : undefined;

    if (!event) {
        return <Navigate replace to="/evenimente" />;
    }

    const calendarUrl = getGoogleCalendarUrl(event);
    const showCalendarButton = Boolean(calendarUrl) && isEventPromoAvailable();

    return (
        <article className="event-detail" aria-label={event.title}>
            <header className="event-detail__hero">
                <div className="event-detail__hero-copy">
                    <p className="section-kicker">{event.kicker}</p>
                    <h1>{event.title}</h1>
                    <EventMeta
                        className="event-detail__meta"
                        date={event.date}
                        location={event.location}
                    />
                    {showCalendarButton && calendarUrl ? (
                        <a
                            className="button button-primary event-detail__calendar"
                            href={calendarUrl}
                            rel="noreferrer"
                            target="_blank"
                        >
                            {siteContent.events.addToCalendarLabel}
                        </a>
                    ) : null}
                </div>
                <figure className="event-detail__hero-media">
                    <img
                        src={withBase(event.image)}
                        alt={event.imageAlt}
                    />
                </figure>
            </header>

            <section className="event-detail__section" aria-label={event.leadTitle}>
                <h2>{event.leadTitle}</h2>
                <div className="event-detail__prose">
                    {event.body.map((paragraph, index) => (
                        <p
                            className={index === 0 ? "story-intro" : undefined}
                            key={paragraph}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            {event.gallery?.length ? (
                <div className="event-detail__gallery">
                    {event.gallery.map((image) => (
                        <figure key={image.src}>
                            <img
                                src={withBase(image.src)}
                                alt={image.alt}
                                loading="lazy"
                            />
                        </figure>
                    ))}
                </div>
            ) : null}

            <section
                className="event-detail__section"
                aria-label={event.activities.title}
            >
                <h2>{event.activities.title}</h2>
                <div className="event-activity-grid">
                    {event.activities.items.map((activity) => (
                        <article className="event-activity-card" key={activity.title}>
                            <h3>{activity.title}</h3>
                            <p>{activity.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section
                className="event-detail__section"
                aria-label={event.goals.title}
            >
                <h2>{event.goals.title}</h2>
                <ul className="event-goals-list">
                    {event.goals.items.map((goal) => (
                        <li key={goal}>{goal}</li>
                    ))}
                </ul>
            </section>

            <section
                className="event-detail__section event-detail__involve"
                aria-label={event.involve.title}
            >
                <h2>{event.involve.title}</h2>
                <p className="event-detail__involve-intro">{event.involve.intro}</p>
                <div className="event-activity-grid">
                    {event.involve.items.map((item) => (
                        <article className="event-activity-card" key={item.title}>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <p className="event-detail__back">
                <Link to="/evenimente">← Toate evenimentele</Link>
            </p>
        </article>
    );
}
