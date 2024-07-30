**Firebase Firestore Data Operations Documentation**
===========================================================

### Introduction

This document provides a detailed explanation of the Firebase Firestore data operations implemented in the provided code. The operations include saving data to Firestore, updating or inserting data if it already exists, checking if a document exists, deleting documents from Firestore, and retrieving data with specific conditions.

### Save Data to Firestore
-------------------------

#### Function: `saveDataToFireStore`

*   **Purpose:** Saves data to the specified Firestore collection.
*   **Parameters:**
    *   `collectionName`: The name of the Firestore collection where the data will be saved.
    *   `data`: The data to be saved in the collection.
*   **Return Value:** A promise that resolves with the ID of the inserted document or void if an error occurs.

```
export const saveDataToFireStore = async (
  collectionName: string,
  data: Record<string, any>
): Promise<DocumentReference | void> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document inserted: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};
```

### Save or Update Data if it Already Exists
------------------------------------------

#### Function: `saveOrUpdateDataToFireStore`

*   **Purpose:** Saves data to the specified Firestore collection. If a document with the same condition already exists, updates the existing document instead.
*   **Parameters:**
    *   `collectionName`: The name of the Firestore collection where the data will be saved.
    *   `data`: The data to be saved in the collection.
    *   `condition`: The conditions that must match for a document to be updated or inserted.
*   **Return Value:** A promise that resolves with the ID of the updated or inserted document or void if an error occurs.

```
export const saveOrUpdateDataToFireStore = async (
  collectionName: string,
  data: Record<string, any>,
  condition: Record<string, any>
): Promise<DocumentReference | void> => {
  try {
    const collectionRef = collection(db, collectionName);
    const conditions = Object.entries(condition).map(([key, value]) => where(key, "==", value));
    const q = query(collectionRef, ...conditions);

    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return saveDataToFireStore(collectionName, data);
    } else {
      const existingDoc = querySnapshot.docs[0];
      updateDoc(doc(db, collectionName, existingDoc.id), data);
      console.log("Document updated: ", existingDoc.id);
      return existingDoc;
    }
  } catch (e) {
    console.error("Error saving or updating document: ", e);
  }
};
```

### Check if a Document Exists
-----------------------------

#### Function: `checkIfDocumentExists`

*   **Purpose:** Checks if a document exists in the specified Firestore collection based on the given conditions.
*   **Parameters:**
    *   `collectionName`: The name of the Firestore collection where the document will be searched.
    *   `condition`: The conditions that must match for a document to exist.
*   **Return Value:** A promise that resolves with a boolean indicating whether the document exists or not.

```
export const checkIfDocumentExists = async (
  collectionName: string,
  condition: Record<string, any>
): Promise<boolean> => {
  const collectionRef = collection(db, collectionName);

  const conditions = Object.entries(condition).map(([key, value]) => where(key, "==", value));
  const q = query(collectionRef, ...conditions);

  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
};
```

### Delete Documents from Firestore
----------------------------------

#### Function: `deleteDataFromFireStore`

*   **Purpose:** Deletes documents from the specified Firestore collection based on the given conditions.
*   **Parameters:**
    *   `collectionName`: The name of the Firestore collection where the documents will be deleted.
    *   `condition`: The conditions that must match for a document to be deleted.
*   **Return Value:** A promise that resolves with void.

```
export const deleteDataFromFireStore = async (
  collectionName: string,
  condition: Record<string, any>
): Promise<void> => {
  try {
    const collectionRef = collection(db, collectionName);

    const conditions = Object.entries(condition).map(([key, value]) => where(key, "==", value));
    const q = query(collectionRef, ...conditions);

    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (document) => {
      await deleteDoc(doc(db, collectionName, document.id));
      console.log("Document deleted: ", document.id);
    });
  } catch (e) {
    console.error("Error deleting documents: ", e);
  }
};
```

### Get Data with In Condition
------------------------------

#### Function: `getDataWithInCondition`

*   **Purpose:** Retrieves data from the specified Firestore collection based on the given condition.
*   **Parameters:**
    *   `collectionName`: The name of the Firestore collection where the data will be retrieved.
    *   `field`: The field that must match for a document to be included in the result.
    *   `values`: An array of values that the field must match.
*   **Return Value:** A promise that resolves with an array of documents or void if an error occurs.

```
export const getDataWithInCondition = async (
  collectionName: string,
  field: string,
  values: Array<any>
): Promise<Array<any> | void> => {
  try {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, where(field, "in", values));

    const querySnapshot = await getDocs(q);
    const newData: Array<any> = [];
    querySnapshot.forEach((doc) => {
      newData.push({ id: doc.id, ...doc.data() });
    });

    return newData;
  } catch (e) {
    console.error("Error getting data with in condition: ", e);
  }
};
```