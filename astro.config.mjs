import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import robotsTxt from 'astro-robots-txt';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
    // site: '<SITE NAME HERE>',
    adapter: netlify(),
    output: 'hybrid',
    devToolbar: {
        enabled: false,
    },
    integrations: [
        react(),
        tailwind(),
        partytown({
            config: {
                forward: ['dataLayer.push'],
            },
        }),
        robotsTxt(),
        sitemap(),
        sanity({
            projectId: 'xxxxxxxxx', // INSERT PROJECT ID HERE
            dataset: 'production',
            useCdn: false,
            apiVersion: '2024-05-14',
            studioBasePath: '/sanity-studio-admin',
            stega: {
                studioUrl: '/sanity-studio-admin',
            },
        }),
        icon({
            iconDir: 'src/assets/svgs',
        }),
    ],
    image: {
        domains: ['cdn.sanity.io'],
    },
    prefetch: {
        prefetchAll: true,
    },
});
