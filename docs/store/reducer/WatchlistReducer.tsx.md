**Watchlist Reducer Documentation**
=====================================

### Overview

The `WatchlistReducer` is a reducer function that manages the state of watchlists and related details. It takes an initial state (`initState`) and updates it based on actions dispatched to it.

### Interfaces
---------------

#### WatchlistState

```
interface WatchlistState {
  /**
   * An array of objects representing watchlists.
   */
  watchlists: Array<Record<string, any>>;
  /**
   * An object containing details for adding to a watchlist.
   */
  addToWatchlistDetails : Record<string, any>;
}
```

#### WatchlistAction

```
interface WatchlistAction {
  /**
   * The type of action being performed (e.g., 'ADD_DATA', 'ADD_TO_WATCHLIST').
   */
  type: string;
  /**
   * The payload associated with the action.
   */
  payload: Array<Record<string, any>>;
}
```

### Initial State
-----------------

```
const initState: WatchlistState = {
  watchlists: [],
  addToWatchlistDetails : {}
};
```

The initial state consists of an empty array (`watchlists`) and an empty object (`addToWatchlistDetails`).

### Reducer Function
---------------------

```
const WatchlistReducer = (state: WatchlistState = initState, action: WatchlistAction): WatchlistState => {
  const { type, payload } = action;
  
  // Handle 'ADD_DATA' action
  if (type === 'ADD_DATA') {
    return {
      ...state,
      watchlists: payload,
    };
  }
  
  // Handle 'ADD_TO_WATCHLIST' action
  else if(type === 'ADD_TO_WATCHLIST'){
    return {
      ...state, 
      addToWatchlistDetails : payload
    }
  } 
  
  // Default case (no update)
  else {
    return state;
  }
};
```

The `WatchlistReducer` function takes the current state (`state`) and an action object (`action`). It extracts the type and payload from the action, then updates the state accordingly.

*   If the action is of type `'ADD_DATA'`, it replaces the existing watchlists with the new ones provided in the payload.
*   If the action is of type `'ADD_TO_WATCHLIST'`, it adds or updates details for adding to a watchlist using the payload.
*   In any other case, it returns the state without making any changes.

### Usage
------------

To use this reducer function, you would typically combine it with a store (e.g., Redux) and dispatch actions to update the watchlists state. For example:

```
const store = createStore(WatchlistReducer);

store.dispatch({ type: 'ADD_DATA', payload: [{ id: 1 }, { id: 2 }] });
store.dispatch({ type: 'ADD_TO_WATCHLIST', payload: { id: 3, name: 'New Watchlist' } });

console.log(store.getState());
```

This would output the updated state with watchlists and details for adding to a watchlist.