import { siteContent } from "../content/siteContent";

type GetInvolvedPageProps = {
    compact?: boolean;
};

type InvolvementCard = {
    title: string;
    description: string;
    href: string;
    label: string;
    internal?: boolean;
};

export function GetInvolvedPage({ compact = false }: GetInvolvedPageProps) {
    const PanelTag = compact ? "div" : "section";
    const { donate, actions } = siteContent.involvement;

    const cards: InvolvementCard[] = [
        ...actions.map((action) => ({
            title: action.title,
            description: action.description,
            href: action.href,
            label: action.label,
            internal: "internal" in action ? Boolean(action.internal) : false,
        })),
        ...(donate?.methods.map((method) => ({
            title: method.title,
            description: method.body.join(" "),
            href: method.action.href,
            label: method.action.label,
            internal: true,
        })) ?? []),
    ];

    const visibleCards = compact ? cards.slice(0, 3) : cards;

    return (
        <PanelTag
            className={
                compact
                    ? "section action-section snap-panel"
                    : "section action-section page-section"
            }
            id={!compact && donate ? donate.id : undefined}
            aria-label={donate?.title ?? siteContent.involvement.title}
        >
            <div className="section-heading">
                <p className="section-kicker">
                    {donate?.kicker ?? siteContent.involvement.kicker}
                </p>
                <h2>{donate?.title ?? siteContent.involvement.title}</h2>
                {!compact && donate?.intro ? (
                    <p className="donate-intro">{donate.intro}</p>
                ) : null}
            </div>
            <div className="action-grid">
                {visibleCards.map((card) => (
                    <article className="action-card" key={card.title}>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <a
                            href={card.href}
                            rel={card.internal ? undefined : "noreferrer"}
                            target={card.internal ? undefined : "_blank"}
                        >
                            {card.label}
                        </a>
                    </article>
                ))}
            </div>
        </PanelTag>
    );
}
