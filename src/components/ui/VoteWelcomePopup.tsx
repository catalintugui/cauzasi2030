import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
    VOTE_WELCOME_STORAGE_KEY,
    isVotePromoAvailable,
    votePromo,
} from "../../content/votePromo";
import { useVotePromo } from "../../context/VotePromoContext";
import { withBase } from "../../utils/withBase";

export function VoteWelcomePopup() {
    const titleId = useId();
    const descriptionId = useId();
    const closeRef = useRef<HTMLButtonElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { setWelcomeOpen, dismissWelcome } = useVotePromo();

    const dismiss = useCallback(() => {
        dismissWelcome();
        setIsOpen(false);
    }, [dismissWelcome]);

    useEffect(() => {
        if (!isVotePromoAvailable()) {
            return;
        }

        try {
            if (window.localStorage.getItem(VOTE_WELCOME_STORAGE_KEY)) {
                return;
            }
        } catch {
            // localStorage unavailable — still show once this session
        }

        const timer = window.setTimeout(() => {
            setIsOpen(true);
            setWelcomeOpen(true);
        }, 450);
        return () => window.clearTimeout(timer);
    }, [setWelcomeOpen]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        closeRef.current?.focus();

        const onKeyDown = (keyboardEvent: KeyboardEvent) => {
            if (keyboardEvent.key === "Escape") {
                dismiss();
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [dismiss, isOpen]);

    if (!isOpen) {
        return null;
    }

    return createPortal(
        <div className="event-welcome vote-welcome" role="presentation">
            <div
                className="event-welcome__dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
            >
                <button
                    ref={closeRef}
                    className="event-welcome__close"
                    type="button"
                    aria-label="Închide"
                    onClick={dismiss}
                >
                    ×
                </button>

                <figure className="event-welcome__media">
                    <img
                        src={withBase(votePromo.image)}
                        alt={votePromo.imageAlt}
                    />
                </figure>

                <div className="event-welcome__body">
                    <p className="section-kicker">{votePromo.kicker}</p>
                    <h2 id={titleId}>{votePromo.title}</h2>
                    <p className="event-welcome__date">{votePromo.date}</p>
                    <p className="event-welcome__location">
                        {votePromo.location}
                    </p>
                    <p id={descriptionId} className="event-welcome__text">
                        {votePromo.summary}
                    </p>
                    <p className="event-welcome__text vote-welcome__howto">
                        {votePromo.howToVote}
                    </p>
                    <div className="event-welcome__actions">
                        <a
                            className="button button-primary"
                            href={votePromo.smsHref}
                            onClick={dismiss}
                        >
                            {votePromo.voteLabel}
                        </a>
                        <button
                            className="button button-secondary"
                            type="button"
                            onClick={dismiss}
                        >
                            {votePromo.continueLabel}
                        </button>
                    </div>
                    <p className="vote-welcome__source">
                        <a
                            href={votePromo.instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Vezi anunțul pe Instagram
                        </a>
                    </p>
                </div>
            </div>
        </div>,
        document.body,
    );
}
