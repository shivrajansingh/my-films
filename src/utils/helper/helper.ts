export const chunkArray = <T,>(array: T[], size: number): T[][] => {
    const chunkedArray: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  };

  export function slugify(str: string): string {
    return str
        .toLowerCase()                               // Convert to lowercase
        .trim()                                      // Trim leading and trailing spaces
        .replace(/[^\w\s-]/g, '')                    // Remove all non-word characters except spaces and hyphens
        .replace(/[\s]+/g, '-')                      // Replace spaces (including multiple spaces) with hyphen
        .replace(/-{2,}/g, '-')                      // Replace multiple hyphens with a single hyphen
        .replace(/^-+|-+$/g, '');                    // Remove leading or trailing hyphens
}

  