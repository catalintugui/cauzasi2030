import { Link } from "react-router-dom";
import { siteContent } from "../../content/siteContent";
import { SocialLinks } from "../ui/SocialLinks";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div className="footer-brand-row">
                <Link
                    aria-label={siteContent.site.fullName}
                    className="footer-brand"
                    to="/"
                >
                    <img
                        className="footer-brand-mark"
                        src="/brand/logo-mark.png"
                        alt=""
                        aria-hidden="true"
                    />
                    <span className="footer-brand-name">
                        {siteContent.site.fullName}
                    </span>
                </Link>
                <p>
                    © {year} {siteContent.footer.copyrightHolder}
                    <span className="footer-rights">
                        . {siteContent.footer.rights}
                    </span>
                </p>
            </div>
            <SocialLinks variant="footer" />
        </footer>
    );
}
