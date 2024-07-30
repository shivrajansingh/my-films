**ColGridItems Component Documentation**

**Overview**

The `ColGridItems` component is a React functional component that displays a grid item containing movie or watchlist details. It is connected to the Redux store using the `connect` function from the `react-redux` library.

**Props**

The component expects the following props:

| Prop | Type | Description |
| --- | --- | --- |
| posterSrc | string | The source URL of the movie's poster image |
| title | string | The title of the movie or watchlist item |
| year | string | The release year of the movie |
| duration | string | The duration of the movie or watchlist item |
| imdbRating | string | The IMDB rating of the movie |
| details | object | An object containing additional details about the movie or watchlist item |
| type | string | The type of grid item (e.g. "watchlist", "watchlistMovie", "favourite") |
| setMovieDetails | function | A function to update the movie details in the Redux store |
| setDeleteRequest | function | A function to send a delete request for the movie or watchlist item |
| setAddToWatchlistDetails | function | A function to add the movie or watchlist item to the user's watchlist |

**State**

The component uses the following state:

| State | Type | Description |
| --- | --- | --- |
| heartImg | string | The source URL of the favorite icon image (initially set to "/assets/images/heart.svg") |

**Lifecycle Methods**

The component uses the `useEffect` hook to execute a function after the first render. In this case, it checks if the movie or watchlist item is already marked as favourite in the IndexedDB storage.

```jsx
useEffect(() => {
  const checkDocument = async () => {
    try {
      let isExists = await getIDB(details?.imdbID, "favourites");
      if (isExists) {
        setHeartImage("/assets/images/heartstraightf-1.svg");
      } else {
        setHeartImage("/assets/images/heart.svg");
      }
    } catch (e: any) {
      setHeartImage("/assets/images/heart.svg");
    }
  };
  checkDocument();
}, [details]);
```

**Event Handlers**

The component defines the following event handlers:

* `handleDelete`: Handles the deletion of the movie or watchlist item by calling the `setDeleteRequest` function.
* `handleAddToWatchList`: Handles the addition of the movie or watchlist item to the user's watchlist by calling the `setAddToWatchlistDetails` function and sending a request to fetch the watchlists.

```jsx
const handleDelete = () => {
  props.setDeleteRequest({
    title: details.Title,
    type: type,
    details,
  });
};

const handleAddToWatchList = async () => {
  props.setAddToWatchlistDetails(details);
  let data = await fetchWatchlists();
  if (data && data.length > 0) {
    document.getElementById("open-assign-movies-to-watchlist")?.click();
  } else {
    document.getElementById("open-create-watchlist-modal")?.click();
  }
};
```

**JSX**

The component returns a JSX fragment containing the following elements:

* A `div` element with class "col" and pt-3 padding.
* An `Image` element displaying the movie's poster image.
* A `div` element with class "favourite-icon" containing a favorite icon image and event handlers for adding to watchlist and deletion.
* A `div` element with class "category-info" containing the movie's title, year, duration, and IMDB rating.
* A `div` element with class "rating" containing the movie's IMDB rating and a favorite icon image.
* A `div` element with class "black-film" serving as a backdrop for the movie details modal.

```jsx
return (
  <>
    <div className="col pt-3">
      {/* ... */}
    </div>
  </>
);
```

**Redux Connection**

The component is connected to the Redux store using the `connect` function from the `react-redux` library. The `mapStateToProps` function maps the `deleteRequest` state from the Redux store to a prop of the same name.

```jsx
function mapStateToProps(state: Record<string, any>) {
  return { deleteRequest: state.MovieDetailsReducer.deleteRequest };
}

export default connect(mapStateToProps, {
  setMovieDetails,
  setDeleteRequest,
  setAddToWatchlistDetails,
})(ColGridItems);
```

Note that this documentation is generated based on the provided code and might not be exhaustive. If you need further clarification or have specific questions, feel free to ask!