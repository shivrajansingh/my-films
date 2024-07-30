**Movie Details Reducer Documentation**
=====================================

### Overview

The `MovieDetailsReducer` is a reducer function used to manage the state of movie details in an application. It takes the current state and an action as input and returns the new state.

### Interfaces
---------------

#### MovieDetailsState

```
interface MovieDetailsState {
  /**
   * The details of the movie, represented as a Record<string, any>.
   */
  movieDetails: Record<string, any>;

  /**
   * A boolean indicating whether the favourite status has been updated.
   */
  isFavouriteUpdated : boolean;

  /**
   * An object representing the delete request, with properties:
   * - `title`: The title of the movie to be deleted (string).
   * - `type`: The type of the movie to be deleted (string).
   * - `details`: Additional details about the delete request (object).
   * - `isDeleted`: A boolean indicating whether the deletion has been performed.
   */
  deleteRequest : Record<string, any>
}
```

#### MovieDetailsAction

```
interface MovieDetailsAction {
  /**
   * The type of action being performed.
   */
  type: string;

  /**
   * The payload associated with the action (any).
   */
  payload: any;
}
```

### Initial State
-----------------

The initial state is defined as follows:

```
const initState: MovieDetailsState = {
  movieDetails: {},
  isFavouriteUpdated : false,
  deleteRequest : {
    title : "", 
    type : "", 
    details : {}, 
    isDeleted : false
  }
};
```

### Reducer Function
-------------------

The `MovieDetailsReducer` function takes the current state and an action as input and returns the new state:

```
const MovieDetailsReducer = (state: MovieDetailsState = initState, action: MovieDetailsAction): MovieDetailsState => {
  const { type, payload } = action;
  
  if (type === 'MOVIE_DETAILS') {
    return {
      ...state,
      movieDetails: payload,
    };
  }
  else if (type === 'FAVOURITE_UPDATED') {
    return {
      ...state,
      isFavouriteUpdated: payload,
    };
  } 
  else if (type === 'DELETE_REQUEST') {
    return {
      ...state,
      deleteRequest: payload,
    };
  }
  
  // If no matching action type, return the current state
  return state;
};
```

### Usage
-----

To use this reducer function, you would typically combine it with a `Redux` store and connect it to your application's components. The exact implementation details will depend on your specific use case.

**Example**

```
import { createStore } from 'redux';
import MovieDetailsReducer from './MovieDetailsReducer';

const store = createStore(MovieDetailsReducer);

// Dispatch an action to update the movie details
store.dispatch({
  type: 'MOVIE_DETAILS',
  payload: {
    title: 'The Shawshank Redemption',
    director: 'Frank Darabont'
  }
});
```

Note that this is a simplified example and you would typically need to handle more complex scenarios, such as handling multiple actions simultaneously, or using `Redux` middleware like `thunk` or `saga`.