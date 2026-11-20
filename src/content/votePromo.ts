export const VOTE_WELCOME_STORAGE_KEY = "cauzasi-vote-welcome-seen";

/** Inclusive through end of 6 Dec 2026 EET (UTC+2). */
export const VOTE_PROMO_AVAILABLE_UNTIL = new Date(
    "2026-12-07T00:00:00+02:00",
);

export const votePromo = {
    kicker: "Cartierul Perfect",
    title: "Bucureștiul ar putea câștiga un parc nou în 2027",
    date: "18 noiembrie – 6 decembrie 2026",
    location: "Matei Basarab 40 · Udriște–Lucaci–Parfumului",
    summary:
        "Un teren de aproape 640 m² e cimentat și folosit ca parcare. Vrem să-l transformăm într-un parc de cartier. Proiectul Căuzași 2030 a ajuns la votul public — avem nevoie de votul tău.",
    howToVote:
        "Trimite un SMS cu textul S2 la 3713 (0,05 EUR + TVA). Poate vota oricine cu număr de mobil din România, o singură dată.",
    smsCode: "S2",
    smsNumber: "3713",
    smsHref: "sms:3713?body=S2",
    voteLabel: "Votează acum",
    continueLabel: "Continuă pe site",
    bannerTitle: "Votează Căuzași 2030 — un parc nou pentru cartier",
    bannerHint: "SMS cu S2 la 3713 · până pe 6 decembrie",
    instagramUrl:
        "https://www.instagram.com/p/Df4q7I3DNIZ/",
    image: "/promo/cartierul-perfect-vote.jpg",
    imageAlt:
        "Înainte și după: parcarea de la Matei Basarab 40 transformată în parc de cartier",
} as const;

export function isVotePromoAvailable(now = new Date()): boolean {
    return now.getTime() < VOTE_PROMO_AVAILABLE_UNTIL.getTime();
}

export function hasDismissedVoteWelcome(): boolean {
    try {
        return Boolean(window.localStorage.getItem(VOTE_WELCOME_STORAGE_KEY));
    } catch {
        return false;
    }
}

export function markVoteWelcomeDismissed(): void {
    try {
        window.localStorage.setItem(VOTE_WELCOME_STORAGE_KEY, "1");
    } catch {
        // ignore quota / private mode failures
    }
}
