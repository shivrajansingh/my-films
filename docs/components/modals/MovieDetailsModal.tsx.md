**Code Documentation**

### Overview

This is a React functional component named `MovieDetailsModal`. It's a modal dialog that displays movie details, including poster image, ratings, plot, and other relevant information.

### Dependencies

* `React`: The core library for building user interfaces.
* `Redux`: A state management library used to manage the application's state.
* `fetchWatchlists`: An asynchronous function that fetches watchlist data from an API or database.
* `toggleFavourite`: An asynchronous function that toggles a movie's favouriteness status.

### Props

The component expects two props:

* `details`: An object containing movie details, such as poster image URL, title, plot, and other relevant information.
* `isFavouriteUpdated`: A boolean flag indicating whether the favourite list has been updated.

### State

The component uses the following state:

* `isLoading`: A boolean flag indicating whether data is being loaded from an API or database.
* `isError`: A boolean flag indicating whether there's an error fetching data.
* `movieDetails`: An object containing movie details, used to store the movie's favourite status and watchlist information.

### Functions

The component defines several functions:

#### `handleFavourite`

* Toggles a movie's favouriteness status when the "Add/Remove from Favourites" button is clicked.
* Calls `toggleFavourite` with the movie's details object and `favouriteObj` (constructed using the movie's details) as arguments.
* Updates the favourite list in local storage or database using `setIDB`.
* Updates the component's state to reflect the change.

#### `handleAddToWatchList`

* Adds a movie to a user's watchlist when the "Add to Watchlist" button is clicked.
* Calls `fetchWatchlists` to fetch watchlist data from an API or database.
* If watchlist data exists, opens a modal dialog to assign movies to the watchlist.
* Otherwise, opens a modal dialog to create a new watchlist.

#### `getMovieDetail`

* A utility function that retrieves movie details (e.g., poster image URL, title) using the provided key.
* Returns the value associated with the given key in the movie's details object.

#### `getRatingImageSrc`

* A utility function that returns the image source for a rating icon based on the rating source.

#### `getRatingLabel`

* A utility function that returns a human-readable label for a rating source (e.g., "IMDB").

### JSX

The component's JSX consists of:

1. A modal dialog container with the class "modal".
2. A button to close the modal dialog.
3. The movie details section, which includes:
	* Poster image
	* Ratings
	* Plot and other relevant information
4. Buttons to toggle favouriteness status and add to watchlist.

### Redux Connection

The component is connected to a Redux store using the `connect` function from `react-redux`. It maps state properties `movieDetails` and `isFavouriteUpdated` to props, which are used in the component's JSX and functions.

### Export

The component is exported as a default export of the module.