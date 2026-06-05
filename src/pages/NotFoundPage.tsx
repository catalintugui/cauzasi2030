import { siteContent } from "../content/siteContent";

export function NotFoundPage() {
    return (
        <section className="intro-panel page-panel">
            <div>
                <p className="section-kicker">{siteContent.notFound.kicker}</p>
                <h2>{siteContent.notFound.title}</h2>
            </div>
            <p>{siteContent.notFound.body}</p>
        </section>
    );
}
