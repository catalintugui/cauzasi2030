import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { eventPath, type EventItem } from "../../content/events";
import {
    EVENT_WELCOME_STORAGE_KEY,
    isEventPromoAvailable,
} from "../../content/eventPromo";
import { siteContent } from "../../content/siteContent";
import { useEventPromo } from "../../context/EventPromoContext";
import { withBase } from "../../utils/withBase";

type EventWelcomePopupProps = {
    event?: EventItem;
};

export function EventWelcomePopup({
    event = siteContent.events.items[0],
}: EventWelcomePopupProps) {
    const titleId = useId();
    const descriptionId = useId();
    const closeRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { setWelcomeOpen, dismissWelcome } = useEventPromo();

    const dismiss = useCallback(() => {
        dismissWelcome();
        setIsOpen(false);
    }, [dismissWelcome]);

    useEffect(() => {
        if (!event || !isEventPromoAvailable()) {
            return;
        }

        try {
            if (window.localStorage.getItem(EVENT_WELCOME_STORAGE_KEY)) {
                return;
            }
        } catch {
            // localStorage unavailable — still show once this session
        }

        const timer = window.setTimeout(() => {
            setIsOpen(true);
            setWelcomeOpen(true);
        }, 450);
        return () => window.clearTimeout(timer);
    }, [event, setWelcomeOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();

        const onKeyDown = (keyboardEvent: KeyboardEvent) => {
            if (keyboardEvent.key === "Escape") {
                dismiss();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [dismiss, isOpen]);

    if (!event || !isOpen) {
        return null;
    }

    return createPortal(
        <div className="event-welcome" role="presentation">
            <div
                className="event-welcome__dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            >
                <button
                    ref={closeRef}
                    className="event-welcome__close"
                    type="button"
                    aria-label="Închide"
                    onClick={dismiss}
                >
                    ×
                </button>

                <figure className="event-welcome__media">
                    <img
                        src={withBase(event.image)}
                        alt={event.imageAlt}
                    />
                </figure>

                <div className="event-welcome__body">
                    <p className="section-kicker">{event.kicker}</p>
                    <h2 id={titleId}>{event.title}</h2>
                    <p className="event-welcome__date">{event.date}</p>
                    <p className="event-welcome__location">{event.location}</p>
                    <p id={descriptionId} className="event-welcome__text">
                        {event.summary}
                    </p>
                    <div className="event-welcome__actions">
                        <Link
                            className="button button-primary"
                            to={eventPath(event.slug)}
                            onClick={dismiss}
                        >
                            {siteContent.events.readMoreLabel}
                        </Link>
                        <button
                            className="button button-secondary"
                            type="button"
                            onClick={dismiss}
                        >
                            Continuă pe site
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
}
