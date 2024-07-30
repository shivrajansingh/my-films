**Redux Configuration Documentation**
=====================================

### Table of Contents

1. [Introduction](#introduction)
2. [Importing Dependencies](#importing-dependencies)
3. [Configuring the Redux Store](#configuring-the-redux-store)
4. [Using Middleware (Redux Thunk)](#using-middleware-redux-thunk)
5. [Defining Reducers](#defining-reducers)
6. [Exporting the Store](#exporting-the-store)

### Introduction
----------------

This code snippet is responsible for setting up a Redux store using the `@reduxjs/toolkit` library. The primary goal of this configuration is to create a centralized state management system for the application.

### Importing Dependencies
-------------------------

```
import { configureStore, compose, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import UserReducer from './reducer/UserReducer';
import MovieDetailsReducer from './reducer/MovieDetailsReducer';
import WatchlistReducer from './reducer/WatchlistReducer';
```

In this section, we are importing the necessary dependencies:

* `configureStore` and `compose` from `@reduxjs/toolkit`, which is used to configure the Redux store.
* `applyMiddleware` from `@reduxjs/toolkit`, which allows us to apply middleware to our store.
* The `thunk` function from the `redux-thunk` library, which enables asynchronous action creators.
* Three reducers: `UserReducer`, `MovieDetailsReducer`, and `WatchlistReducer`.

### Configuring the Redux Store
------------------------------

```
const store = configureStore({
    reducer: { UserReducer, MovieDetailsReducer, WatchlistReducer} 
}, compose(applyMiddleware(thunk)));
```

Here, we are using the `configureStore` function to create a new Redux store. We pass two arguments:

* An object with the reducers as properties (`reducer`).
* The result of calling `compose` and passing `applyMiddleware` with the `thunk` middleware.

The `configureStore` function takes these arguments and returns our configured Redux store, which we assign to the `store` variable.

### Using Middleware (Redux Thunk)
-----------------------------------

In this configuration, we are using the `redux-thunk` middleware to enable asynchronous action creators. By calling `applyMiddleware` with the `thunk` function, we are allowing our reducers to return functions instead of plain values, which can be used to create asynchronous actions.

### Defining Reducers
-------------------

```
import UserReducer from './reducer/UserReducer';
import MovieDetailsReducer from './reducer/MovieDetailsReducer';
import WatchlistReducer from './reducer/WatchlistReducer';
```

In this code snippet, we are importing three reducers:

* `UserReducer`
* `MovieDetailsReducer`
* `WatchlistReducer`

These reducers are responsible for managing specific parts of the application's state.

### Exporting the Store
----------------------

```
export default store;
```

Finally, we export our configured Redux store as a default export. This allows us to use this store in other parts of our application.

By following this documentation, you should now have a solid understanding of how this code snippet sets up a Redux store with reducers and middleware using the `@reduxjs/toolkit` library.