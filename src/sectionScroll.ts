import { sectionIds, type SectionId } from "./sectionIds";

export function getActiveSectionFromScrollPosition(
    scrollRoot: HTMLElement,
): SectionId {
    const viewportMid = scrollRoot.scrollTop + scrollRoot.clientHeight / 2;

    let bestId: SectionId = sectionIds[0];
    let bestDistance = Number.POSITIVE_INFINITY;

    for (const id of sectionIds) {
        const section = document.getElementById(id);

        if (!section) {
            continue;
        }

        const sectionMid = section.offsetTop + section.offsetHeight / 2;
        const distance = Math.abs(viewportMid - sectionMid);

        if (distance < bestDistance) {
            bestDistance = distance;
            bestId = id;
        }
    }

    return bestId;
}

export function isAtSection(
    scrollRoot: HTMLElement,
    sectionId: SectionId,
    tolerance = 4,
): boolean {
    const section = document.getElementById(sectionId);

    if (!section) {
        return false;
    }

    return Math.abs(scrollRoot.scrollTop - section.offsetTop) <= tolerance;
}
