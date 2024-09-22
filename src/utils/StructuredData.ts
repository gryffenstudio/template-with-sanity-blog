import siteData from '../data/siteData.json';

export interface ListItem {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
}

export interface BreadcrumbList {
    '@type': 'BreadcrumbList';
    '@id': string;
    itemListElement: ListItem[];
}

export interface BlogPosting {
    '@type': 'BlogPosting';
    headline: string;
    description: string;
    datePublished: string;
    dateModified: string;
    author: {
        '@type': 'Person';
        name: string;
    };
    publisher: {
        '@id': string;
    };
    mainEntityOfPage: {
        '@id': string;
    };
    image: string;
}

export interface WebSite {
    '@type': 'WebSite';
    '@id': string;
    name: string;
    url: string;
}

export interface WebPage {
    '@type': 'WebPage';
    '@id': string;
    name: string;
    isPartOf: {
        '@id': string;
    };
}

export interface Organization {
    '@type': 'Organization';
    '@id': string;
    name: string;
    url: string;
    logo: string;
}

export type StructuredData = BreadcrumbList | BlogPosting | WebSite | WebPage | Organization;

export interface StructuredDataInput {
    type: keyof typeof structuredDataTypes;
    data: any;
}

const structuredDataTypes = {
    BreadcrumbList: {} as BreadcrumbList,
    BlogPosting: {} as BlogPosting,
    WebSite: {} as WebSite,
    WebPage: {} as WebPage,
    Organization: {} as Organization,
};

export interface BuildDefaultStructuredDataProps {
    title: string;
    url: URL;
}

export default function buildDefaultStructuredData(
    props: BuildDefaultStructuredDataProps,
): StructuredDataInput[] {
    return [
        {
            type: 'WebSite',
            data: {
                '@id': siteData.websiteId,
                name: siteData.organizationName,
                url: siteData.url,
                publisher: {
                    '@id': siteData.organizationId,
                },
            },
        },
        {
            type: 'WebPage',
            data: {
                '@id': props.url.toString(),
                name: props.title,
                isPartOf: {
                    '@id': siteData.websiteId,
                },
            },
        },
        {
            type: 'Organization',
            data: {
                '@id': siteData.organizationId,
                name: siteData.organizationName,
                url: siteData.url,
                logo: siteData.image.src,
            },
        },
    ];
}
