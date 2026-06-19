import { useEffect } from "react";

const SCROLL_IDLE_MS = 180;

export function useScrollPerformance(
    scrollRootSelector = ".snap-scroll-container",
    pageShellSelector = ".page-shell",
) {
    useEffect(() => {
        const scrollRoot = document.querySelector<HTMLElement>(scrollRootSelector);
        const pageShell = document.querySelector<HTMLElement>(pageShellSelector);

        if (!scrollRoot || !pageShell) {
            return;
        }

        let idleTimer: ReturnType<typeof setTimeout> | undefined;

        const markScrolling = () => {
            pageShell.classList.add("is-scrolling");
            clearTimeout(idleTimer);
            idleTimer = setTimeout(() => {
                pageShell.classList.remove("is-scrolling");
            }, SCROLL_IDLE_MS);
        };

        scrollRoot.addEventListener("scroll", markScrolling, { passive: true });

        return () => {
            clearTimeout(idleTimer);
            scrollRoot.removeEventListener("scroll", markScrolling);
            pageShell.classList.remove("is-scrolling");
        };
    }, [scrollRootSelector, pageShellSelector]);
}
