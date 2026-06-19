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

function setSmoothScrolling(scrollRoot: HTMLElement, enabled: boolean) {
    scrollRoot.classList.toggle("is-smooth-scrolling", enabled);
}

function cancelSmoothScroll(scrollRoot?: HTMLElement | null) {
    cancelActiveScroll?.();
    cancelActiveScroll = null;

    if (activeScrollAnimation !== null) {
        cancelAnimationFrame(activeScrollAnimation);
        activeScrollAnimation = null;
    }

    if (scrollRoot) {
        setSmoothScrolling(scrollRoot, false);
    }
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

    setSmoothScrolling(scrollRoot, true);

    const duration = Math.min(
        900,
        Math.max(350, Math.abs(distance) * 0.55),
    );
    const startTime = performance.now();
    let cancelled = false;

    const finish = () => {
        setSmoothScrolling(scrollRoot, false);
    };

    const cleanupListeners = () => {
        scrollRoot.removeEventListener("wheel", onUserIntent);
        scrollRoot.removeEventListener("touchstart", onUserIntent);
        scrollRoot.removeEventListener("keydown", onUserIntent);
    };

    const onUserIntent = () => {
        if (cancelled) {
            return;
        }

        cancelled = true;
        cancelSmoothScroll(scrollRoot);
        cleanupListeners();
        window.dispatchEvent(new CustomEvent("sectionnavigatecomplete"));
    };

    scrollRoot.addEventListener("wheel", onUserIntent, { passive: true });
    scrollRoot.addEventListener("touchstart", onUserIntent, { passive: true });
    scrollRoot.addEventListener("keydown", onUserIntent);

    cancelActiveScroll = () => {
        cancelled = true;
        finish();
        cleanupListeners();
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
        cleanupListeners();
        scrollRoot.scrollTop = targetTop;
        finish();
        onComplete();
    };

    activeScrollAnimation = requestAnimationFrame(step);
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

    window.history.replaceState(null, "", `#${sectionId}`);

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
