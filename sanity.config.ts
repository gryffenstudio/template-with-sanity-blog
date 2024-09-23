import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schema';
export default defineConfig({
    name: 'default',
    title: 'construx',
    projectId: 'xxxxxxxxx', // INSERT PROJECT ID HERE
    dataset: 'production',
    plugins: [structureTool(), visionTool()],
    schema: {
        types: schemaTypes,
    },
});
