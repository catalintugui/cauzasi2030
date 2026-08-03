export const sectionIds = [
    "cauzasi-2030",
    "harta",
    "voluntari",
    "actiuni",
    "prieteni",
    "echipa",
    "contact",
] as const;

export type SectionId = (typeof sectionIds)[number];
