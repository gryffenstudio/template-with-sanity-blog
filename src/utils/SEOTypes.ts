export interface OpenGraphMedia {
    url: string;
    alt?: string;
    secureUrl?: string;
    type?: string;
    width?: number;
    height?: number;
}

export interface OpenGraphProps {
    title?: string;
    description?: string;
    url?: string;
    siteName: string;
    type?: string;
    images?: OpenGraphMedia[];
}

export interface TwitterProps {
    card?: string;
    site?: string;
    handle?: string;
    title?: string;
    description?: string;
    image?: string;
    imageAlt?: string;
    url?: string;
    domain?: string;
}

export interface SeoProps {
    title: string;
    description: string;
    noindex?: boolean;
    nofollow?: boolean;
    canonical?: string;
    openGraph?: OpenGraphProps;
    twitter?: TwitterProps;
    additionalMetaTags?: { name?: string; property?: string; content: string }[];
    additionalLinkTags?: { rel: string; href: string }[];
}
