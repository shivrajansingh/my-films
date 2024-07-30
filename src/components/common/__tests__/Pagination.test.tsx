import React from 'react';
import { render, screen } from '@testing-library/react';
import Pagination from '../Pagination';
import { BrowserRouter as Router } from 'react-router-dom';

describe('Pagination', () => {
  const mockProps = {
    totalResults: 50,
    searchText: 'test',
    type: 'search',
  };

  const renderComponent = (otherProps:Record<string, any> = {}) => {
    return render(
      <Router>
        <Pagination {...mockProps} />
      </Router>
    );
  };

  it('renders the pagination component', () => {
    renderComponent();

    expect(screen.getByLabelText('Page navigation')).toBeInTheDocument();
  });


});
