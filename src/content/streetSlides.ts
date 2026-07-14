import { withBase } from "../utils/withBase";

export const streetSlides = [
    {
        src: withBase("/street/01-gunoi-si-container-strada.webp"),
        alt: "Gunoi și containere pe stradă, lângă clădiri vechi",
    },
    {
        src: withBase("/street/02-parcare-trasata-pe-trotuar.webp"),
        alt: "Parcare trasată pe trotuar",
    },
    {
        src: withBase("/street/03-case-ruinate.webp"),
        alt: "Casă ruinată cu pisică la fereastră",
    },
    {
        src: withBase("/street/04-cladire-pericol-prabusire.webp"),
        alt: "Clădire cu pericol de prăbușire a peretelui",
    },
    {
        src: withBase("/street/05-masini-parcate-strada-ingusta.webp"),
        alt: "Mașini parcate pe o stradă îngustă",
    },
    {
        src: withBase("/street/06-fatade-avariate.webp"),
        alt: "Fațade avariate cu ferestre sigilate",
    },
] as const;
