import { fetchWatchlists, fetchWatchlistMovies, fetchWatchlistMoviesBySlug, fetchWatchlistMoviesByID, updateWatchlists, getPublicWatchlists } from '../WatchlistService';
import { getDataByIdFromFirestore, getDataFromFirestore, getDataWithInCondition, saveOrUpdateDataToFireStore } from "../../utils/helper/FireBaseHelper";
import { getAll, getBy, setIDB, updateIDB } from "idbkeyvalue";
import { watchlist_tables } from "../../utils/constants/tables";

const { wl_lists, wl_movies } = watchlist_tables;

jest.mock('../../utils/helper/FireBaseHelper', () => ({
  getDataByIdFromFirestore: jest.fn(),
  getDataFromFirestore: jest.fn(),
  getDataWithInCondition: jest.fn(),
  saveOrUpdateDataToFireStore: jest.fn(),
}));

jest.mock('idbkeyvalue', () => ({
  getAll: jest.fn(),
  getBy: jest.fn(),
  setIDB: jest.fn(),
  updateIDB: jest.fn(),
}));

describe('fetchWatchlists', () => {
  it('should return data from IndexedDB if available', async () => {
    const mockData = [{ name: 'testList', email: 'test@example.com' }];
    (getAll as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchWatchlists();

    expect(result).toEqual(mockData);
  });

  it('should fetch data from Firestore if not available in IndexedDB', async () => {
    const mockUserData = { email: 'test@example.com' };
    const mockWatchlists = [{ name: 'testList', email: 'test@example.com' }];

    (getAll as jest.Mock).mockResolvedValue([]);
    
    Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(JSON.stringify(mockUserData)),
        },
        writable: true,
      });
    

    (getDataFromFirestore as jest.Mock).mockResolvedValue(mockWatchlists);

    const result = await fetchWatchlists();

    expect(result).toEqual(mockWatchlists);
    expect(setIDB).toHaveBeenCalledWith('testList', mockWatchlists[0], wl_lists);
  });

  it('should return undefined if no user data is available', async () => {
    (getAll as jest.Mock).mockResolvedValue([]);
    Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(null),
        },
        writable: true,
      });

    const result = await fetchWatchlists();

    expect(result).toBeUndefined();
  });
});

describe('fetchWatchlistMovies', () => {
  it('should return data from IndexedDB if available', async () => {
    const mockData = [{ imdbID: 'tt1234567', watchlistName: 'testList' }];
    (getAll as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchWatchlistMovies();

    expect(result).toEqual(mockData);
  });

  it('should fetch data from Firestore if not available in IndexedDB', async () => {
    const mockUserData = { email: 'test@example.com' };
    const mockWatchlistMovies = [{ imdbID: 'tt1234567', watchlistName: 'testList' }];
    const mockMovies = [{ imdbID: 'tt1234567', Title: 'Test Movie' }];

    (getAll as jest.Mock).mockResolvedValue([]);
    Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(JSON.stringify(mockUserData)),
        },
        writable: true,
      });

    (getDataFromFirestore as jest.Mock).mockResolvedValue(mockWatchlistMovies);
    (getDataWithInCondition as jest.Mock).mockResolvedValue(mockMovies);

    await fetchWatchlistMovies();

    expect(setIDB).toHaveBeenCalledWith('testList_tt1234567', expect.objectContaining({ imdbID: 'tt1234567', Title: 'Test Movie', watchlistName: 'testList', email: 'test@example.com' }), wl_movies);
  });

  it('should return undefined if no user data is available', async () => {
    (getAll as jest.Mock).mockResolvedValue([]);
    Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(null),
        },
        writable: true,
      });

    const result = await fetchWatchlistMovies();

    expect(result).toBeUndefined();
  });
});

describe('fetchWatchlistMoviesBySlug', () => {
  it('should return data from IndexedDB if available', async () => {
    const slug = 'testList';
    const mockData = [{ imdbID: 'tt1234567', watchlistName: 'testList' }];
    (getBy as jest.Mock).mockResolvedValue(mockData);

    const result = await fetchWatchlistMoviesBySlug(slug);

    expect(result).toEqual(mockData);
  });

  it('should fetch data from Firestore if not available in IndexedDB', async () => {
    const slug = 'testList';
    const mockUserData = { email: 'test@example.com' };
    const mockWatchlistMovies = [{ imdbID: 'tt1234567', watchlistName: 'testList' }];
    const mockMovies = [{ imdbID: 'tt1234567', Title: 'Test Movie' }];

    (getBy as jest.Mock).mockResolvedValue([]);
    Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(JSON.stringify(mockUserData)),
        },
        writable: true,
      });
    (getDataFromFirestore as jest.Mock).mockResolvedValue(mockWatchlistMovies);
    (getDataWithInCondition as jest.Mock).mockResolvedValue(mockMovies);

    const result = await fetchWatchlistMoviesBySlug(slug);

    expect(result).toEqual(mockMovies);
    expect(setIDB).toHaveBeenCalledWith('testList_tt1234567', expect.objectContaining({ imdbID: 'tt1234567', Title: 'Test Movie', email: 'test@example.com', watchlistName: 'testList' }), wl_movies);
  });

  it('should return undefined if no user data is available', async () => {
    const slug = 'testList';
    (getBy as jest.Mock).mockResolvedValue([]);
    Object.defineProperty(global, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(null),
        },
        writable: true,
      });

    const result = await fetchWatchlistMoviesBySlug(slug);

    expect(result).toBeUndefined();
  });
});

describe('fetchWatchlistMoviesByID', () => {
  it('should return watchlist movies if the watchlist is public', async () => {
    const id = 'testID';
    const mockWatchlist = { name: 'testList', email: 'test@example.com', isPublic: true };
    const mockWatchlistMovies = [{ imdbID: 'tt1234567', watchlistName: 'testList' }];
    const mockMovies = [{ imdbID: 'tt1234567', Title: 'Test Movie' }];

    (getDataByIdFromFirestore as jest.Mock).mockResolvedValue(mockWatchlist);
    (getDataFromFirestore as jest.Mock).mockResolvedValue(mockWatchlistMovies);
    (getDataWithInCondition as jest.Mock).mockResolvedValue(mockMovies);

    const result = await fetchWatchlistMoviesByID(id);

    expect(result).toEqual({ title: 'testList', movies: mockMovies });
  });

  it('should return an error if the watchlist is not public', async () => {
    const id = 'testID';
    const mockWatchlist = { name: 'testList', email: 'test@example.com', isPublic: false };

    (getDataByIdFromFirestore as jest.Mock).mockResolvedValue(mockWatchlist);

    const result = await fetchWatchlistMoviesByID(id);

    expect(result).toEqual({ title: 'Error: Invalid Watchlist', movies: [] });
  });

  it('should return an error if fetching watchlist movies fails', async () => {
    const id = 'testID';

    (getDataByIdFromFirestore as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    // const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    Object.defineProperty(global, 'console', {
        value: {
          error: jest.fn().mockReturnValue({}),
        },
        writable: true,
      });

    const result = await fetchWatchlistMoviesByID(id);

    expect(result).toEqual({ title: 'Error: Invalid Watchlist', movies: [] });
  });
});

describe('updateWatchlists', () => {
  it('should update watchlists with meta data', async () => {
    const email = 'test@example.com';
    const mockLists = [{ name: 'testList', email: 'test@example.com' }];
    const mockMovies = [{ imdbID: 'tt1234567', Runtime: '90 min', Poster: 'poster.jpg' }];

    (getAll as jest.Mock).mockResolvedValue(mockLists);
    (getBy as jest.Mock).mockResolvedValue(mockMovies);

    const result = await updateWatchlists(email);

    expect(result).toEqual([
      {
        ...mockLists[0],
        image: '/assets/images/default.jpg',
        images: ['poster.jpg'],
        total_hours: '1 hrs 30 min',
        number_of_movies: 1,
      },
    ]);
    expect(updateIDB).toHaveBeenCalledWith('testList', expect.any(Object), wl_lists);
    expect(saveOrUpdateDataToFireStore).toHaveBeenCalledWith(wl_lists, expect.any(Object), { email: 'test@example.com', name: 'testList' });
  });

  it('should return an empty array if no lists are available', async () => {
    const email = 'test@example.com';

    (getAll as jest.Mock).mockResolvedValue([]);

    const result = await updateWatchlists(email);

    expect(result).toBeUndefined();
  });
});

describe('getPublicWatchlists', () => {
 
  it('should return an empty array if no public watchlists are available', async () => {
    (getDataFromFirestore as jest.Mock).mockResolvedValue([]);

    const result = await getPublicWatchlists();

    expect(result).toEqual([]);
  });
});
