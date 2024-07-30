import { Get } from "../Service";
import fetchMock from 'fetch-mock';

describe('Get function', () => {

    afterEach(() => {
        fetchMock.restore();
      });

    it('should fetch data from a valid URL', async () => {
      const url = 'https://www.omdbapi.com/?apikey=53793b8a&s=john&page=1';
      const mockData = {};
      fetchMock.get(url, {
        status: 200,
        body: mockData,
      });
      const data = await Get(url);
      expect(data).toBeDefined();
    });

    it('should handle network errors', async () => {
      const invalidUrl = 'https://invalid-url.example.com';
      const mockData = {};
      fetchMock.get(invalidUrl, {
        status: 200,
        body: mockData,
      });
      const result = await Get(invalidUrl);
      expect(result.status).toBe('error');
    });
  });