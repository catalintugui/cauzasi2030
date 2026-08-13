import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ContactPage } from "./pages/ContactPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { MapPage } from "./pages/MapPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SponsorsPage } from "./pages/SponsorsPage";
import { TeamPage } from "./pages/TeamPage";
import { VolunteersPage } from "./pages/VolunteersPage";
import { useScrollPerformance } from "./hooks/useScrollPerformance";
import { applyPageSeo } from "./seo";
import "./App.css";

function useSiteMetadata() {
    const { pathname } = useLocation();

    useEffect(() => {
        applyPageSeo(pathname);
    }, [pathname]);
}

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            const target = document.querySelector(hash);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
            }
        }

        window.scrollTo(0, 0);
    }, [pathname, hash]);

    return null;
}

function MainLayout() {
    useSiteMetadata();
    useScrollPerformance();

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
                <Route path="actiuni" element={<GetInvolvedPage />} />
                <Route path="prieteni" element={<SponsorsPage />} />
                <Route path="echipa" element={<TeamPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
