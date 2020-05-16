export function parseProductSlug (slug) {
    let lastIndexOfDot = slug.lastIndexOf('.');
    let productSlug = slug.slice(0, lastIndexOfDot);
    let productUniqueId = slug.slice(lastIndexOfDot + 1, slug.length);

    return {
        slug: productSlug,
        uniqueId: productUniqueId,
    }
}
