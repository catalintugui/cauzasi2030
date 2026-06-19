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
                    aria-label={variant === "footer" ? channel.title : undefined}
                    href={channel.href}
                    key={channel.title}
                    rel="noreferrer"
                    target="_blank"
                >
                    <span className="channel-icon">
                        <ChannelIcon name={channel.icon} />
                    </span>
                    <span className="channel-copy">
                        <span>{channel.title}</span>
                        {variant === "cards" && (
                            <strong>{channel.label}</strong>
                        )}
                    </span>
                </a>
            ))}
        </div>
    );
}
