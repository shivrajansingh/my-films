import { saveDataToFireStore, saveOrUpdateDataToFireStore, insertIfNotExists, getDataFromFirestore, getDataByIdFromFirestore, extractUserData, deleteDataFromFireStore, checkIfDocumentExists, getDataWithInCondition } from '../FireBaseHelper';
import { collection, addDoc, DocumentReference, query, where, getDocs, setDoc, limit, getFirestore, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

jest.mock('firebase/firestore', () => ({
    collection: jest.fn(),
    addDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
    setDoc: jest.fn(),
    limit: jest.fn(),
    getFirestore: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    deleteDoc: jest.fn(),
}));

jest.mock('../../../firebase', () => ({
    db: {},
}));

describe('saveDataToFireStore', () => {
    it('should insert data into Firestore and return the document reference', async () => {
        const collectionName = 'collectionName';
        const data = { field: 'value' };
        const mockDocRef = { id: 'mock-id' } as DocumentReference;

        (collection as jest.Mock).mockReturnValue({});
        (addDoc as jest.Mock).mockResolvedValue(mockDocRef);

        const docRef = await saveDataToFireStore(collectionName, data);

        expect(docRef).toBeDefined();
        expect(docRef).toEqual(mockDocRef);
        expect(addDoc).toHaveBeenCalledWith({}, data);
    });

    it('should log an error if inserting data fails', async () => {
        const collectionName = 'collectionName';
        const data = { field: 'value' };
        const error = new Error('Mock error');

        (collection as jest.Mock).mockReturnValue({});
        (addDoc as jest.Mock).mockRejectedValue(error);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const docRef = await saveDataToFireStore(collectionName, data);

        expect(docRef).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error adding document: ', error);

        consoleErrorSpy.mockRestore();
    });
});

describe('saveOrUpdateDataToFireStore', () => {
    it('should update the document if it exists', async () => {
        const collectionName = 'collectionName';
        const data = { field: 'value' };
        const condition = { field: 'value' };
        const mockDocRef = { id: 'mock-id', ref: {} } as unknown as DocumentReference;
        const mockQuerySnapshot = {
            empty: false,
            docs: [{ ref: mockDocRef }],
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);
        (setDoc as jest.Mock).mockResolvedValue(mockDocRef);

        const docRef = await saveOrUpdateDataToFireStore(collectionName, data, condition);

        expect(docRef).toBeDefined();
        expect(docRef).toEqual(mockDocRef);
        expect(setDoc).toHaveBeenCalledWith(mockDocRef, data, { merge: true });
    });

    it('should insert the document if it does not exist', async () => {
        const collectionName = 'collectionName';
        const data = { field: 'value' };
        const condition = { field: 'value' };
        const mockDocRef = { id: 'mock-id' } as DocumentReference;
        const mockQuerySnapshot = {
            empty: true,
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);
        (addDoc as jest.Mock).mockResolvedValue(mockDocRef);

        const docRef = await saveOrUpdateDataToFireStore(collectionName, data, condition);

        expect(docRef).toBeDefined();
        expect(docRef).toEqual(mockDocRef);
        expect(addDoc).toHaveBeenCalledWith({}, data);
    });

    it('should log an error if saving or updating fails', async () => {
        const collectionName = 'collectionName';
        const data = { field: 'value' };
        const condition = { field: 'value' };
        const error = new Error('Mock error');

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockRejectedValue(error);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const docRef = await saveOrUpdateDataToFireStore(collectionName, data, condition);

        expect(docRef).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error saving or updating document: ', error);

        consoleErrorSpy.mockRestore();
    });
});

describe('insertIfNotExists', () => {
    it('should insert the document if it does not exist', async () => {
        const collectionName = 'collectionName';
        const data = { field: 'value' };
        const condition = { field: 'value' };
        const mockDocRef = { id: 'mock-id' } as DocumentReference;
        const mockQuerySnapshot = {
            empty: true,
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);
        (addDoc as jest.Mock).mockResolvedValue(mockDocRef);

        const docRef = await insertIfNotExists(collectionName, data, condition);

        expect(docRef).toBeDefined();
        expect(docRef).toEqual(mockDocRef);
        expect(addDoc).toHaveBeenCalledWith({}, data);
    });

    it('should not insert the document if it already exists', async () => {
        const collectionName = 'collectionName';
        const data = { field: 'value' };
        const condition = { field: 'value' };
        const mockQuerySnapshot = {
            empty: false,
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

        const docRef = await insertIfNotExists(collectionName, data, condition);

        expect(docRef).toBeUndefined();
        // expect(addDoc).not.toHaveBeenCalled();
    });

    it('should log an error if inserting fails', async () => {
        const collectionName = 'collectionName';
        const data = { field: 'value' };
        const condition = { field: 'value' };
        const error = new Error('Mock error');

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockRejectedValue(error);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const docRef = await insertIfNotExists(collectionName, data, condition);

        expect(docRef).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error inserting document: ', error);

        consoleErrorSpy.mockRestore();
    });
});

describe('getDataFromFirestore', () => {
    it('should return data from Firestore with conditions', async () => {
        const collectionName = 'collectionName';
        const conditions = { field: 'value' };
        const limitResults = 100;
        const mockQuerySnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: 'mock-id', data: jest.fn().mockReturnValue({ field: 'value' }) });
            }),
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (limit as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

        const data = await getDataFromFirestore(collectionName, conditions, limitResults);

        expect(data).toBeDefined();
        expect(data).toEqual([{ id: 'mock-id', field: 'value' }]);
    });

    it('should return data from Firestore without conditions', async () => {
        const collectionName = 'collectionName';
        const limitResults = 100;
        const mockQuerySnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: 'mock-id', data: jest.fn().mockReturnValue({ field: 'value' }) });
            }),
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (limit as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

        const data = await getDataFromFirestore(collectionName, undefined, limitResults);

        expect(data).toBeDefined();
        expect(data).toEqual([{ id: 'mock-id', field: 'value' }]);
    });

    it('should log an error if getting documents fails', async () => {
        const collectionName = 'collectionName';
        const conditions = { field: 'value' };
        const limitResults = 100;
        const error = new Error('Mock error');

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (limit as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockRejectedValue(error);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const data = await getDataFromFirestore(collectionName, conditions, limitResults);

        expect(data).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error getting documents: ', error.message);

        consoleErrorSpy.mockRestore();
    });
});

describe('getDataByIdFromFirestore', () => {
    it('should return data from Firestore by ID', async () => {
        const collectionName = 'collectionName';
        const id = 'mock-id';
        const mockDocSnap = {
            exists: jest.fn().mockReturnValue(true),
            data: jest.fn().mockReturnValue({ field: 'value' }),
        };

        (getFirestore as jest.Mock).mockReturnValue({});
        (doc as jest.Mock).mockReturnValue({});
        (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

        const data = await getDataByIdFromFirestore(collectionName, id);

        expect(data).toBeDefined();
        expect(data).toEqual({ field: 'value' });
        expect(getDoc).toHaveBeenCalledWith({});
    });

    it('should log an error if document does not exist', async () => {
        const collectionName = 'collectionName';
        const id = 'mock-id';
        const mockDocSnap = {
            exists: jest.fn().mockReturnValue(false),
        };

        (getFirestore as jest.Mock).mockReturnValue({});
        (doc as jest.Mock).mockReturnValue({});
        (getDoc as jest.Mock).mockResolvedValue(mockDocSnap);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const data = await getDataByIdFromFirestore(collectionName, id);

        expect(data).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith('No such document!');

        consoleErrorSpy.mockRestore();
    });

    it('should log an error if getting document fails', async () => {
        const collectionName = 'collectionName';
        const id = 'mock-id';
        const error = new Error('Mock error');

        (getFirestore as jest.Mock).mockReturnValue({});
        (doc as jest.Mock).mockReturnValue({});
        (getDoc as jest.Mock).mockRejectedValue(error);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const data = await getDataByIdFromFirestore(collectionName, id);

        expect(data).toBeNull();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error getting document:', error);

        consoleErrorSpy.mockRestore();
    });
});

describe('extractUserData', () => {
    it('should extract user data', async () => {
        const mockUser = {
            getIdToken: jest.fn().mockResolvedValue('mock-token'),
            uid: 'mock-uid',
            providerId: 'mock-provider',
            displayName: 'mock-displayName',
            email: 'mock-email',
            emailVerified: true,
            phoneNumber: 'mock-phoneNumber',
            photoURL: 'mock-photoURL',
            isAnonymous: false,
            metadata: {
                creationTime: 'mock-creationTime',
                lastSignInTime: 'mock-lastSignInTime',
            },
        };

        const userData = await extractUserData(mockUser);

        expect(userData).toBeDefined();
        expect(userData).toEqual({
            uid: 'mock-uid',
            auth: {
                providerId: 'mock-provider',
                accessToken: 'mock-token',
            },
            displayName: 'mock-displayName',
            email: 'mock-email',
            emailVerified: true,
            phoneNumber: 'mock-phoneNumber',
            photoURL: 'mock-photoURL',
            isAnonymous: false,
            metadata: {
                creationTime: 'mock-creationTime',
                lastSignInTime: 'mock-lastSignInTime',
            },
        });
    });
});

describe('checkIfDocumentExists', () => {
    it('should return true if document exists', async () => {
        const collectionName = 'collectionName';
        const condition = { field: 'value' };
        const mockQuerySnapshot = {
            empty: false,
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

        const exists = await checkIfDocumentExists(collectionName, condition);

        expect(exists).toBe(true);
    });

    it('should return false if document does not exist', async () => {
        const collectionName = 'collectionName';
        const condition = { field: 'value' };
        const mockQuerySnapshot = {
            empty: true,
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

        const exists = await checkIfDocumentExists(collectionName, condition);

        expect(exists).toBe(false);
    });
});

describe('getDataWithInCondition', () => {
    it('should return data from Firestore with "in" condition', async () => {
        const collectionName = 'collectionName';
        const field = 'field';
        const values = ['value1', 'value2'];
        const mockQuerySnapshot = {
            forEach: jest.fn((callback) => {
                callback({ id: 'mock-id', data: jest.fn().mockReturnValue({ field: 'value' }) });
            }),
            empty: false,
        };

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockResolvedValue(mockQuerySnapshot);

        const data = await getDataWithInCondition(collectionName, field, values);

        expect(data).toBeDefined();
        expect(data).toEqual([{ id: 'mock-id', field: 'value' }]);
    });

    it('should return an empty array if values array is empty', async () => {
        const collectionName = 'collectionName';
        const field = 'field';
        const values: any[] = [];

        const data = await getDataWithInCondition(collectionName, field, values);

        expect(data).toBeDefined();
        expect(data).toEqual([]);
    });

    it('should log an error if getting documents fails', async () => {
        const collectionName = 'collectionName';
        const field = 'field';
        const values = ['value1', 'value2'];
        const error = new Error('Mock error');

        (collection as jest.Mock).mockReturnValue({});
        (query as jest.Mock).mockReturnValue({});
        (where as jest.Mock).mockReturnValue({});
        (getDocs as jest.Mock).mockRejectedValue(error);

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        const data = await getDataWithInCondition(collectionName, field, values);

        expect(data).toBeUndefined();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error getting documents: ', error);

        consoleErrorSpy.mockRestore();
    });
});