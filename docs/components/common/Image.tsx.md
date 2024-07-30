**Image Component Documentation**
=====================================

**Overview**
------------

The `Image` component is a functional React component that displays an image with the ability to fetch and merge multiple images from a watchlist.

**Props**
--------

### ImageProps Interface

```
interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  watchlist?: any[];
}
```

*   **src**: The source URL of the image to be displayed.
*   **alt**: An optional string representing the alternative text for the image (default: empty string).
*   **watchlist**: An optional array of strings or objects, where each item represents a source URL of an image to be merged with the main image (default: empty array).

**Component Function**
-------------------

```
const Image: FC<ImageProps> = ({ src, alt="", watchlist=[], ...rest }) => {
  const [imageSrc, setImageSrc] = useState(src);

  useEffect(() => {
    // ...
  }, [watchlist, src]);
};
```

*   The component uses the `useState` hook to store the image source URL in a state variable (`imageSrc`) and initialize it with the provided `src` prop.
*   The `useEffect` hook is used to fetch and merge images from the watchlist when the component mounts or when the `watchlist` or `src` props change.

**fetchWatchlistImage Function**
-------------------------------

```
const fetchWatchlistImage = async () => {
  let newSrc;

  if (watchlist && watchlist.length > 0) {
    try {
      newSrc = await mergeImages(watchlist);
      if (newSrc) {
        setImageSrc(newSrc);
      } else {
        setFeaturedImage(src);
      }
    } catch (err) {
      console.log(err);
      setFeaturedImage(src);
    }
  } else {
    setFeaturedImage(src);
  }

  fetchWatchlistImage();
};
```

*   This function is called when the component mounts or when the `watchlist` or `src` props change.
*   It checks if a watchlist is provided and has at least one item.
*   If true, it attempts to merge the images in the watchlist using the `mergeImages` utility function. If successful, it updates the image source URL state variable with the merged image.
*   If an error occurs during image merging or if no watchlist is provided, it falls back to displaying the original image from the `src` prop.

**setFeaturedImage Function**
-------------------------

```
const setFeaturedImage = (src: string) => {
  setImageSrc((src === 'N/A') ? "/assets/images/default.jpg" : src);
};
```

*   This function is used to update the image source URL state variable with a default image if no image can be merged from the watchlist.

**Render Function**
-----------------

```
return (
  <img
    src={imageSrc}
    alt={alt}
    loading="lazy"
    {...rest}
  />
);
```

*   The component renders an `img` element with the updated image source URL (`imageSrc`) and alternative text (`alt`). The `loading` attribute is set to "lazy" for improved performance.