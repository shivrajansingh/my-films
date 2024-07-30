import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WatchlistItem from '../WatchlistItem'; // Update the path as needed
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('../../../store/action/MoviesAction', () => ({
  setDeleteRequest: jest.fn(),
}));


interface WatchlistItemProps{
    details : Record<string, any>;
    type:string;
    deleteRequest : Record<string, any>;
    setDeleteRequest : (payload : Record<string, any>) => void; 
}

const initialState = {
    MovieDetailsReducer: {
      deleteRequest:{}
    },
  };


const mockStore = configureMockStore();
const store = mockStore(initialState);

const renderWithRedux = (component: React.ReactElement) => {
  return {
    ...render(
      <Provider store={store}>
        <Router>{component}</Router>
      </Provider>
    ),
  };
};

describe('WatchlistItem', () => {
  const baseProps: WatchlistItemProps = {
    details: {
      name: 'Sample Watchlist',
      image: '/sample-image.jpg',
      number_of_movies: 10,
      total_hours: '20h',
      user: {
        photoURL: '/user-photo.jpg',
        displayName: 'John Doe',
      },
      id: '123',
    },
    type: 'watchlist',
    setDeleteRequest: jest.fn(),
    deleteRequest : {}
  };

  it('renders watchlist item details correctly', () => {
    renderWithRedux(<WatchlistItem {...baseProps} />);

    expect(screen.getByText('Sample Watchlist')).toBeInTheDocument();
    expect(screen.getByText('10 Films ‧ 20h')).toBeInTheDocument();
  });

  it('renders user details if type is public', () => {
    renderWithRedux(<WatchlistItem {...baseProps} type="public" />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });
});
