**API Client Functions**
=======================

### Overview

This section provides a detailed documentation of the `Get` and `Post` API client functions.

### `Get` Function
-----------------

### **Signature**

```
export const Get = async (url: string): Promise<any> => { ... }
```

### **Description**

The `Get` function is an asynchronous function that sends a GET request to the specified URL and returns the response data. It handles errors and provides a structured error response.

### **Parameters**

*   `url`: The URL of the API endpoint to which the GET request will be sent.

### **Return Value**

A Promise that resolves with the response data if the request is successful, or an error object containing the error message if the request fails.

### **Implementation Details**

1.  The function uses the `fetch` API to send a GET request to the specified URL.
2.  If the response is not OK (200-299), it throws an Error with the message "Network Response Was Not Ok".
3.  It then parses the response data as JSON and returns it.
4.  If any errors occur during this process, it logs the error using `console.error` and returns a structured error object.

### **Example Usage**

```
const response = await Get('https://example.com/api/data');
// or
const response = await Get('https://example.com/api/data')
    .catch((error) => {
        console.error(error);
        return { status: 'error', error: (error as Error).message };
    });
```

### `Post` Function
-----------------

### **Signature**

```
export const Post = (url:string, payload:object):Promise<any> => { ... }
```

### **Description**

The `Post` function is an API client function that sends a POST request to the specified URL with the provided payload. It returns a Promise that resolves with the response data if the request is successful.

### **Parameters**

*   `url`: The URL of the API endpoint to which the POST request will be sent.
*   `payload`: The JSON payload to be sent in the request body.

### **Return Value**

A Promise that resolves with the response data if the request is successful, or undefined if an error occurs.

### **Implementation Details**

1.  The function uses the `fetch` API to send a POST request to the specified URL.
2.  It sets the request headers with 'Authentication': 'Bearer API'.
3.  It stringifies the payload as JSON and sends it in the request body.
4.  If any errors occur during this process, it logs the error using `console.error`.

### **Example Usage**

```
const response = await Post('https://example.com/api/data', {
    name: 'John Doe',
    age: 30,
});
// or
Post('https://example.com/api/data', {
    name: 'Jane Doe',
    age: 25,
})
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
```

This documentation provides a detailed explanation of the `Get` and `Post` API client functions, including their signatures, parameters, return values, and implementation details.