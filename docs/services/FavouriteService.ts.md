**Firebase Helper Functions Documentation**
==============================================

This section documents the functions provided by `FireBaseHelper` module.

### 1. insertIfNotExists(collectionName, data, metadata)

#### Description
 Inserts data into a Firebase Firestore collection only if it doesn't already exist. If the document does exist, it will not be updated.

#### Parameters
*   `collectionName`: The name of the Firebase Firestore collection to insert data into.
*   `data`: The data to be inserted (in this case, movie details).
*   `metadata`: Optional metadata to be stored with the data.

### 2. deleteDataFromFireStore(collectionName, data)

#### Description
 Deletes a document from a Firebase Firestore collection based on its unique identifier.

#### Parameters
*   `collectionName`: The name of the Firebase Firestore collection to delete data from.
*   `data`: The data to be deleted (in this case, movie details).

### 3. checkIfDocumentExists(collectionName, condition)

#### Description
 Checks if a document exists in a Firebase Firestore collection based on the provided conditions.

#### Parameters
*   `collectionName`: The name of the Firebase Firestore collection to search.
*   `condition`: An object containing the conditions to be matched (e.g., email and movie title).

### 4. getDataFromFirestore(collectionName, condition)

#### Description
 Retrieves a document from a Firebase Firestore collection based on the provided conditions.

#### Parameters
*   `collectionName`: The name of the Firebase Firestore collection to retrieve data from.
*   `condition`: An object containing the conditions to be matched (e.g., email and movie title).

### 5. getDataWithInCondition(collectionName, field, values)

#### Description
 Retrieves documents from a Firebase Firestore collection that match the provided conditions.

#### Parameters
*   `collectionName`: The name of the Firebase Firestore collection to retrieve data from.
*   `field`: The field to filter by.
*   `values`: An array of values to be matched.

### **IndexDB Helper Functions Documentation**
=============================================

This section documents the functions provided by `IndexDB` module.

### 1. insertIDB(imdbID, data, collectionName)

#### Description
 Inserts movie details into an IndexedDB database using the IMDB ID as a unique key.

#### Parameters
*   `imdbID`: The IMDB ID of the movie.
*   `data`: The movie details to be inserted.
*   `collectionName`: The name of the IndexedDB collection to insert data into.

### 2. getAll(collectionName)

#### Description
 Retrieves all documents from an IndexedDB collection.

#### Parameters
*   `collectionName`: The name of the IndexedDB collection to retrieve data from.

**Main Function Documentation**
=============================

This section documents the main functions provided by this module.

### 1. AddToFavourite(email, imdbID, Title)

#### Description
 Adds a movie to a user's favourites in Firebase Firestore.

#### Parameters
*   `email`: The email of the user.
*   `imdbID`: The IMDB ID of the movie.
*   `Title`: The title of the movie.

### 2. RemoveFromFavourite(email, imdbID, Title)

#### Description
 Removes a movie from a user's favourites in Firebase Firestore.

#### Parameters
*   `email`: The email of the user.
*   `imdbID`: The IMDB ID of the movie.
*   `Title`: The title of the movie.

### 3. toggleFavourite(condition, details)

#### Description
 Toggles a favourite status for a movie in Firebase Firestore based on the provided conditions.

#### Parameters
*   `condition`: An object containing the conditions to be matched (e.g., email and movie title).
*   `details`: An object containing additional data related to the movie.

### 4. fetchFavourites()

#### Description
 Fetches all movies favourited by a user from Firebase Firestore and IndexedDB.

#### Returns
An array of movie details.

Note: This documentation assumes that the functions are being used in the context of a web application, and the parameters are being passed as objects or arrays.