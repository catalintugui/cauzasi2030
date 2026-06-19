import { useEffect } from "react";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { siteContent } from "./content/siteContent";
import { useScrollPerformance } from "./hooks/useScrollPerformance";
import { HomePage } from "./pages/HomePage";
import "./App.css";

function App() {
    useScrollPerformance();

    useEffect(() => {
        document.title = siteContent.site.fullName;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", siteContent.site.description);
    }, []);

    return (
        <main className="page-shell">
            <Navbar />
            <div className="snap-scroll-container">
                <HomePage />
            </div>
            <Footer />
        </main>
    );
}

export default App;
