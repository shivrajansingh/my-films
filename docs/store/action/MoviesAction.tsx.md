**Redux Action Creators Documentation**
=====================================

### Overview

The following code snippet defines three Redux action creators using the `export` statement to make them available for import in other parts of the application.

### Action Creators

#### 1. `setMovieDetails`

**Purpose:** Sets the movie details in the Redux store.

**Parameters:**

* `payload`: An object containing the movie details, where each property corresponds to a field in the data structure (e.g., title, release year, genre).

**Code Block:**
```
export const setMovieDetails = (payload: Record<string, any>) => ({
  type: 'MOVIE_DETAILS',
  payload,
});
```

#### 2. `setIsFavouriteUpdated`

**Purpose:** Updates the favorite status in the Redux store.

**Parameters:**

* `payload`: A boolean value indicating whether the favorite status has been updated (true) or not (false).

**Code Block:**
```
export const setIsFavouriteUpdated = (payload: boolean) => ({
  type: 'FAVOURITE_UPDATED',
  payload,
});
```

#### 3. `setDeleteRequest`

**Purpose:** Initiates a delete request for an item in the Redux store.

**Parameters:**

* `payload`: An object containing the details of the item to be deleted (e.g., ID, type).

**Code Block:**
```
export const setDeleteRequest = (payload: Record<string, any>) => ({
  type: 'DELETE_REQUEST',
  payload,
});
```

### Type Definitions

The code uses TypeScript type definitions to specify the expected data types for each parameter. The `Record<string, any>` type represents an object with string keys and values of any type.

### Usage Examples

To use these action creators in your Redux reducer or other components, import them and dispatch the actions accordingly:

```
import { setMovieDetails } from './actionCreators';

const movieDetails = {
  title: 'The Shawshank Redemption',
  releaseYear: 1994,
};

store.dispatch(setMovieDetails(movieDetails));
```

Note that this documentation assumes you have a basic understanding of Redux and its core concepts. If you're new to Redux, consider starting with the official [Redux documentation](https://redux.js.org/).