export function getImageUrls(imagePaths: string[]): string[] {
    return imagePaths.map(imagePath => getImageUrl(imagePath));
}

export function getImageUrl(imagePath: string): string {
    return `https://ik.imagekit.io/drinkthedirt/${imagePath}`;
}