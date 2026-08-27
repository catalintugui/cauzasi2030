import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import {
    hasDismissedEventWelcome,
    isEventPromoAvailable,
    markEventWelcomeDismissed,
} from "../content/eventPromo";

type EventPromoContextValue = {
    setWelcomeOpen: (open: boolean) => void;
    dismissWelcome: () => void;
    shouldShowBanner: boolean;
};

const EventPromoContext = createContext<EventPromoContextValue | null>(null);

export function EventPromoProvider({ children }: { children: ReactNode }) {
    const [, setWelcomeOpen] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(() =>
        typeof window === "undefined" ? false : hasDismissedEventWelcome(),
    );

    const dismissWelcome = useCallback(() => {
        markEventWelcomeDismissed();
        setHasDismissed(true);
        setWelcomeOpen(false);
    }, []);

    const shouldShowBanner = isEventPromoAvailable() && hasDismissed;

    const value = useMemo(
        () => ({
            setWelcomeOpen,
            dismissWelcome,
            shouldShowBanner,
        }),
        [dismissWelcome, shouldShowBanner],
    );

    return (
        <EventPromoContext.Provider value={value}>
            {children}
        </EventPromoContext.Provider>
    );
}

export function useEventPromo() {
    const context = useContext(EventPromoContext);
    if (!context) {
        throw new Error("useEventPromo must be used within EventPromoProvider");
    }
    return context;
}
