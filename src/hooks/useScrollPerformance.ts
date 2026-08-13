import { useEffect } from "react";

const SCROLL_IDLE_MS = 140;

export function useScrollPerformance(pageShellSelector = ".page-shell") {
    useEffect(() => {
        const pageShell = document.querySelector<HTMLElement>(pageShellSelector);

        if (!pageShell) {
            return;
        }

        let idleTimer: ReturnType<typeof setTimeout> | undefined;
        let scrolling = false;

        const markScrolling = () => {
            if (!scrolling) {
                scrolling = true;
                pageShell.classList.add("is-scrolling");
            }

            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                scrolling = false;
                pageShell.classList.remove("is-scrolling");
            }, SCROLL_IDLE_MS);
        };

        window.addEventListener("scroll", markScrolling, { passive: true });

        return () => {
            clearTimeout(idleTimer);
            window.removeEventListener("scroll", markScrolling);
            pageShell.classList.remove("is-scrolling");
        };
    }, [pageShellSelector]);
}
