import { siteContent } from "./siteContent";

export type EventGalleryImage = {
    src: string;
    alt: string;
};

type RawEventItem = (typeof siteContent.events.items)[number];

export type EventItem = Omit<RawEventItem, "gallery"> & {
    gallery?: EventGalleryImage[];
};

function isEventVisible(event: EventItem): boolean {
    return !("hidden" in event && event.hidden);
}

export function getVisibleEvents(): EventItem[] {
    return siteContent.events.items.filter(isEventVisible) as EventItem[];
}

export function getEventBySlug(slug: string): EventItem | undefined {
    return getVisibleEvents().find((event) => event.slug === slug);
}

export function eventPath(slug: string): string {
    return `/evenimente/${slug}`;
}
