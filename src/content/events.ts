import { siteContent } from "./siteContent";

export type EventItem = (typeof siteContent.events.items)[number];

export function getEventBySlug(slug: string): EventItem | undefined {
    return siteContent.events.items.find((event) => event.slug === slug);
}

export function eventPath(slug: string): string {
    return `/evenimente/${slug}`;
}
