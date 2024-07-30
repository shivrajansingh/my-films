import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '../Home';
import * as FireBaseHelper from '../../utils/helper/FireBaseHelper';
import * as FavouriteService from '../../services/FavouriteService';
import * as WatchlistService from '../../services/WatchlistService';

jest.mock('../../utils/helper/FireBaseHelper', () => ({
  getDataFromFirestore: jest.fn(),
  getAll: jest.fn(() => Promise.resolve([])),
  setIDB: jest.fn(() => Promise.resolve([])),
}));

jest.mock('../../services/FavouriteService', () => ({
  fetchFavourites: jest.fn(() => Promise.resolve([])),
  fetchWatchlists: jest.fn(() => Promise.resolve([]))
}));

jest.mock('../../services/WatchlistService', () => ({
  fetchWatchlists: jest.fn(),
  getPublicWatchlists : jest.fn()
}));

const mockStore = configureStore([]);

describe('<Home />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (ui:any, options:any={}) => {
    const store = mockStore({
      MovieDetailsReducer: { isFavouriteUpdated: false },
      WatchlistReducer: { watchlists: [] },
    });
    return render(
      <Provider store={store}>
        <Router>
          {ui}
        </Router>
      </Provider>, 
      options
    );
  };

  it('renders the home page with required indicators', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText('My Favourite')).toBeInTheDocument();
    expect(screen.getByText('Watchlists')).toBeInTheDocument();
    expect(screen.getByText('Trending Watchlist')).toBeInTheDocument();
  });
});
