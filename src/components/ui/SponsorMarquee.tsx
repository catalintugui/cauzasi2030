import type { CSSProperties } from "react";
import type { Partner } from "../../content/partners";
import { partnerRows } from "../../content/partners";

const ROW_DURATIONS = ["84s", "76s", "92s"];

type SponsorMarqueeProps = {
    ariaLabel?: string;
};

function MarqueeRow({
    partners,
    direction,
    duration,
}: {
    partners: Partner[];
    direction: "left" | "right";
    duration: string;
}) {
    const loop = [...partners, ...partners];

    return (
        <div className="sponsor-marquee-row">
            <div
                className={[
                    "sponsor-marquee-track",
                    direction === "right" ? "sponsor-marquee-track--right" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                style={
                    { "--marquee-duration": duration } as CSSProperties
                }
            >
                {loop.map((partner, index) => (
                    <a
                        className={[
                            "sponsor-marquee-item",
                            partner.logo ? "" : "sponsor-marquee-item--text-only",
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        href={partner.url}
                        key={`${partner.name}-${index}`}
                        rel="noreferrer"
                        target="_blank"
                        title={partner.name}
                    >
                        {partner.logo && (
                            <img
                                alt=""
                                aria-hidden="true"
                                draggable={false}
                                height={28}
                                loading="lazy"
                                src={partner.logo}
                                width={28}
                            />
                        )}
                        <span className="sponsor-marquee-name">{partner.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}

export function SponsorMarquee({
    ariaLabel = "Parteneri și prieteni",
}: SponsorMarqueeProps) {
    return (
        <section aria-label={ariaLabel} className="sponsor-marquee page-panel">
            {partnerRows.map((row, index) => (
                <MarqueeRow
                    direction={index % 2 === 0 ? "left" : "right"}
                    duration={ROW_DURATIONS[index]}
                    key={index}
                    partners={row}
                />
            ))}
        </section>
    );
}
