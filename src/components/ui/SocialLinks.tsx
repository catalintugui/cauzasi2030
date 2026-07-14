import { siteContent } from "../../content/siteContent";
import { ChannelIcon } from "./ChannelIcon";

type SocialLinksProps = {
    variant?: "cards" | "footer";
};

export function SocialLinks({ variant = "cards" }: SocialLinksProps) {
    return (
        <div className={variant === "cards" ? "channel-list" : "footer-social"}>
            {siteContent.contact.channels.map((channel) => (
                <a
                    aria-label={`${channel.title}: ${channel.label}`}
                    href={channel.href}
                    key={channel.title}
                    rel="noreferrer"
                    target="_blank"
                >
                    <span className={`channel-icon channel-icon--${channel.icon}`}>
                        <ChannelIcon name={channel.icon} />
                    </span>
                    {variant === "cards" ? (
                        <span className="channel-copy">
                            <strong>{channel.label}</strong>
                        </span>
                    ) : (
                        <span className="channel-copy">
                            <span>{channel.label}</span>
                        </span>
                    )}
                </a>
            ))}
        </div>
    );
}
