import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema';
import { presentationTool } from 'sanity/presentation';
import { resolve } from './src/utils/sanity';
export default defineConfig({
    name: 'default',
    title: 'construx',
    projectId: 'xxxxxxxxx', // INSERT PROJECT ID HERE
    dataset: 'production',
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
