import type { PortableTextBlock } from '@portabletext/types';
import type { ImageAsset, Slug } from '@sanity/types';

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
