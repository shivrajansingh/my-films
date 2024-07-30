import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { setMovieDetails, setDeleteRequest } from '../../../store/action/MoviesAction';
import { setAddToWatchlistDetails } from '../../../store/action/WatchlistAction';
import { getIDB } from 'idbkeyvalue'
import { fetchWatchlists } from '../../../services/WatchlistService';
import ColListItems from '../ColListItems';
import * as IndexDBHelper from 'idbkeyvalue'
import * as WatchlistService from '../../../services/WatchlistService';

// Mock services and helpers
jest.mock('idbkeyvalue', () => ({
  getIDB: jest.fn(),
}));

jest.mock('../../../services/WatchlistService', () => ({
  fetchWatchlists: jest.fn(),
}));

const mockStore = configureStore([]);

describe('<ColListItems />', () => {
  let store:any;

  beforeEach(() => {
    jest.clearAllMocks();

    store = mockStore({
      MovieDetailsReducer: { deleteRequest: {} },
    });
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <Provider store={store}>
        {ui}
      </Provider>
    );
  };

  it('renders ColListItems with given props', () => {
    renderWithProviders(
      <ColListItems
        posterSrc="poster.jpg"
        title="Test Movie"
        year="2024"
        duration="120 min"
        imdbRating="8.5"
        details={{ imdbID: 'tt1234567', Title: 'Test Movie' }}
        type="watchlist"
      />
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('IMDb : 8.5')).toBeInTheDocument();
  });
});
