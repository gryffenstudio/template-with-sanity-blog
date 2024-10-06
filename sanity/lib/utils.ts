import type { SanityAsset } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";
import imageUrlBuilder from '@sanity/image-url';

const imageBuilder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityAsset) {
    return imageBuilder.image(source);
}
