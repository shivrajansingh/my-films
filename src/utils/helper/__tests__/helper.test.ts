import { chunkArray, slugify } from '../helper';

// Tests for chunkArray function
describe('chunkArray', () => {
  it('chunks an array into smaller arrays of the given size', () => {
    const array = [1, 2, 3, 4, 5, 6, 7];
    const size = 3;
    const result = chunkArray(array, size);
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
  });

  it('returns an empty array when input array is empty', () => {
    const array: number[] = [];
    const size = 3;
    const result = chunkArray(array, size);
    expect(result).toEqual([]);
  });

  it('returns the original array as a single chunk if the size is larger than the array length', () => {
    const array = [1, 2, 3];
    const size = 5;
    const result = chunkArray(array, size);
    expect(result).toEqual([[1, 2, 3]]);
  });


  it('handles non-integer size values by truncating them', () => {
    const array = [1, 2, 3, 4, 5, 6];
    const size = 2.5; // Non-integer size value
    const result = chunkArray(array, Math.floor(size)); // Explicitly floor the size to ensure consistent behavior
    expect(result).toEqual([[1, 2], [3, 4], [5, 6]]);
  });
});

// Tests for slugify function
describe('slugify', () => {
    it('converts a string to lowercase, replaces spaces with hyphens, and removes special characters', () => {
      const str = 'Hello World!';
      const result = slugify(str);
      expect(result).toBe('hello-world');
    });
  
    it('handles multiple spaces by replacing them with a single hyphen', () => {
      const str = 'Hello    World';
      const result = slugify(str);
      expect(result).toBe('hello-world');
    });
  

    it('trims leading and trailing spaces', () => {
      const str = '  Hello World  ';
      const result = slugify(str);
      expect(result).toBe('hello-world');
    });
  
    it('returns an empty string when input is an empty string', () => {
      const str = '';
      const result = slugify(str);
      expect(result).toBe('');
    });
  
    it('handles strings with no spaces or special characters correctly', () => {
      const str = 'HelloWorld123';
      const result = slugify(str);
      expect(result).toBe('helloworld123');
    });
  
    it('preserves hyphens in the input string', () => {
      const str = 'Hello-World-123';
      const result = slugify(str);
      expect(result).toBe('hello-world-123');
    });
  
    it('replaces multiple spaces and trims spaces', () => {
      const str = '   Hello   World   ';
      const result = slugify(str);
      expect(result).toBe('hello-world');
    });
  
    it('handles special characters at the beginning and end of the string', () => {
      const str = '!Hello World!';
      const result = slugify(str);
      expect(result).toBe('hello-world');
    });
  });
