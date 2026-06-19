import { useEffect, useRef, useState } from "react";
import { getActiveSectionFromScrollPosition } from "../sectionScroll";
import { sectionIds, type SectionId } from "../sectionIds";

const SCROLL_SETTLE_MS = 160;

export function useActiveSection(scrollRootSelector = ".snap-scroll-container") {
    const [activeId, setActiveId] = useState<SectionId>(sectionIds[0]);
    const pendingSectionRef = useRef<SectionId | null>(null);

    useEffect(() => {
        const scrollRoot = document.querySelector<HTMLElement>(scrollRootSelector);

        if (!scrollRoot) {
            return;
        }

        let settleTimer: ReturnType<typeof setTimeout> | undefined;
        const supportsScrollEnd = "onscrollend" in scrollRoot;

        const applyActiveSection = (nextId: SectionId) => {
            setActiveId((current) => (current === nextId ? current : nextId));
        };

        const syncActiveSection = () => {
            if (pendingSectionRef.current) {
                return;
            }

            applyActiveSection(getActiveSectionFromScrollPosition(scrollRoot));
        };

        const onScrollSettled = () => {
            syncActiveSection();
        };

        const scheduleScrollSettle = () => {
            clearTimeout(settleTimer);
            settleTimer = setTimeout(onScrollSettled, SCROLL_SETTLE_MS);
        };

        const onScroll = () => {
            if (pendingSectionRef.current) {
                return;
            }

            if (!supportsScrollEnd) {
                scheduleScrollSettle();
            }
        };

        const onSectionNavigate = (event: Event) => {
            const { sectionId, lockUntilScrollEnd } = (
                event as CustomEvent<{
                    sectionId: SectionId;
                    lockUntilScrollEnd?: boolean;
                }>
            ).detail;

            if (!sectionIds.includes(sectionId)) {
                return;
            }

            clearTimeout(settleTimer);
            applyActiveSection(sectionId);
            pendingSectionRef.current = lockUntilScrollEnd ? sectionId : null;
        };

        const onSectionNavigateComplete = () => {
            pendingSectionRef.current = null;
        };

        syncActiveSection();

        scrollRoot.addEventListener("scroll", onScroll, { passive: true });

        if (supportsScrollEnd) {
            scrollRoot.addEventListener("scrollend", onScrollSettled);
        }

        window.addEventListener("resize", syncActiveSection);
        window.addEventListener("sectionnavigate", onSectionNavigate);
        window.addEventListener(
            "sectionnavigatecomplete",
            onSectionNavigateComplete,
        );

        return () => {
            clearTimeout(settleTimer);
            scrollRoot.removeEventListener("scroll", onScroll);

            if (supportsScrollEnd) {
                scrollRoot.removeEventListener("scrollend", onScrollSettled);
            }

            window.removeEventListener("resize", syncActiveSection);
            window.removeEventListener("sectionnavigate", onSectionNavigate);
            window.removeEventListener(
                "sectionnavigatecomplete",
                onSectionNavigateComplete,
            );
        };
    }, [scrollRootSelector]);

    return activeId;
}
