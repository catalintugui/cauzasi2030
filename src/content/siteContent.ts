import content from "../content.json";

export type ChannelIconName = "whatsapp" | "facebook" | "email";

export type NavigationItem = {
    label: string;
    to?: string;
    children?: Array<{
        label: string;
        to: string;
    }>;
};

export type TextPageContent = {
    kicker: string;
    title: string;
    body: string[];
    contactLinks?: Array<{
        label: string;
        href: string;
    }>;
    actions?: Array<{
        label: string;
        href: string;
    }>;
};

export type SiteContent = Omit<typeof content, "contact" | "navigation"> & {
    navigation: Omit<typeof content.navigation, "items"> & {
        items: NavigationItem[];
    };
    contact: Omit<typeof content.contact, "channels"> & {
        channels: Array<{
            title: string;
            href: string;
            label: string;
            icon: ChannelIconName;
        }>;
    };
};

export const siteContent = content as SiteContent;
