import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Image from '../Image';
import { mergeImages } from '../../../utils/helper/MergeImages';


const mergeImagesMock = mergeImages as jest.Mock;

jest.mock('../../../utils/helper/MergeImages');

describe('Image Component', () => {
  it('renders the image with the correct src and alt', () => {
    render(<Image src="test-src" alt="test-alt" />);
    const imgElement = screen.getByAltText('test-alt');
    expect(imgElement).toHaveAttribute('src', 'test-src');
  });

  it('renders the default image if src is N/A', () => {
    render(<Image src="N/A" alt="test-alt" />);
    const imgElement = screen.getByAltText('test-alt');
    expect(imgElement).toHaveAttribute('src', '/assets/images/default.jpg');
  });

  it('renders the merged image if watchlist is provided', async () => {
    const mockWatchlist = ['image1.jpg', 'image2.jpg'];
    const mockMergedImage = 'merged-image-src';
    mergeImagesMock.mockResolvedValue(mockMergedImage);

    render(<Image src="test-src" alt="test-alt" watchlist={mockWatchlist} />);

    await waitFor(() => {
      const imgElement = screen.getByAltText('test-alt');
      expect(imgElement).toHaveAttribute('src', mockMergedImage);
    });
  });

  it('renders the original src if mergeImages fails', async () => {
    const mockWatchlist = ['image1.jpg', 'image2.jpg'];
    mergeImagesMock.mockRejectedValue(new Error('Merge failed'));

    render(<Image src="test-src" alt="test-alt" watchlist={mockWatchlist} />);

    await waitFor(() => {
      const imgElement = screen.getByAltText('test-alt');
      expect(imgElement).toHaveAttribute('src', 'test-src');
    });
  });

  it('renders the original src if watchlist is empty', async () => {
    const mockWatchlist:any = [];

    render(<Image src="test-src" alt="test-alt" watchlist={mockWatchlist} />);

    await waitFor(() => {
      const imgElement = screen.getByAltText('test-alt');
      expect(imgElement).toHaveAttribute('src', 'test-src');
    });
  });
});
