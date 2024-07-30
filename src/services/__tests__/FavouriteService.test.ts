import { AddToFavourite, RemoveFromFavourite, toggleFavourite, fetchFavourites } from '../FavouriteService';
import { insertIfNotExists, deleteDataFromFireStore, checkIfDocumentExists, getDataFromFirestore, getDataWithInCondition } from "../../utils/helper/FireBaseHelper";
import { insertIDB, getAll } from "idbkeyvalue";



jest.mock('../../utils/helper/FireBaseHelper', () => ({
    insertIfNotExists: jest.fn(),
    deleteDataFromFireStore: jest.fn(),
    checkIfDocumentExists: jest.fn(),
    getDataFromFirestore: jest.fn(),
    getDataWithInCondition: jest.fn(),
  }));
  
  jest.mock('idbkeyvalue', () => ({
    insertIDB: jest.fn(),
    getAll: jest.fn(),
  }));
  
  describe('AddToFavourite', () => {
    it('should call insertIfNotExists with the correct parameters', () => {
      const params = { email: 'test@example.com', imdbID: 'tt1234567', Title: 'Test Movie' };
  
      AddToFavourite(params);
  
      expect(insertIfNotExists).toHaveBeenCalledWith('favourites', params, params);
    });
  });
  
  describe('RemoveFromFavourite', () => {
    it('should call deleteDataFromFireStore with the correct parameters', () => {
      const params = { email: 'test@example.com', imdbID: 'tt1234567', Title: 'Test Movie' };
  
      RemoveFromFavourite(params);
  
      expect(deleteDataFromFireStore).toHaveBeenCalledWith('favourites', params);
    });
  });
  
  describe('toggleFavourite', () => {
    it('should remove from favourites if the document exists', async () => {
      const condition = { email: 'test@example.com', imdbID: 'tt1234567', Title: 'Test Movie' };
      const details = { imdbID: 'tt1234567', Title: 'Test Movie' };
  
      (checkIfDocumentExists as jest.Mock).mockResolvedValue(true);
  
      const result = await toggleFavourite(condition, details);
  
      expect(deleteDataFromFireStore).toHaveBeenCalledWith('favourites', condition);
      expect(result).toEqual({ img: '/assets/images/heart.svg', action: 'removed' });
    });
  
    it('should add to favourites if the document does not exist', async () => {
      const condition = { email: 'test@example.com', imdbID: 'tt1234567', Title: 'Test Movie' };
      const details = { imdbID: 'tt1234567', Title: 'Test Movie' };
  
      (checkIfDocumentExists as jest.Mock).mockResolvedValue(false);
  
      const result = await toggleFavourite(condition, details);
  
      expect(insertIfNotExists).toHaveBeenCalledWith('favourites', condition, condition);
      expect(insertIfNotExists).toHaveBeenCalledWith('movies', details, { imdbID: condition.imdbID });
      expect(result).toEqual({ img: '/assets/images/heartstraightf-1.svg', action: 'added' });
    });
  });
  
  describe('fetchFavourites', () => {
    it('should return data from IndexedDB if available', async () => {
      const mockData = [{ imdbID: 'tt1234567', Title: 'Test Movie' }];
      (getAll as jest.Mock).mockResolvedValue(mockData);
  
      const result = await fetchFavourites();
  
      expect(result).toEqual(mockData);
    });
  
    it('should fetch data from Firestore if not available in IndexedDB', async () => {
      const mockUserData = { email: 'test@example.com' };
      const mockFavouriteMovies = [{ imdbID: 'tt1234567', Title: 'Test Movie' }];
      const mockMovies = [{ imdbID: 'tt1234567', Title: 'Test Movie' }];
  
      (getAll as jest.Mock).mockResolvedValue([]);
      Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(JSON.stringify(mockUserData)),
        },
        writable: true,
      });

      (getDataFromFirestore as jest.Mock).mockResolvedValue(mockFavouriteMovies);
      (getDataWithInCondition as jest.Mock).mockResolvedValue(mockMovies);
  
      const result = await fetchFavourites();
  
      expect(result).toEqual(mockMovies);
      expect(insertIDB).toHaveBeenCalledWith('tt1234567', mockMovies[0], 'favourites');
    });
  
    it('should return undefined if no user data is available', async () => {
        (getAll as jest.Mock).mockResolvedValue([]);
        Object.defineProperty(global, 'localStorage', {
          value: {
            getItem: jest.fn().mockReturnValue(null),
          },
          writable: true,
        });
      
        const result = await fetchFavourites();
      
        expect(result).toBeUndefined();
      });
      
  });