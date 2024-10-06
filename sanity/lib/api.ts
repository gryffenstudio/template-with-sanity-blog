export const dataset = assertValue(
    import.meta.env.PUBLIC_SANITY_DATASET,
    'Missing environment variable: PUBLIC_SANITY_DATASET',
);

export const projectId = assertValue(
    import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    'Missing environment variable: PUBLIC_SANITY_PROJECT_ID',
);

export const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2024-09-14';

export const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true';

export const token = import.meta.env.PUBLIC_SANITY_API_VIEWER_TOKEN;

export const studioUrl = '/sanity-studio-admin';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
    if (v === undefined) {
        throw new Error(errorMessage);
    }

    return v;
}
