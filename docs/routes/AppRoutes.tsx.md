**React Router Configuration Documentation**
==============================================

**Overview**
------------

This section of the documentation explains the React Router configuration used in the provided code snippet. The configuration defines the routing structure for a web application, mapping URLs to specific components and pages.

**Importing Dependencies**
-------------------------

The following lines import necessary dependencies from `react-router-dom`:
```
import { Route, Routes } from 'react-router-dom';
```
Here:

*   `Route`: A component that represents a single route in the application.
*   `Routes`: A component that contains multiple `Route` components and serves as the root of the routing configuration.

**Importing Custom Components**
------------------------------

The following lines import custom components used throughout the application:
```
import AppLayout from '../components/layout/AppLayout';
import Home from '../pages/Home';
import Genre from '../pages/watchlist/Genre';
import Search from '../pages/Search';
import History from '../pages/History';
import Favourites from '../pages/Favourites';
import Watchlist from '../pages/watchlist/Watchlist';
import MyAccount from '../pages/MyAccount';
import TrendingWatchlistMovies from '../pages/watchlist/TrendingWatchlistMovies';
import TrendingWatchlist from '../pages/watchlist/TrendingWatchlist';
```
Here:

*   `AppLayout`: A custom layout component used as the base for all pages.
*   Custom page components (e.g., `Home`, `Genre`, etc.) represent specific pages within the application.

**Defining Routes**
-----------------

The following block defines the routing configuration using the `Routes` and `Route` components:
```
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        {/* Route definitions go here */}
      </Route>
    </Routes>
  );
}
```
Here:

*   The outermost `<Routes>` component serves as the root of the routing configuration.
*   The inner `<Route>` component with a path of `"/"` represents the base route, which maps to the `AppLayout` component.
*   Sub-routes are defined within the `AppLayout` component using nested `<Route>` components.

**Sub-Route Definitions**
------------------------

The following block defines sub-routes for specific pages:
```
<Route index element={<Home />} />
<Route path="/search" element={<Search />} />
<Route path="/history" element={<History />} />
<Route path="/favourite" element={<Favourites />} />
<Route path="/watchlist" element={<Watchlist />} />
```
Here:

*   Each sub-route is defined with a specific `path` property, which maps to the corresponding page component.
*   The `index` prop on the first sub-route (`<Home />`) indicates that it should be rendered as the default route.

**Trending Watchlist Routes**
---------------------------

The following block defines routes for trending watchlists:
```
<Route path="/watchlist/trending-watchlist" element={<TrendingWatchlist />} />
<Route path="/watchlist/trending-watchlist/:id" element={<TrendingWatchlistMovies />} />
```
Here:

*   The first route (`<TrendingWatchlist />`) maps to the `TrendingWatchlist` page component.
*   The second route (`<TrendingWatchlistMovies />`) maps to the `TrendingWatchlistMovies` page component, which expects an `id` parameter.

**Genre Route**
-------------

The following block defines a route for the genre page:
```
<Route path="/watchlist/:slug" element={<Genre />} />
```
Here:

*   The `path` property includes a parameter (`:slug`) that will be passed to the `Genre` page component.

**My Account Route**
------------------

The following block defines a route for the my account page:
```
<Route path="/my-account" element={<MyAccount />} />
```
Here:

*   This route maps to the `MyAccount` page component.