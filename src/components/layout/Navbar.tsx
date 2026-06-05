import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
    siteContent,
    type NavigationItem,
} from "../../content/siteContent";
import treeLogoUrl from "../../tree.svg";

export function Navbar() {
    const { pathname } = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] =
        useState<NavigationItem | null>(null);

    useEffect(() => {
        setIsMenuOpen(false);
        setActiveMobileSubmenu(null);
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
                    <img src={treeLogoUrl} alt="" aria-hidden="true" />
                </span>
                <span>
                    {siteContent.site.name}
                    <strong>{siteContent.site.area}</strong>
                </span>
            </Link>
            <button
                className="nav-toggle"
                type="button"
                aria-controls="primary-navigation"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? "Închide meniul" : "Deschide meniul"}
                onClick={() => {
                    setIsMenuOpen((current) => {
                        if (current) {
                            setActiveMobileSubmenu(null);
                        }

                        return !current;
                    });
                }}
            >
                <span />
                <span />
                <span />
            </button>
            <div
                className={[
                    "nav-links",
                    isMenuOpen ? "open" : "",
                    activeMobileSubmenu ? "mobile-submenu-open" : "",
                ]
                    .filter(Boolean)
                    .join(" ")}
                id="primary-navigation"
            >
                {siteContent.navigation.items.map((item) => {
                    if (item.children?.length) {
                        const isActiveGroup = item.children.some(
                            (child) => child.to === pathname,
                        );

                        return (
                            <div className="nav-item-group" key={item.label}>
                                <button
                                    className={
                                        isActiveGroup ? "active" : undefined
                                    }
                                    onClick={() => setActiveMobileSubmenu(item)}
                                    type="button"
                                >
                                    {item.label}
                                    <span
                                        className="nav-submenu-indicator"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                </button>
                                <div className="nav-submenu">
                                    {item.children.map((child) => (
                                        <NavLink
                                            key={child.to}
                                            to={child.to}
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {child.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </div>
                        );
                    }

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
                {activeMobileSubmenu?.children && (
                    <div className="mobile-submenu-panel">
                        <button
                            className="mobile-submenu-back"
                            aria-label="Înapoi"
                            onClick={() => setActiveMobileSubmenu(null)}
                            type="button"
                        >
                            <span aria-hidden="true">←</span>
                        </button>
                        <p className="mobile-submenu-title">
                            {activeMobileSubmenu.label}
                        </p>
                        {activeMobileSubmenu.children.map((child) => (
                            <NavLink
                                key={child.to}
                                to={child.to}
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    setActiveMobileSubmenu(null);
                                }}
                            >
                                {child.label}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
