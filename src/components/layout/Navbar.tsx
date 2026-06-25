import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    siteContent,
    type NavigationItem,
} from "../../content/siteContent";

export function Navbar() {
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navItems = siteContent.navigation.items.filter(
        (item): item is NavigationItem & { to: string } => Boolean(item.to),
    );

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    return (
        <nav className="navbar" aria-label={siteContent.navigation.ariaLabel}>
            <Link
                className="brand"
                to="/"
                aria-label={siteContent.navigation.brandAriaLabel}
                onClick={() => setIsMenuOpen(false)}
            >
                <span className="brand-mark">
                    <img
                        src="/brand/logo-mark.png"
                        alt=""
                        aria-hidden="true"
                    />
                </span>
                <span className="brand-text">
                    <span className="brand-title">
                        {siteContent.site.name} {siteContent.site.area}
                    </span>
                    <span className="brand-tagline">
                        {siteContent.site.tagline}
                    </span>
                </span>
            </Link>
            <button
                className="nav-toggle"
                type="button"
                aria-controls="primary-navigation"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
                onClick={() => setIsMenuOpen((current) => !current)}
            >
                <span />
                <span />
                <span />
            </button>
            <div
                className={["nav-links", isMenuOpen ? "open" : ""]
                    .filter(Boolean)
                    .join(" ")}
                id="primary-navigation"
            >
                {navItems.map((item) => {
                    if (!item.to) {
                        return null;
                    }

                    return (
                        <NavLink
                            className={({ isActive }) =>
                                isActive ? "active" : undefined
                            }
                            end={item.to === "/"}
                            key={item.to}
                            to={item.to}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </NavLink>
                    );
                })}
            </div>
        </nav>
    );
}
