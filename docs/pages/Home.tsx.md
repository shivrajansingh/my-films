**Code Documentation**

**Importing Components and Hooks**
```jsx
import Image from '../components/common/Image';
import CategoryView from '../components/categoryView/CategoryView';
import { useEffect, useState } from 'react';
import {  getDataFromFirestore } from '../utils/helper/FireBaseHelper';
import { useNavigate } from 'react-router-dom';
import { getAll, setIDB } from '../utils/helper/IndexDB';
import { connect } from 'react-redux';
import { fetchFavourites } from '../services/FavouriteService';
import { fetchWatchlists, getPublicWatchlists } from '../services/WatchlistService';
import WatchlistView from '../components/watchlist/WatchlistView';
```
This section imports necessary components and hooks for the application.

* `Image` component is imported from `../components/common/Image`.
* `CategoryView` component is imported from `../components/categoryView/CategoryView`.
* Hooks `useEffect` and `useState` are imported from the `react` library.
* Utility functions `getDataFromFirestore` and `getAll` are imported from `../utils/helper/FireBaseHelper` and `../utils/helper/IndexDB`, respectively.
* Navigation hook `useNavigate` is imported from `react-router-dom`.
* Functions `fetchFavourites` and `fetchWatchlists` are imported from `../services/FavouriteService` and `../services/WatchlistService`, respectively.

**Banner Component**
```jsx
const Banner = () => {
  const navigate = useNavigate(); 
  const [search, setSearch] = useState("");
  
  const handleSearch = (value:string) => {
    navigate("/search?s="+value);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      handleSearch(event.target.value);
    }
  };
```
This section defines the `Banner` component.

* The component uses the `useNavigate` hook to get a reference to the navigation function.
* A state variable `search` is initialized using `useState`.
* Two functions are defined: `handleSearch` and `handleKeyDown`. These functions handle search input changes and keyboard events, respectively.

**Home Component**
```jsx
interface HomeProps{
  isFavouriteUpdated : boolean;
  watchlists : Array<Record<string, any>>;
}
```
This section defines the `Home` component's props interface.

* The component has two props: `isFavouriteUpdated` of type `boolean` and `watchlists` of type `Array<Record<string, any>>`.

**Home Component (continued)**
```jsx
function mapStateToProps(state: Record<string, any>) {
  return {
    isFavouriteUpdated: state.MovieDetailsReducer.isFavouriteUpdated,
    watchlists : state.WatchlistReducer.watchlists
  };
}
```
This section defines the `mapStateToProps` function for connecting the component to the Redux store.

* The function maps the `isFavouriteUpdated` property from the `MovieDetailsReducer` and `watchlists` property from the `WatchlistReducer` to the component's props.

**Home Component (continued)**
```jsx
const Home = () => {
  return (
    <main>
      <Banner/>
      <div className="homepage-grids">
        <CategoryView title="My Favourite" data={favorite}  isCarousel={true} isLoading={isLoading}/>
        <WatchlistView title="Watchlists" data={watchlistsData} isLoading={isLoading} isCarousel={true}/>
        <WatchlistView title="Trending Watchlist" data={publicWatchlists} isLoading={isLoadingPublicWL} type="public" isCarousel={true}/>
        <CategoryView title="Recommended" data={recommended} isCarousel={true} isLoading={isLoading} type="recommended"/>
      </div>
    </main>
  )
};
```
This section defines the `Home` component.

* The component renders a `Banner` component.
* It contains four components: two instances of `WatchlistView` and two instances of `CategoryView`.
* Each component has different props, such as title, data, isCarousel, and isLoading.