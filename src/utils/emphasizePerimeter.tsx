import type { ReactNode } from "react";

const PERIMETER =
    "Bd. Mircea Vodă x Cal. Călărași x Str. Traian x Bd. Unirii";

export function emphasizePerimeter(text: string): ReactNode {
    if (!text.includes(PERIMETER)) {
        return text;
    }

    const parts = text.split(PERIMETER);
    return parts.map((part, index) => (
        <span key={index}>
            {part}
            {index < parts.length - 1 ? <strong>{PERIMETER}</strong> : null}
        </span>
    ));
}
