import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { siteContent } from "./content/siteContent";
import { ContactPage } from "./pages/ContactPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { MapPage } from "./pages/MapPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SponsorsPage } from "./pages/SponsorsPage";
import { TeamPage } from "./pages/TeamPage";
import { VolunteersPage } from "./pages/VolunteersPage";
import "./App.css";

function useSiteMetadata() {
    useEffect(() => {
        document.title = siteContent.site.fullName;
        document
            .querySelector('meta[name="description"]')
            ?.setAttribute("content", siteContent.site.description);
    }, []);
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        document.querySelector<HTMLElement>(".app-content")?.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function MainLayout() {
    useSiteMetadata();

    return (
        <main className="page-shell">
            <ScrollToTop />
            <Navbar />
            <div className="app-content">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
}

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="harta" element={<MapPage />} />
                <Route path="voluntari" element={<VolunteersPage />} />
                <Route path="petitii" element={<GetInvolvedPage />} />
                <Route path="sponsori" element={<SponsorsPage />} />
                <Route path="echipa" element={<TeamPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
