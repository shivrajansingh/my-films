import { configureStore, compose, applyMiddleware  } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import UserReducer from './reducer/UserReducer';
import MovieDetailsReducer from './reducer/MovieDetailsReducer';
import WatchlistReducer from './reducer/WatchlistReducer';
const store = configureStore({
    reducer: { UserReducer, MovieDetailsReducer, WatchlistReducer} 
}, compose(applyMiddleware(thunk)));


export default store;
