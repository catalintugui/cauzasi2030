import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {
    hasDismissedVoteWelcome,
    isVotePromoAvailable,
    markVoteWelcomeDismissed,
} from "../content/votePromo";

type VotePromoContextValue = {
    setWelcomeOpen: (open: boolean) => void;
    dismissWelcome: () => void;
    shouldShowBanner: boolean;
};

const VotePromoContext = createContext<VotePromoContextValue | null>(null);

export function VotePromoProvider({ children }: { children: ReactNode }) {
    const [, setWelcomeOpen] = useState(false);
    const [hasDismissedWelcome, setHasDismissedWelcome] = useState(() =>
        typeof window === "undefined" ? false : hasDismissedVoteWelcome(),
    );

    const dismissWelcome = useCallback(() => {
        markVoteWelcomeDismissed();
        setHasDismissedWelcome(true);
        setWelcomeOpen(false);
    }, []);

    const shouldShowBanner = isVotePromoAvailable() && hasDismissedWelcome;

    const value = useMemo(
        () => ({
            setWelcomeOpen,
            dismissWelcome,
            shouldShowBanner,
        }),
        [dismissWelcome, shouldShowBanner],
    );

    return (
        <VotePromoContext.Provider value={value}>
            {children}
        </VotePromoContext.Provider>
    );
}

export function useVotePromo() {
    const context = useContext(VotePromoContext);
    if (!context) {
        throw new Error("useVotePromo must be used within VotePromoProvider");
    }
    return context;
}
