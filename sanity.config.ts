import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { presentationTool } from 'sanity/presentation';
import { schemaTypes } from './schema';
import { resolve } from './src/utils/sanity';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

export default defineConfig({
    name: 'default',
    title: 'construx',
    projectId,
    dataset,
    plugins: [
        structureTool(),
        visionTool(),
        presentationTool({
            previewUrl: location.origin,
            resolve,
        }),
    ],
    schema: {
        types: schemaTypes,
    },
});
