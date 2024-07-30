import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorFallback from '../ErrorFallback';

describe('ErrorFallback Component', () => {
  const mockError = new Error('Test error message');
  const mockResetErrorBoundary = jest.fn();

  it('renders the error message', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockResetErrorBoundary} />);

    const errorMessage = screen.getByText('Something went wrong:');
    expect(errorMessage).toBeInTheDocument();

    const errorDetails = screen.getByText(mockError.message);
    expect(errorDetails).toBeInTheDocument();
  });

  it('renders the try again button', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockResetErrorBoundary} />);

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    expect(tryAgainButton).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when the try again button is clicked', () => {
    render(<ErrorFallback error={mockError} resetErrorBoundary={mockResetErrorBoundary} />);

    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fireEvent.click(tryAgainButton);

    expect(mockResetErrorBoundary).toHaveBeenCalled();
  });
});
