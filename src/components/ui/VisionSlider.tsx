import { useCallback, useEffect, useState } from "react";
import { visionSlides } from "../../content/visionSlides";

const AUTO_ADVANCE_MS = 2000;

type Slide = {
    src: string;
    alt: string;
};

type VisionSliderProps = {
    slides?: readonly Slide[];
    size?: "default" | "large";
};

export function VisionSlider({
    slides = visionSlides,
    size = "default",
}: VisionSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const slideCount = slides.length;

    const goTo = useCallback(
        (index: number) => {
            setActiveIndex((index + slideCount) % slideCount);
        },
        [slideCount],
    );

    const goNext = useCallback(() => {
        goTo(activeIndex + 1);
    }, [activeIndex, goTo]);

    const goPrev = useCallback(() => {
        goTo(activeIndex - 1);
    }, [activeIndex, goTo]);

    useEffect(() => {
        if (isPaused) {
            return;
        }

        const timer = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % slideCount);
        }, AUTO_ADVANCE_MS);

        return () => window.clearInterval(timer);
    }, [isPaused, slideCount]);

    const sliderClassName = [
        "vision-slider",
        size === "large" && "vision-slider--large",
        size === "large" && "vision-slider--contain",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={sliderClassName}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                    setIsPaused(false);
                }
            }}
        >
            <div className="vision-slider-viewport" aria-live="polite">
                {slides.map((slide, index) => (
                    <div
                        key={slide.src}
                        aria-hidden={index !== activeIndex}
                        className={
                            index === activeIndex
                                ? "vision-slider-frame is-active"
                                : "vision-slider-frame"
                        }
                    >
                        <img
                            alt=""
                            aria-hidden="true"
                            className="vision-slider-slide-bg"
                            draggable={false}
                            src={slide.src}
                        />
                        <img
                            alt={slide.alt}
                            className="vision-slider-slide"
                            draggable={false}
                            src={slide.src}
                        />
                    </div>
                ))}
            </div>

            <button
                aria-label="Imaginea anterioară"
                className="vision-slider-arrow vision-slider-arrow--prev"
                type="button"
                onClick={goPrev}
            >
                ‹
            </button>
            <button
                aria-label="Imaginea următoare"
                className="vision-slider-arrow vision-slider-arrow--next"
                type="button"
                onClick={goNext}
            >
                ›
            </button>

            <div
                aria-label="Progres slideshow"
                className="vision-slider-dots"
                role="tablist"
            >
                {slides.map((slide, index) => (
                    <button
                        aria-label={`Imaginea ${index + 1}: ${slide.alt}`}
                        aria-selected={index === activeIndex}
                        className={
                            index === activeIndex
                                ? "vision-slider-dot is-active"
                                : "vision-slider-dot"
                        }
                        key={slide.src}
                        role="tab"
                        type="button"
                        onClick={() => goTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}
