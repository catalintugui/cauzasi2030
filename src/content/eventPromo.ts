import { eventPath, getVisibleEvents, type EventItem } from "./events";

export const EVENT_WELCOME_STORAGE_KEY = "cauzasi-event-welcome-seen";

/** Promo deactivated — set a future date to re-enable popup + banner. */
export const EVENT_PROMO_AVAILABLE_UNTIL = new Date(
    "2020-01-01T00:00:00+03:00",
);

export function isEventPromoAvailable(now = new Date()): boolean {
    return now.getTime() < EVENT_PROMO_AVAILABLE_UNTIL.getTime();
}

export function getFeaturedEvent(): EventItem | undefined {
    return getVisibleEvents()[0];
}

export function getFeaturedEventPath(): string | undefined {
    const event = getFeaturedEvent();
    return event ? eventPath(event.slug) : undefined;
}

export function getGoogleCalendarUrl(event: EventItem): string | undefined {
    if (!("calendar" in event) || !event.calendar) {
        return undefined;
    }

    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: event.title,
        dates: `${event.calendar.start}/${event.calendar.end}`,
        details: event.summary,
        location: event.location,
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function hasDismissedEventWelcome(): boolean {
    try {
        return Boolean(window.localStorage.getItem(EVENT_WELCOME_STORAGE_KEY));
    } catch {
        return false;
    }
}

export function markEventWelcomeDismissed(): void {
    try {
        window.localStorage.setItem(EVENT_WELCOME_STORAGE_KEY, "1");
    } catch {
        // ignore quota / private mode failures
    }
}
