export const Get = async (url: string): Promise<any> => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network Response Was Not Ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return {
        status: 'error',
        error: (error as Error).message
      };
    }
};