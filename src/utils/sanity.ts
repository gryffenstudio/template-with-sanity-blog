import { sanityClient } from 'sanity:client';
import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { QueryParams } from 'sanity';
import { defineLocations } from 'sanity/presentation';
import type { PresentationPluginOptions } from 'sanity/presentation';

const visualEditingEnabled = import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === 'true';
const token = import.meta.env.PUBLIC_SANITY_API_VIEWER_TOKEN;

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityAsset) {
    return imageBuilder.image(source);
}

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    // Add more locations for other post types
    post: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `/blog/${doc?.slug}`,
          },
          { title: "Blog Posts", href: location.origin },
        ],
      }),
    }),
  },
};

export async function loadQuery<QueryResponse>({
    query,
    params,
}: {
    query: string;
    params?: QueryParams;
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

export async function getPosts(numOfPosts?: number): Promise<Post[]> {
    let filter: string = '';
    if (numOfPosts) {
        filter = `[0...${numOfPosts}]`;
    }

    const query = groq`*[_type == "post" && defined(slug.current)] | order(updatedAt desc) ${filter}{
            title,
            pageDescription,
            cardDescription,
            slug,
            author->{
                _id,
                name,
            },
            category->,
            cardImageMobile,
            cardImageDesktop,
            _createdAt,
            body
        }`;

    const { data } = await loadQuery<Post[]>({ query });
    return data;
}
export async function getPostCount(): Promise<number> {
    const query = groq`count(*[_type == "post" && defined(slug.current)])`;
    const { data } = await loadQuery<number>({ query });
    return data;
}

export async function getPost(slug: string): Promise<Post> {
    const query = groq`*[_type == "post" && slug.current == $slug][0]{
            ...,
            author->{
                name,
                websiteLink,
                slug,
                image
            },
            category->{
                title,
                slug
            },
        }`;
    const { data } = await loadQuery<Post>({ query, params: { slug } });
    return data;
}

export async function getRelatedPosts(category: string): Promise<Post[]> {
    const query = groq`*[_type == "post" && defined(slug.current) && category->title == $category] | order(updatedAt desc) [0...3] {
            title,
            pageDescription,
            cardDescription,
            slug,
            author->{
                _id,
                name,
            },
            category->,
            cardImageMobile,
            cardImageDesktop,
            _createdAt,
            body,
        }`;

    const { data } = await loadQuery<Post[]>({ query, params: { category } });

    return data;
}

export async function getCategories(): Promise<Category[]> {
    const query = groq`*[_type == "category" && defined(slug.current)]`;
    const { data } = await loadQuery<Category[]>({ query });
    return data;
}

export async function getCategory(slug: string): Promise<Category> {
    const query = groq`*[_type == "category" && slug.current == $slug][0]`;
    const { data } = await loadQuery<Category>({ query, params: { slug } });
    return data;
}

export interface Post {
    _type: 'post';
    title: string;
    pageDescription: string;
    slug: Slug;
    cardImageMobile: ImageAsset;
    cardImageDesktop: ImageAsset;
    cardDescription: string;
    heroImageMobile: ImageAsset;
    heroImageDesktop: ImageAsset;
    publishedAt: string;
    updatedAt: string;
    body: PortableTextBlock[];
    category: Category;
    author: Author;
}

export interface Category {
    _type: 'category';
    title: string;
    description: string;
    slug: Slug;
}

export interface Author {
    _type: 'author';
    name: string;
    slug: Slug;
    websiteLink: URL;
    image: ImageAsset;
}
