import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import partytown from '@astrojs/partytown';
import robotsTxt from 'astro-robots-txt';
import sanity from '@sanity/astro';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

const env = {
    ...process.env,
    ...loadEnv(process.env.NODE_ENV, process.cwd(), ''),
};

const projectId = env.PUBLIC_SANITY_PROJECT_ID;
const dataset = env.PUBLIC_SANITY_DATASET;

if (!(env.PUBLIC_SANITY_PROJECT_ID && env.PUBLIC_SANITY_DATASET)) {
    throw new Error('You must fill all environment variables');
}

// https://astro.build/config
export default defineConfig({
    site: 'https://construx-template.netlify.app',
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
            projectId,
            dataset,
            useCdn: false,
            apiVersion: '2024-09-14',
            studioBasePath: '/sanity-studio-admin',
            stega: {
                studioUrl: '/sanity-studio-admin',
            },
        }),
    ],
    image: {
        domains: ['cdn.sanity.io'],
    },
    prefetch: {
        prefetchAll: true,
    },
});
