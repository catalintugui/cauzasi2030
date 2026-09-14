import { siteContent } from "./siteContent";

export type EventItem = (typeof siteContent.events.items)[number];

function isEventVisible(event: EventItem): boolean {
    return !("hidden" in event && event.hidden);
}

export function getVisibleEvents(): EventItem[] {
    return siteContent.events.items.filter(isEventVisible);
}

export function getEventBySlug(slug: string): EventItem | undefined {
    return getVisibleEvents().find((event) => event.slug === slug);
}

export function eventPath(slug: string): string {
    return `/evenimente/${slug}`;
}
