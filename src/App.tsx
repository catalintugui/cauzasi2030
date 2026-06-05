import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { TextPage } from "./components/ui/TextPage";
import { siteContent } from "./content/siteContent";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { MapPage } from "./pages/MapPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TeamPage } from "./pages/TeamPage";
import "./App.css";

function App() {
    useEffect(() => {
        document.title = siteContent.site.fullName;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", siteContent.site.description);
    }, []);

    return (
        <main className="page-shell">
            <Navbar />
            <div className="app-content">
                <Routes>
                    <Route element={<HomePage />} path="/" />
                    <Route element={<MapPage />} path="/harta-interactiva" />
                    <Route element={<AboutPage />} path="/comunitate" />
                    <Route
                        element={<TextPage page={siteContent.volunteers} />}
                        path="/voluntari"
                    />
                    <Route element={<GetInvolvedPage />} path="/petitii" />
                    <Route
                        element={<TextPage page={siteContent.sponsors} />}
                        path="/sponsori"
                    />
                    <Route
                        element={<TextPage page={siteContent.events} />}
                        path="/evenimente"
                    />
                    <Route element={<TeamPage />} path="/echipa" />
                    <Route element={<ContactPage />} path="/contact" />
                    <Route element={<NotFoundPage />} path="*" />
                </Routes>
            </div>
            <Footer />
        </main>
    );
}

export default App;
