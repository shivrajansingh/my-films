type ImageSource = string;

export function loadImages(sources: ImageSource[]): Promise<HTMLImageElement[]> {
    return Promise.all(
        sources.map((src) => {
            return new Promise<HTMLImageElement>((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        })
    );
}

export function mergeImages(imageSources: ImageSource[], width = 490, height = 720): Promise<string> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;

        loadImages(imageSources)
            .then(images => {
                const segmentWidth = canvas.width / images.length;

                images.forEach((img, index) => {
                    const sx = img.width * (index / images.length);
                    const sy = 0;
                    const sWidth = img.width / images.length;
                    const sHeight = img.height;
                    const dx = segmentWidth * index;
                    const dy = 0;
                    const dWidth = segmentWidth;
                    const dHeight = canvas.height;

                    context.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
                });

                resolve(canvas.toDataURL('image/png'));
            })
            .catch(reject);
    });
}
