import { collection, addDoc, DocumentReference, query, where, getDocs, setDoc, doc, deleteDoc, getFirestore, getDoc, Firestore, limit, FirestoreError, QueryConstraint } from "firebase/firestore";
import { db } from '../../firebase'; 
/**
 * Inserting Data to Firebase Store
 * @param collectionName 
 * @param data 
 * @returns inserted_id
 */
export const saveDataToFireStore = async(collectionName:string, data: Record<string, any>) : Promise<DocumentReference | void>=> {
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        console.log("Document inserted: ", docRef.id);
        return docRef;
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}

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

    let docRef: DocumentReference;

    if (!querySnapshot.empty) {
      docRef = querySnapshot.docs[0].ref;
      await setDoc(docRef, data, { merge: true });
      console.log("Document updated: ", docRef.id);
    } else {
      docRef = await addDoc(collectionRef, data);
      console.log("Document inserted: ", docRef.id);
    }

    return docRef;
  } catch (e) {
    console.error("Error saving or updating document: ", e);
  }
};

export const insertIfNotExists = async (
  collectionName: string,
  data: Record<string, any>,
  condition: Record<string, any>
): Promise<DocumentReference | void> => {
  try {
    const collectionRef = collection(db, collectionName);
    const conditions = Object.entries(condition).map(([key, value]) => where(key, "==", value));
    const q = query(collectionRef, ...conditions);
    const querySnapshot = await getDocs(q);

    let docRef: DocumentReference;
    if (querySnapshot.empty) {
      docRef = await addDoc(collectionRef, data);
      console.log("Document inserted: ", docRef.id);
      return docRef;
    }
  } catch (e) {
    console.error("Error inserting document: ", e);
  }
};

// export const getDataFromFirestore = async (
//   collectionName: string,
//   conditions?: Record<string, any>
// ): Promise<Array<any> | void> => {
//   try {
//     let q;
//     if (conditions) {
//       const conditionArray = Object.entries(conditions).map(([field, value]) => where(field, "==", value));
//       q = query(collection(db, collectionName), ...conditionArray);
//     } else {
//       q = query(collection(db, collectionName));
//     }

//     const querySnapshot = await getDocs(q);
//     const newData: Array<any> = [];
//     querySnapshot.forEach((doc) => {
//       newData.push({ id: doc.id, ...doc.data() });
//     });
//     return newData;
//   } catch (e) {
//     console.error("Error getting documents: ", e);
//   }
// };


export const getDataFromFirestore = async (
  collectionName: string,
  conditions?: Record<string, any>,
  limitResults: number = 100
): Promise<Array<any> | void> => {
  try {
    let constraints: QueryConstraint[] = [];

    if (conditions) {
      const conditionArray = Object.entries(conditions).map(([field, value]) => where(field, "==", value));
      constraints = [...constraints, ...conditionArray];
    }

    constraints.push(limit(limitResults));

    const q = query(collection(db, collectionName), ...constraints);
    const querySnapshot = await getDocs(q);

    const newData: Array<any> = [];
    querySnapshot.forEach((doc) => {
      newData.push({ id: doc.id, ...doc.data() });
    });

    return newData;
  } catch (e) {
    console.error("Error getting documents: ", (e as FirestoreError).message);
  }
};

export async function getDataByIdFromFirestore(collectionName: string, id: string): Promise<any | null> {
  try {
      const firestore: Firestore = getFirestore();
      const docRef = doc(firestore, collectionName, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.error('No such document!');
          return null;
      }
  } catch (error) {
      console.error('Error getting document:', error);
      return null;
  }
}

export const extractUserData = async (user: any) => {
  const token = await user.getIdToken();

  return {
    uid: user.uid,
    auth: {
      providerId: user.providerId,
      accessToken: token,
    },
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    isAnonymous: user.isAnonymous,
    metadata: {
      creationTime: user.metadata.creationTime,
      lastSignInTime: user.metadata.lastSignInTime,
    },
  };
};

export const deleteDataFromFireStore = async(collectionName: string, condition: Record<string, any>): Promise<void> => {
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
    console.error("Error deleting document: ", e);
  }
}

export const checkIfDocumentExists = async (collectionName: string, condition: Record<string, any>): Promise<boolean> => {
  const collectionRef = collection(db, collectionName);

  const conditions = Object.entries(condition).map(([key, value]) => where(key, "==", value));
  const q = query(collectionRef, ...conditions);

  const querySnapshot = await getDocs(q);
  return !querySnapshot.empty;
}

export const getDataWithInCondition = async (
  collectionName: string,
  field: string,
  values: Array<any>
): Promise<Array<any> | void> => {
  if(values.length === 0) return []; 
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
    console.error("Error getting documents: ", e);
  }
};
