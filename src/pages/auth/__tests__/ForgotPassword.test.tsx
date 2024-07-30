import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ForgotPassword from '../ForgotPassword';
import { auth } from '../../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

jest.mock('../../../firebase', () => ({
  auth: { currentUser: { email: 'test@example.com' } },
}));

jest.mock('firebase/auth', () => ({
  sendPasswordResetEmail: jest.fn(),
}));

const mockStore = configureStore([]);

describe('<ForgotPassword />', () => {
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

  it('renders the forgot password form', () => {
    renderWithProviders(<ForgotPassword />);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Reset Password')).toBeInTheDocument();
  });

  it('displays an error message for invalid email', async () => {
    renderWithProviders(<ForgotPassword />);

    userEvent.type(screen.getByLabelText('Email address'), 'invalid_email');
    userEvent.click(screen.getByText('Reset Password'));
  });

  it('calls sendPasswordResetEmail on submitting the form with a valid email', async () => {
    renderWithProviders(<ForgotPassword />);

    userEvent.type(screen.getByLabelText('Email address'), 'test@example.com');
    userEvent.click(screen.getByText('Reset Password'));

    await waitFor(() => expect(sendPasswordResetEmail).toHaveBeenCalledWith(auth, 'test@example.com'));
    await waitFor(async() => expect(await screen.findByText('Password reset email sent to test@example.com. Check your inbox and follow the instructions.')).toBeInTheDocument());
  });


  it('closes the modal on clicking the close button', () => {
    renderWithProviders(<ForgotPassword />);

    userEvent.click(screen.getByTestId('close'));

  });
});
