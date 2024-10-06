import { sanityClient } from 'sanity:client';
import type { QueryParams } from 'sanity';

export async function loadQuery<QueryResponse>({
    query,
    params,
    visualEditingEnabled,
    token,
}: {
    query: string;
    params?: QueryParams;
    visualEditingEnabled?: boolean;
    token?: string;
}) {
    if (visualEditingEnabled && !token) {
        throw new Error(
            'The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing.',
        );
    }

    const perspective = visualEditingEnabled ? 'previewDrafts' : 'published';

    const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
        query,
        params ?? {},
        {
            filterResponse: false,
            perspective,
            resultSourceMap: visualEditingEnabled ? 'withKeyArraySelector' : false,
            stega: visualEditingEnabled,
            ...(visualEditingEnabled ? { token } : {}),
        },
    );

    return {
        data: result,
        sourceMap: resultSourceMap,
        perspective,
    };
}
