import type { StructuredData, StructuredDataInput } from './StructuredData';

export default function jsonLoadGenerator(dataArray: StructuredDataInput[]): string {
    const graph: StructuredData[] = dataArray.map(({ type, data }) => {
        if (type === 'BreadcrumbList') {
            return {
                '@type': 'BreadcrumbList',
                itemListElement: data.items.map(
                    (item: { name: string; url: string }, index: number) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: item.name,
                        item: item.url,
                    }),
                ),
            } as StructuredData;
        } else {
            return {
                '@type': type,
                ...data,
            } as StructuredData;
        }
    });

    return JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': graph,
    });
}
