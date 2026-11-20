import { votePromo } from "../../content/votePromo";
import { useVotePromo } from "../../context/VotePromoContext";

export function VotePromoBanner() {
    const { shouldShowBanner, dismissBanner } = useVotePromo();

    if (!shouldShowBanner) {
        return null;
    }

    return (
        <aside
            className="event-promo-banner vote-promo-banner"
            aria-label={votePromo.bannerTitle}
        >
            <div className="event-promo-banner__inner">
                <div className="event-promo-banner__copy">
                    <p className="event-promo-banner__title">
                        {votePromo.bannerTitle}
                    </p>
                    <p className="vote-promo-banner__hint">
                        {votePromo.bannerHint}
                    </p>
                </div>
                <div className="vote-promo-banner__actions">
                    <a
                        className="event-promo-banner__link"
                        href={votePromo.smsHref}
                    >
                        {votePromo.voteLabel}
                    </a>
                    <button
                        className="vote-promo-banner__close"
                        type="button"
                        aria-label="Închide anunțul"
                        onClick={dismissBanner}
                    >
                        ×
                    </button>
                </div>
            </div>
        </aside>
    );
}
