import { escape } from 'html-escaper';
import type { SeoProps, OpenGraphMedia } from './SEOTypes';

const createMetaTag = (attributes: Record<string, string>): string => {
    const attrs = Object.entries(attributes)
        .map(([key, value]) => `${key}="${escape(value)}"`)
        .join(' ');
    return `<meta ${attrs}>`;
};

const createLinkTag = (attributes: Record<string, string>): string => {
    const attrs = Object.entries(attributes)
        .map(([key, value]) => `${key}="${escape(value)}"`)
        .join(' ');
    return `<link ${attrs}>`;
};

const createOpenGraphTag = (property: string, content: string): string => {
    return createMetaTag({ property: `og:${property}`, content });
};

const buildOpenGraphMediaTags = (
    mediaType: 'image' | 'video',
    media: ReadonlyArray<OpenGraphMedia>,
): string => {
    let tags = '';

    media.forEach((medium) => {
        tags += createOpenGraphTag(mediaType, medium.url) + '\n';

        if (medium.alt) {
            tags += createOpenGraphTag(`${mediaType}:alt`, medium.alt) + '\n';
        }

        if (medium.secureUrl) {
            tags += createOpenGraphTag(`${mediaType}:secure_url`, medium.secureUrl) + '\n';
        }

        if (medium.type) {
            tags += createOpenGraphTag(`${mediaType}:type`, medium.type) + '\n';
        }

        if (medium.width) {
            tags += createOpenGraphTag(`${mediaType}:width`, medium.width.toString()) + '\n';
        }

        if (medium.height) {
            tags += createOpenGraphTag(`${mediaType}:height`, medium.height.toString()) + '\n';
        }
    });

    return tags;
};

export const buildTags = (config: SeoProps): string => {
    let tagsToRender = '';

    const addTag = (tag: string) => {
        tagsToRender += tag + '\n';
    };

    // Title
    if (config.title) {
        addTag(`<title>${escape(config.title)}</title>`);
    }

    // Description
    if (config.description) {
        addTag(createMetaTag({ name: 'description', content: config.description }));
    }

    // Robots
    let robotsContent: string[] = [];
    if (typeof config.noindex !== 'undefined') {
        robotsContent.push(config.noindex ? 'noindex' : 'index');
    }

    if (typeof config.nofollow !== 'undefined') {
        robotsContent.push(config.nofollow ? 'nofollow' : 'follow');
    }

    if (robotsContent.length > 0) {
        addTag(createMetaTag({ name: 'robots', content: robotsContent.join(',') }));
    }

    // Canonical
    if (config.canonical) {
        addTag(createLinkTag({ rel: 'canonical', href: config.canonical }));
    }

    // OpenGraph
    if (config.openGraph) {
        if (config.openGraph.title) {
            addTag(createOpenGraphTag('title', config.openGraph.title));
        }

        if (config.openGraph.description) {
            addTag(createOpenGraphTag('description', config.openGraph.description));
        }

        if (config.openGraph.url) {
            addTag(createOpenGraphTag('url', config.openGraph.url));
        }

        // Check for Open Graph type
        if (config.openGraph.type) {
            addTag(createOpenGraphTag('type', config.openGraph.type));
        }

        // Check for Open Graph type
        if (config.openGraph.type) {
            addTag(createOpenGraphTag('site_name', config.openGraph.siteName));
        }

        if (config.openGraph.images && config.openGraph.images.length) {
            addTag(buildOpenGraphMediaTags('image', config.openGraph.images));
        }
    }

    // Twitter
    if (config.twitter) {
        if (config.twitter.title) {
            addTag(createMetaTag({ name: 'twitter:title', content: config.twitter.title }));
        }

        if (config.twitter.description) {
            addTag(
                createMetaTag({ name: 'twitter:description', content: config.twitter.description }),
            );
        }

        if (config.twitter.card) {
            addTag(createMetaTag({ name: 'twitter:card', content: config.twitter.card }));
        }

        if (config.twitter.site) {
            addTag(createMetaTag({ name: 'twitter:site', content: config.twitter.site }));
        }

        if (config.twitter.handle) {
            addTag(createMetaTag({ name: 'twitter:creator', content: config.twitter.handle }));
        }

        if (config.twitter.image) {
            addTag(createMetaTag({ name: 'twitter:image', content: config.twitter.image }));
        }

        if (config.twitter.imageAlt) {
            addTag(createMetaTag({ name: 'twitter:image:alt', content: config.twitter.imageAlt }));
        }

        if (config.twitter.url) {
            addTag(createMetaTag({ property: 'twitter:url', content: config.twitter.url }));
        }

        if (config.twitter.domain) {
            addTag(createMetaTag({ property: 'twitter:domain', content: config.twitter.domain }));
        }
    }

    // Additional Meta Tags
    if (config.additionalMetaTags) {
        config.additionalMetaTags.forEach((metaTag) => {
            const attributes: Record<string, string> = { content: metaTag.content };
            if (metaTag.name) attributes.name = metaTag.name;
            if (metaTag.property) attributes.property = metaTag.property;
            addTag(createMetaTag(attributes));
        });
    }

    // Additional Link Tags
    if (config.additionalLinkTags) {
        config.additionalLinkTags.forEach((linkTag) => {
            addTag(createLinkTag({ rel: linkTag.rel, href: linkTag.href }));
        });
    }

    return tagsToRender.trim();
};
