import { TextPage } from "../components/ui/TextPage";
import { siteContent } from "../content/siteContent";

export function TeamPage() {
    const { principles } = siteContent.team;

    return (
        <>
            <TextPage page={siteContent.team} />

            <section
                className="principles-section"
                aria-label={principles.title}
            >
                <div className="principles-heading">
                    <p className="section-kicker">{principles.kicker}</p>
                    <h2>{principles.title}</h2>
                </div>

                <div className="principles-feature-grid">
                    <article className="principle-feature-card">
                        <h3>Viziune</h3>
                        {principles.vision.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </article>
                    <article className="principle-feature-card">
                        <h3>Misiune</h3>
                        {principles.mission.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </article>
                </div>

                <div className="values-heading">
                    <p className="section-kicker">Valori</p>
                    <h3>Principiile care ne țin direcția clară.</h3>
                </div>
                <div className="values-grid">
                    {principles.values.map((value) => (
                        <article className="value-card" key={value.title}>
                            <span aria-hidden="true" />
                            <h3>{value.title}</h3>
                            <p>{value.description}</p>
                        </article>
                    ))}
                </div>
            </section>
        </>
    );
}
