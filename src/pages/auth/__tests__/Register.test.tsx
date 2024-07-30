import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Register from '../Register';
import { auth, provider } from '../../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, updateProfile } from 'firebase/auth';
import { insertIfNotExists, extractUserData } from '../../../utils/helper/FireBaseHelper';

jest.mock('../../../firebase', () => ({
  auth: { currentUser: { email: 'test@example.com' } },
  provider: 'googleProvider',
}));

jest.mock('../../../utils/helper/FireBaseHelper', () => ({
  insertIfNotExists: jest.fn(),
  extractUserData: jest.fn().mockResolvedValue({ displayName: 'Test User', email: 'test@example.com' }),
}));

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn().mockResolvedValue({ user: { email: 'test@example.com' } }),
  sendEmailVerification: jest.fn(),
  signInWithPopup: jest.fn().mockResolvedValue({ user: { email: 'test@example.com' } }),
  updateProfile: jest.fn(),
}));

const mockStore = configureStore([]);

describe('<Register />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (ui:any) => {
    const store = mockStore({});
    return render(
      <Provider store={store}>
        <Router>
          {ui}
        </Router>
      </Provider>
    );
  };

  it('renders the registration form', () => {
    renderWithProviders(<Register />);

    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByText('Sign in With Google')).toBeInTheDocument();
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  it('displays error messages for invalid form data', () => {
    renderWithProviders(<Register />);

    userEvent.type(screen.getByLabelText('Full Name'), 'a'.repeat(51));
    userEvent.type(screen.getByLabelText('Email'), 'invalid_email');
    userEvent.type(screen.getByLabelText('Password'), 'weak_password');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'different_password');

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    expect(screen.getByText('Full Name is required and should not exceed 50 characters.')).toBeInTheDocument();
    expect(screen.getByText('A valid Email is required.')).toBeInTheDocument();
    expect(screen.getByText('Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.')).toBeInTheDocument();
    expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
  });

  it('calls createUserWithEmailAndPassword on submitting the form with valid data', async () => {
    renderWithProviders(<Register />);

    userEvent.type(screen.getByLabelText('Full Name'), 'Test User');
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'StrongPassword123');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'StrongPassword123');

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, 'test@example.com', 'StrongPassword123'));
    await waitFor(() => expect(updateProfile).toHaveBeenCalledWith(expect.anything(), { displayName: 'Test User', photoURL: '/assets/images/avatar.jpg' }));
    await waitFor(() => expect(sendEmailVerification).toHaveBeenCalled());
    //await waitFor(async() => expect(await screen.findByText('Registration successful! Please check your email to verify your account.')).toBeInTheDocument());
  });

  it('calls insertIfNotExists on successful registration', async () => {
    renderWithProviders(<Register />);

    userEvent.type(screen.getByLabelText('Full Name'), 'Test User');
    userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    userEvent.type(screen.getByLabelText('Password'), 'StrongPassword123');
    userEvent.type(screen.getByLabelText('Confirm Password'), 'StrongPassword123');

    userEvent.click(screen.getByRole('button', { name: /sign up/i }));

    await waitFor(() => expect(insertIfNotExists).toHaveBeenCalledWith('users', expect.anything(), { email: 'test@example.com' }));
  });
});
