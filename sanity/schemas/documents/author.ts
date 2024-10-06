import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required().error('Must have a name!'),
        }),
        defineField({
            name: 'websiteLink',
            title: 'Website Link',
            type: 'url',
            validation: (Rule) => [
                Rule.uri({ allowRelative: true }).custom((url) => {
                    if (url && url.startsWith('/')) {
                        return true; // Allow relative URLs
                    } else if (url && url.startsWith('https://')) {
                        return true; // Allow HTTPS URLs
                    }
                    return 'Must be a HTTPS url (https://www.johndoe.com) or internal url (/john-doe)';
                }),
            ],
        }),
        defineField({
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required().error('Must have an image!'),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
        },
    },
});
