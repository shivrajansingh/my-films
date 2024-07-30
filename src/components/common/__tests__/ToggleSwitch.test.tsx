import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ToggleSwitch from '../ToggleSwitch';
import { getIDB, updateIDB } from 'idbkeyvalue'
import { saveOrUpdateDataToFireStore } from '../../../utils/helper/FireBaseHelper';

jest.mock('idbkeyvalue', () => ({
  getIDB: jest.fn(),
  updateIDB: jest.fn(),
}));

jest.mock('../../../utils/helper/FireBaseHelper', () => ({
  saveOrUpdateDataToFireStore: jest.fn(),
}));

describe('ToggleSwitch Component', () => {
  const mockName = 'testList';
  const mockUserData = { email: 'test@example.com' };

  beforeEach(() => {
    // jest.spyOn(global.localStorage, 'getItem').mockImplementation(() => JSON.stringify(mockUserData));
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(JSON.stringify(mockUserData)),
      },
      writable: true,
    });

  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the toggle switch component', () => {
    render(<ToggleSwitch name={mockName} />);

    const label = screen.getByText('Make this watchlist as Public');
    expect(label).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });



  it('toggles the checkbox state when clicked', async () => {
    const mockIDBData = { isPublic: false };
    (getIDB as jest.Mock).mockResolvedValue(mockIDBData);

    render(<ToggleSwitch name={mockName} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    // expect(setIsChecked).toHaveBeenCalledWith(true);
    expect(saveOrUpdateDataToFireStore).toHaveBeenCalledWith('wl_lists', { isPublic: true }, { email: 'test@example.com', name: 'testList' });
  });

  it('does not update data if user data is not available', async () => {
    // jest.spyOn(global.localStorage, 'getItem').mockImplementation(() => null);
    Object.defineProperty(global, 'localStorage', {
      value: {
        getItem: jest.fn().mockReturnValue(null),
      },
      writable: true,
    });

    render(<ToggleSwitch name={mockName} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(saveOrUpdateDataToFireStore).not.toHaveBeenCalled();
    expect(updateIDB).not.toHaveBeenCalled();
  });
});
