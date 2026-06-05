import { Link } from "react-router-dom";
import { siteContent } from "../../content/siteContent";
import { SocialLinks } from "../ui/SocialLinks";

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="site-footer">
            <div>
                <Link className="footer-brand" to="/">
                    {siteContent.site.fullName}
                </Link>
                <p>
                    © {year} {siteContent.site.fullName}.{" "}
                    {siteContent.footer.rights}
                </p>
            </div>
            <SocialLinks variant="footer" />
        </footer>
    );
}
