**Delete Confirmation Modal Component**
=====================================

### Overview

The `DeleteConfirmationModal` component is a reusable React component that presents a confirmation modal to the user before deleting a movie or watchlist item. It uses React Redux for state management and integrates with Firebase for watchlist data storage.

### Props

| Prop Name | Type | Description |
| --- | --- | --- |
| `deleteRequest` | Record<string, any> | The request details object containing the title, type, and details of the item to be deleted. |
| `isFavouriteUpdated` | boolean | A flag indicating whether the favourite list has been updated. |
| `setDeleteRequest` | (requestDetails:Record<string, any>) => void | A callback function to update the delete request state. |
| `setIsFavouriteUpdated` | (isUpdated:boolean) => void | A callback function to update the isFavouriteUpdated flag. |
| `setWatchlist` | (payload: Array<Record<string, any>>) => void | A callback function to update the watchlist state. |

### State

| State Name | Type | Description |
| --- | --- | --- |
| `btnText` | string | The text to display on the delete button. Initially set to "Yes, Delete". |
| `user` | any | The user object stored in local storage. |

### Effects

*   The component uses the `useEffect` hook to get the user data from local storage and store it in the `user` state variable.

### Functions

#### `handleCancel`

*   A function that cancels the delete request by updating the `deleteRequest` state with a new object having an empty title, type, details, and isDeleted flag set to false.
*   The modal will be closed automatically when this function is called.

#### `handleDelete`

*   An asynchronous function that handles the deletion of the movie or watchlist item based on its type.
*   For favourite items:
    *   Toggles the favourite status using the `toggleFavourite` service.
    *   Deletes the item from the favourites indexDB using the `deleteIDB` helper function.
    *   Updates the isFavouriteUpdated flag using the `setIsFavouriteUpdated` callback.
*   For watchlist items:
    *   Deletes the watchlist entry from Firebase using the `deleteDataFromFireStore` helper function.
    *   Deletes the item from the watchlist indexDB using the `deleteIDB` helper function.
    *   Clears all keys in the watchlist indexDB using the `clearAllKeys` helper function.
    *   Retrieves the latest data from the watchlist indexDB using the `getAll` helper function.
    *   Updates the watchlist state using the `setWatchlist` callback.
*   For watchlist movie items:
    *   Deletes the movie entry from Firebase using the `deleteDataFromFireStore` helper function.
    *   Deletes the item from the watchlist indexDB using the `deleteIDB` helper function.
    *   Updates the watchlist state using the `setWatchlist` callback and the `updateWatchlists` service.

### Rendering

The component renders a modal dialog with two buttons: "No, Cancel" and "Yes, Delete". The delete button text is initially set to "Yes, Delete", but it will be updated to "Please Wait.." during deletion and then reset to "Yes, Delete".

```jsx
import React, { useEffect, useState } from 'react';
import Image from '../common/Image';
import { connect } from 'react-redux';
import {
  setDeleteRequest,
  setIsFavouriteUpdated,
} from '../../store/action/MoviesAction';
import {
  setWatchlist,
} from '../../store/action/WatchlistAction';
import {
  clearAllKeys,
  deleteIDB,
  getAll,
} from '../../utils/helper/IndexDB';
import { toggleFavourite } from '../../services/FavouriteService';
import { deleteDataFromFireStore } from '../../utils/helper/FireBaseHelper';
import { watchlist_tables } from '../../utils/constants/tables';
import {
  updateWatchlists,
} from '../../services/WatchlistService';

interface DeleteConfirmationModalProps {
  deleteRequest: Record<string, any>;
  isFavouriteUpdated: boolean;
  setDeleteRequest: (requestDetails: Record<string, any>) => void;
  setIsFavouriteUpdated: (isUpdated: boolean) => void;
  setWatchlist: (payload: Array<Record<string, any>>) => void;
}

function DeleteConfirmationModal({
  deleteRequest,
  isFavouriteUpdated,
  setDeleteRequest,
  setIsFavouriteUpdated,
  setWatchlist,
}) {
  const [btnText, setBtnText] = useState('Yes, Delete');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleCancel = () => {
    setDeleteRequest({
      title: '',
      type: '',
      details: null,
      isDeleted: false,
    });
  };

  const handleDelete = async () => {
    if (deleteRequest.type === 'favourite') {
      await toggleFavourite(deleteRequest.details);
      deleteIDB('favourites', deleteRequest.details.id);
      setIsFavouriteUpdated(true);
    } else if (deleteRequest.type === 'watchlist') {
      deleteDataFromFireStore('watchlists', deleteRequest.details.id);
      deleteIDB('watchlists', deleteRequest.details.id);
      clearAllKeys('watchlists');
      const latestData = await getAll('watchlists');
      setWatchlist(latestData);
    } else if (deleteRequest.type === 'watchlist_movie') {
      deleteDataFromFireStore('watchlist_movies', deleteRequest.details.id);
      deleteIDB('watchlist_movies', deleteRequest.details.id);
      const updatedWatchlist = await updateWatchlists();
      setWatchlist(updatedWatchlist);
    }
  };

  return (
    <div>
      <h2>Confirm Delete</h2>
      {deleteRequest && (
        <>
          <p>
            Are you sure you want to delete the{' '}
            {deleteRequest.type === 'favourite'
              ? 'movie'
              : deleteRequest.type === 'watchlist'
                ? 'watchlist item'
                : 'movie from watchlist'}?
          </p>
          <button onClick={handleCancel}>No, Cancel</button>
          <button onClick={handleDelete}>
            {btnText}
          </button>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  deleteRequest: state.movies.deleteRequest,
  isFavouriteUpdated: state.movies.isFavouriteUpdated,
});

const mapDispatchToProps = {
  setDeleteRequest,
  setIsFavouriteUpdated,
  setWatchlist,
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteConfirmationModal);
```