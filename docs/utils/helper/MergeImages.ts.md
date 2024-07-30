**Image Merging Functionality**
==========================

This code provides an implementation of image merging functionality using HTML5 Canvas API. The `mergeImages` function takes in an array of image sources and merges them into a single image.

### Type Definitions

```
type ImageSource = string;
```

*   **ImageSource**: A type alias representing a string, which will be used to store the source URL of images.

---

**loadImages Function**
----------------------

```
function loadImages(sources: ImageSource[]): Promise<HTMLImageElement[]> {
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
```

*   **loadImages**: A function that loads an array of images from their source URLs and returns a promise resolving to an array of HTMLImageElement objects.
*   The `sources` parameter is expected to be an array of strings representing the image sources.
*   It uses `Promise.all()` to load all images concurrently. For each image, it creates a new instance of Image() and sets its crossOrigin property to "anonymous" to allow for cross-domain access.
*   When the image is loaded (onload event), it resolves the promise with the HTMLImageElement object. If there's an error loading the image (onerror event), it rejects the promise.

---

**mergeImages Function**
----------------------

```
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
```

*   **mergeImages**: A function that merges an array of images into a single image and returns the merged image as a promise resolving to a string.
*   The `imageSources` parameter is expected to be an array of strings representing the image sources.
*   It uses the loadImages() function to load all images concurrently. Once loaded, it creates a new HTMLCanvasElement with specified width and height.
*   For each image loaded, it calculates the position where the image should be drawn on the canvas based on its index in the array and the total number of images.
*   It uses the drawImage() method to draw each image onto the canvas at the calculated position. The resulting merged image is then converted into a PNG data URL using the toDataURL() method, which is resolved as the promise value.

---

**Example Usage**
----------------

```
mergeImages(['image1.jpg', 'image2.png'], 800, 600)
    .then(mergedImage => {
        console.log('Merged image:', mergedImage);
    })
    .catch(error => {
        console.error('Error merging images:', error);
    });
```

*   In this example, we call the mergeImages() function with an array of two image sources ('image1.jpg' and 'image2.png'), a specified width (800), and height (600). The function returns a promise that resolves to the merged image as a PNG data URL.
*   We then handle the promise using the then() method, where we log the merged image to the console. If there's an error merging the images, we catch it with the catch() method and log the error message to the console.

Note: This code assumes that the image sources are valid URLs pointing to existing images on the same domain or domains with CORS enabled.