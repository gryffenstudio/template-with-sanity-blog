export function formatDate(date: string, format?: Intl.DateTimeFormatOptions) {
    if (format) {
        return new Date(date).toLocaleDateString('en-GB', format);
    }
    return new Date(date).toLocaleDateString('en-GB', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}
