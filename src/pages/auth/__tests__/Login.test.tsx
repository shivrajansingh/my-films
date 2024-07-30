// Login.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../Login';
const mockStore = configureStore([]);

jest.mock('../../../firebase', () => ({
  auth: { currentUser: { email: 'test@example.com' } },
  provider: 'googleProvider',
}));

jest.mock('../../../utils/helper/FireBaseHelper', () => ({
  saveOrUpdateDataToFireStore: jest.fn(),
  extractUserData: jest.fn().mockResolvedValue({ displayName: 'Test User', email: 'test@example.com' }),
}));

jest.mock('firebase/auth', () => ({
  signInWithPopup: jest.fn().mockResolvedValue({ user: { email: 'test@example.com' } }),
  signInWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { email: 'test@example.com' } }),
  sendEmailVerification: jest.fn(),
}));

describe('<Login />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router>
          <Login/>
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText('Email ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });

  it('displays an error message for invalid email and password', async () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText('Email ID'), { target: { value: 'invalid@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });

    fireEvent.click(screen.getByText('Sign in'));

    await waitFor(async() => expect(await screen.findByText('Try Again')).toBeInTheDocument());
  });

  it('displays the "Forgot Password?" modal on clicking the link', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Forgot Password?'));

    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
  });

  it('displays the "Sign Up" modal on clicking the link', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByTestId('register-button'))
  });
});


