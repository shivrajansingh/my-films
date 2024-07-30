**Chunk Array Function Documentation**
=====================================

### Overview

The `chunkArray` function is a utility function that takes an array of elements and a chunk size as input, and returns an array of sub-arrays (or "chunks") where each chunk has the specified size.

### Code
```
export const chunkArray = <T,>(array: T[], size: number): T[][] => {
  const chunkedArray: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunkedArray.push(array.slice(i, i + size));
  }
  return chunkedArray;
};
```
### Parameters

* `array`: The input array to be chunked. This can be an array of any type (`T`).
* `size`: The desired size of each chunk.

### Return Value

The function returns an array of sub-arrays (chunks), where each chunk has a length of `size`. If the input array's length is not a multiple of the chunk size, the last chunk may be shorter than the specified size.

### Example Use Cases

* Chunking an array of integers into groups of 3:
```
const numbers = [1, 2, 3, 4, 5, 6];
const chunkedNumbers = chunkArray(numbers, 3);
// Output: [[1, 2, 3], [4, 5, 6]]
```
* Chunking an array of strings into groups of 2:
```
const words = ['hello', 'world', 'foo', 'bar'];
const chunkedWords = chunkArray(words, 2);
// Output: [['hello', 'world'], ['foo', 'bar']]
```
### Slugify Function Documentation**
==============================

### Overview

The `slugify` function is a utility function that takes a string as input and returns a slugified version of the string.

### Code
```
export function slugify(str:string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
```
### Parameters

* `str`: The input string to be slugified.

### Return Value

The function returns a slugified version of the input string. This is achieved by:

1. Converting the string to lowercase using the `toLowerCase()` method.
2. Replacing all spaces with hyphens using the `replace()` method.
3. Removing any non-word characters (except for hyphens) using the `replace()` method.

### Example Use Cases

* Slugifying a string:
```
const originalString = 'Hello World';
const slugifiedString = slugify(originalString);
// Output: hello-world
```
Note that this function does not remove any trailing or leading hyphens, so the output may include them.