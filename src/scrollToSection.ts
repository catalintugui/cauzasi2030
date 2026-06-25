import { getSectionScrollTop, isAtSection } from "./sectionScroll";
import { sectionIds, type SectionId } from "./sectionIds";

type SectionNavigateDetail = {
    sectionId: SectionId;
    lockUntilScrollEnd?: boolean;
};

let activeScrollAnimation: number | null = null;
let cancelActiveScroll: (() => void) | null = null;

function easeInOutCubic(progress: number): number {
    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

function cancelSmoothScroll(scrollRoot?: HTMLElement | null) {
    cancelActiveScroll?.();
    cancelActiveScroll = null;

    if (activeScrollAnimation !== null) {
        cancelAnimationFrame(activeScrollAnimation);
        activeScrollAnimation = null;
    }
}

function attachUserIntentListeners(
    scrollRoot: HTMLElement,
    onUserIntent: () => void,
) {
    scrollRoot.addEventListener("wheel", onUserIntent, { passive: true });
    scrollRoot.addEventListener("touchstart", onUserIntent, { passive: true });
    scrollRoot.addEventListener("keydown", onUserIntent);
}

function detachUserIntentListeners(
    scrollRoot: HTMLElement,
    onUserIntent: () => void,
) {
    scrollRoot.removeEventListener("wheel", onUserIntent);
    scrollRoot.removeEventListener("touchstart", onUserIntent);
    scrollRoot.removeEventListener("keydown", onUserIntent);
}

function animateScrollToWithRaf(
    scrollRoot: HTMLElement,
    targetTop: number,
    onComplete: () => void,
) {
    const startTop = scrollRoot.scrollTop;
    const distance = targetTop - startTop;
    const duration = Math.min(
        900,
        Math.max(350, Math.abs(distance) * 0.55),
    );
    const startTime = performance.now();
    let cancelled = false;

    const onUserIntent = () => {
        if (cancelled) {
            return;
        }

        cancelled = true;
        cancelSmoothScroll(scrollRoot);
        detachUserIntentListeners(scrollRoot, onUserIntent);
        window.dispatchEvent(new CustomEvent("sectionnavigatecomplete"));
    };

    attachUserIntentListeners(scrollRoot, onUserIntent);

    cancelActiveScroll = () => {
        cancelled = true;
        detachUserIntentListeners(scrollRoot, onUserIntent);
    };

    const step = (now: number) => {
        if (cancelled) {
            return;
        }

        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);

        scrollRoot.scrollTop = startTop + distance * easeInOutCubic(progress);

        if (progress < 1) {
            activeScrollAnimation = requestAnimationFrame(step);
            return;
        }

        activeScrollAnimation = null;
        cancelActiveScroll = null;
        detachUserIntentListeners(scrollRoot, onUserIntent);
        scrollRoot.scrollTop = targetTop;
        onComplete();
    };

    activeScrollAnimation = requestAnimationFrame(step);
}

function animateScrollToWithNative(
    scrollRoot: HTMLElement,
    targetTop: number,
    onComplete: () => void,
) {
    let cancelled = false;

    const complete = () => {
        if (cancelled) {
            return;
        }

        cancelled = true;
        cancelActiveScroll = null;
        scrollRoot.removeEventListener("scrollend", onScrollEnd);
        detachUserIntentListeners(scrollRoot, onUserIntent);
        scrollRoot.scrollTop = targetTop;
        onComplete();
    };

    const onUserIntent = () => {
        if (cancelled) {
            return;
        }

        cancelled = true;
        cancelSmoothScroll(scrollRoot);
        scrollRoot.removeEventListener("scrollend", onScrollEnd);
        detachUserIntentListeners(scrollRoot, onUserIntent);
        window.dispatchEvent(new CustomEvent("sectionnavigatecomplete"));
    };

    const onScrollEnd = () => {
        complete();
    };

    attachUserIntentListeners(scrollRoot, onUserIntent);
    scrollRoot.addEventListener("scrollend", onScrollEnd);

    cancelActiveScroll = () => {
        cancelled = true;
        scrollRoot.removeEventListener("scrollend", onScrollEnd);
        detachUserIntentListeners(scrollRoot, onUserIntent);
    };

    scrollRoot.scrollTo({ top: targetTop, behavior: "smooth" });
}

function animateScrollTo(
    scrollRoot: HTMLElement,
    targetTop: number,
    onComplete: () => void,
) {
    cancelSmoothScroll(scrollRoot);

    const startTop = scrollRoot.scrollTop;
    const distance = targetTop - startTop;

    if (Math.abs(distance) < 1) {
        onComplete();
        return;
    }

    if ("onscrollend" in scrollRoot) {
        animateScrollToWithNative(scrollRoot, targetTop, onComplete);
        return;
    }

    animateScrollToWithRaf(scrollRoot, targetTop, onComplete);
}

function dispatchSectionNavigate(
    sectionId: SectionId,
    lockUntilScrollEnd: boolean,
) {
    window.dispatchEvent(
        new CustomEvent<SectionNavigateDetail>("sectionnavigate", {
            detail: {
                sectionId,
                lockUntilScrollEnd,
            },
        }),
    );
}

export function scrollToSection(
    sectionId: string,
    behavior: ScrollBehavior = "smooth",
) {
    const section = document.getElementById(sectionId);

    if (!section) {
        return;
    }

    if (!isValidSectionId(sectionId)) {
        return;
    }

    const scrollRoot = document.querySelector<HTMLElement>(
        ".snap-scroll-container",
    );

    if (!scrollRoot) {
        return;
    }

    const targetTop = getSectionScrollTop(scrollRoot, section);
    const needsScroll = !isAtSection(scrollRoot, sectionId);
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;
    const useSmoothScroll =
        behavior === "smooth" && needsScroll && !prefersReducedMotion;

    if (!useSmoothScroll) {
        cancelSmoothScroll(scrollRoot);
        scrollRoot.scrollTop = targetTop;
        dispatchSectionNavigate(sectionId, false);
        return;
    }

    dispatchSectionNavigate(sectionId, true);

    animateScrollTo(scrollRoot, targetTop, () => {
        window.dispatchEvent(new CustomEvent("sectionnavigatecomplete"));
    });
}

export function isValidSectionId(id: string): id is SectionId {
    return sectionIds.includes(id as SectionId);
}
