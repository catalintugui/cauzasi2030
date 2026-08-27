type IconProps = {
    className?: string;
};

export function CalendarIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M7 3a1 1 0 0 1 1 1v1h8V4a1 1 0 1 1 2 0v1h1.5A2.5 2.5 0 0 1 22 7.5v12A2.5 2.5 0 0 1 19.5 22h-15A2.5 2.5 0 0 1 2 19.5v-12A2.5 2.5 0 0 1 4.5 5H6V4a1 1 0 0 1 1-1Zm12.5 8.5h-15v8a.5.5 0 0 0 .5.5h14a.5.5 0 0 0 .5-.5v-8Zm-15-2h15V7.5a.5.5 0 0 0-.5-.5H4.5a.5.5 0 0 0-.5.5v2Z"
            />
        </svg>
    );
}

export function LocationIcon({ className }: IconProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path
                fill="currentColor"
                d="M12 2.5c-3.7 0-6.75 2.95-6.75 6.7 0 4.55 5.35 10.58 6.25 11.55a.7.7 0 0 0 1 0c.9-.97 6.25-7 6.25-11.55 0-3.75-3.05-6.7-6.75-6.7Zm0 9.2a2.55 2.55 0 1 1 0-5.1 2.55 2.55 0 0 1 0 5.1Z"
            />
        </svg>
    );
}

type EventMetaProps = {
    date: string;
    location: string;
    className?: string;
};

export function EventMeta({ date, location, className }: EventMetaProps) {
    return (
        <ul
            className={["event-meta", className].filter(Boolean).join(" ")}
        >
            <li>
                <span className="event-meta__icon" title="Data">
                    <CalendarIcon />
                </span>
                <span>{date}</span>
            </li>
            <li>
                <span className="event-meta__icon" title="Locație">
                    <LocationIcon />
                </span>
                <span>{location}</span>
            </li>
        </ul>
    );
}
