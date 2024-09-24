import { sanityClient } from 'sanity:client';
import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';
import imageUrlBuilder from '@sanity/image-url';
import groq from 'groq';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityAsset) {
    return imageBuilder.image(source);
}

export async function getPosts(numOfPosts?: number): Promise<Post[]> {
    let filter: string = '';
    if (numOfPosts) {
        filter = `[0...${numOfPosts}]`;
    }
    return await sanityClient.fetch(
        groq`*[_type == "post" && defined(slug.current)] | order(updatedAt desc) ${filter}{
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
        }`,
    );
}
export async function getPostCount(): Promise<number> {
    return await sanityClient.fetch(groq`count(*[_type == "post" && defined(slug.current)])`);
}

export async function getPost(slug: string): Promise<Post> {
    return await sanityClient.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{
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
        }
    `,
        {
            slug,
        },
    );
}

export async function getRelatedPosts(category: string): Promise<Post[]> {
    return await sanityClient.fetch(
        groq`*[_type == "post" && defined(slug.current) && category->title == $category] | order(updatedAt desc) [0...3] {
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
        }`,
        {
            category,
        },
    );
}

export async function getCategories(): Promise<Category[]> {
    return await sanityClient.fetch(groq`*[_type == "category" && defined(slug.current)]`);
}

export async function getCategory(slug: string): Promise<Category> {
    return await sanityClient.fetch(groq`*[_type == "category" && slug.current == $slug][0]`, {
        slug,
    });
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
