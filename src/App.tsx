import { useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { EventPromoBanner } from "./components/layout/EventPromoBanner";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ContactPage } from "./pages/ContactPage";
import { EventDetailPage } from "./pages/EventDetailPage";
import { EventsPage } from "./pages/EventsPage";
import { GetInvolvedPage } from "./pages/GetInvolvedPage";
import { HomePage } from "./pages/HomePage";
import { MapPage } from "./pages/MapPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SponsorsPage } from "./pages/SponsorsPage";
import { TeamPage } from "./pages/TeamPage";
import { VolunteersPage } from "./pages/VolunteersPage";
import { EventPromoProvider } from "./context/EventPromoContext";
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
        <EventPromoProvider>
            <main className="page-shell">
                <ScrollToTop />
                <Navbar />
                <EventPromoBanner />
                <div className="app-content">
                    <Outlet />
                </div>
                <Footer />
            </main>
        </EventPromoProvider>
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
                <Route path="evenimente" element={<EventsPage />} />
                <Route path="evenimente/:slug" element={<EventDetailPage />} />
                <Route path="prieteni" element={<SponsorsPage />} />
                <Route path="echipa" element={<TeamPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}

export default App;
