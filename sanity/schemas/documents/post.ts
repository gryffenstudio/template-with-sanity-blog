import { defineField, defineType } from 'sanity';
import { getImageDimensions } from '@sanity/asset-utils';

export default defineType({
    name: 'post',
    title: 'Post',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => [
                Rule.required().error('Title is required'),
                Rule.max(60).error('Title must be less than or equal to 60 characters'),
            ],
        }),
        defineField({
            name: 'pageDescription',
            title: 'Page Description',
            type: 'string',
            validation: (Rule) => [
                Rule.required().error('Page Description is required'),
                Rule.max(160).error(
                    'Page Description must be less than or equal to 160 characters',
                ),
            ],
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 75,
            },
            validation: (Rule) => Rule.required().error('Must have a slug!'),
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
            validation: (Rule) => Rule.required().error('Must have an author!'),
        }),
        defineField({
            name: 'cardImageMobile',
            title: 'Mobile Card Image (W 327px x H 303px)',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => [
                Rule.required().error('Must have a mobile card image'),
                Rule.custom((value) => {
                    if (!value) {
                        return true;
                    }

                    if (value && value.asset) {
                        const { width, height } = getImageDimensions(value.asset._ref);

                        if (width < 327 || width > 654 || height < 303 || height > 606) {
                            return `Image must be at least 327x303 pixels and no more than 654x606 pixels! This image is ${width}x${height} pixels`;
                        }
                    }

                    return true;
                }),
            ],
        }),
        defineField({
            name: 'cardImageDesktop',
            title: 'Desktop Card Image (W 380px x H 303px)',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => [
                Rule.required().error('Must have a desktop card image'),
                Rule.custom((value) => {
                    if (!value) {
                        return true;
                    }

                    if (value && value.asset) {
                        const { width, height } = getImageDimensions(value.asset._ref);

                        if (width < 380 || width > 760 || height < 303 || height > 606) {
                            return `Image must be at least 380x303 pixels and no more than 760x606 pixels! This image is ${width}x${height} pixels`;
                        }
                    }

                    return true;
                }),
            ],
        }),
        defineField({
            name: 'cardDescription',
            title: 'Card Description',
            type: 'string',
            validation: (Rule) => [
                Rule.required().error('Card Description is required'),
                Rule.max(80).error('Card Description must be less than or equal to 80 characters'),
            ],
        }),
        defineField({
            name: 'heroImageMobile',
            title: 'Mobile Hero Image (W 375px x H 812px)',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => [
                Rule.required().error('Must have a mobile hero image'),
                Rule.custom((value) => {
                    if (!value) {
                        return true;
                    }

                    if (value && value.asset) {
                        const { width, height } = getImageDimensions(value.asset._ref);

                        if (width < 375 || width > 750 || height < 812 || height > 1624) {
                            return `Image must be at least 375x750 pixels and no more than 812x1624 pixels! This image is ${width}x${height} pixels`;
                        }
                    }

                    return true;
                }),
            ],
        }),
        defineField({
            name: 'heroImageDesktop',
            title: 'Desktop Hero Image (W 1440px x H 1024px)',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => [
                Rule.required().error('Must have a desktop card image'),
                Rule.custom((value) => {
                    if (!value) {
                        return true;
                    }

                    if (value && value.asset) {
                        const { width, height } = getImageDimensions(value.asset._ref);

                        if (width < 1440 || width > 2880 || height < 1024 || height > 2048) {
                            return `Image must be at least 1440x1024 pixels and no more than 2880x2048 pixels! This image is ${width}x${height} pixels`;
                        }
                    }

                    return true;
                }),
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: { type: 'category' },
            validation: (Rule) => Rule.required().error('Must choose at least one category!'),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
            validation: (Rule) => [Rule.required().error('Must have a published date!')],
        }),
        defineField({
            name: 'updatedAt',
            title: 'Updated at',
            type: 'datetime',
            validation: (Rule) =>
                Rule.min(Rule.valueOfField('publishedAt')).error(
                    'Must be later than the published date',
                ),
        }),
        defineField({
            name: 'body',
            title: 'Body',
            type: 'blockContent',
        }),
    ],

    preview: {
        select: {
            title: 'title',
            media: 'heroImageDesktop',
            author: 'author.name',
        },
        prepare(selection) {
            const { author } = selection;
            return { ...selection, subtitle: author && `by ${author}` };
        },
    },
});
