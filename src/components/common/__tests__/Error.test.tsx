import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '../Error';

describe('Error Component', () => {
  it('renders the title if provided', () => {
    const title = 'Error Title';
    render(<Error title={title} />);

    const heading = screen.getByText(title);
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('alert-heading');
  });

  it('does not render the title if not provided', () => {
    render(<Error />);

    const heading = screen.queryByRole('heading', { level: 4 });
    expect(heading).not.toBeInTheDocument();
  });

  it('renders the description if provided', () => {
    const description = 'Error Description';
    render(<Error description={description} />);

    const paragraph = screen.getByText(description);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveClass('mb-0');
  });

  it('does not render the description if not provided', () => {
    render(<Error />);

    const paragraph = screen.queryByText(/Error Description/i);
    expect(paragraph).not.toBeInTheDocument();
  });
});
