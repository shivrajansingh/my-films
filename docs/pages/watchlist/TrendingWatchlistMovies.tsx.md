**Detailed Documentation**
==========================

### Overview
------------

This is a React functional component named `WatchlistPublic`. It displays a watchlist of movies and allows users to navigate through the list using pagination.

### Import Statements
----------------------

The component imports necessary modules from React, React Router DOM, and Redux.
```jsx
import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import CategoryView from '../../components/categoryView/CategoryView';
import { fetchWatchlistMoviesByID } from '../../services/WatchlistService';
import { connect } from 'react-redux'; 
```
### Interfaces
-------------

The component uses a single interface `WatchlistPublicProps` to define the props that this component expects. However, in this case, it's an empty interface.
```jsx
interface WatchlistPublicProps{
}
```
### Component Definition
------------------------

The `WatchlistPublic` function is defined as a React functional component.
```jsx
function WatchlistPublic(props:WatchlistPublicProps) {
    ...
}
```
### State Variables
------------------

The component uses four state variables:

*   `isLoading`: A boolean indicating whether the data is being fetched or not.
*   `data`: An array of movie objects to be displayed in the watchlist.
*   `title`: The title of the watchlist (e.g., "Watchlist 1").
*   `totalResults`: The total number of movies in the watchlist.

```jsx
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState<Array<Record<string, any>>>([]);
const [title, setTitle] = useState(""); 
const [totalResults, setTotalResults] = useState(1); 
```
### Hooks and Parameters
-------------------------

The component uses the following hooks:

*   `useLocation()`: Returns an object with information about the current URL.
*   `useParams()`: Returns an object containing URL parameters.

It also expects two parameters: `id` (a watchlist ID) and `page` (the current page number).

```jsx
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const page = queryParams.get('page') ?? '1';
const { id } = useParams();

useEffect(()=>{
    ...
}, [id, page])
```
### Effect Hook
----------------

The component uses an effect hook to fetch the watchlist data when the `id` or `page` parameters change.

```jsx
useEffect(()=>{
    const fetchData = async()=>{
        setIsLoading(true); 
        if(id){
            let { title, movies } = await fetchWatchlistMoviesByID(id); 
            setTitle(title);
            if(movies && movies.length> 0){
                setTotalResults(movies.length);
                const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
                const end = start + RESULTS_PER_PAGE;
                let paginationData = movies.slice(start,end); 
                setData(paginationData);
            }
        }else{
            setTitle("Error : Invalid Watchlist"); 
        }
        setIsLoading(false)
    }
    fetchData(); 
}, [id, page])
```
### Render Method
----------------

The component renders a `CategoryView` component with the fetched data and pagination information.
```jsx
return (
    <main>
    <CategoryView 
    title={title} 
    data={data} 
    isViewType={true} 
    isBackButton={true} 
    isLoading={isLoading}
    type="publicWatchlist"
    isPagination={true}
    totalResults={totalResults}
    />
    </main>
)
```
### Redux Connection
---------------------

The component connects to the Redux store using the `connect` function from `react-redux`. However, it doesn't use any state or dispatch functions in this case.
```jsx
export default connect(mapStateToProps, {})(WatchlistPublic);
```
This concludes the documentation for the `WatchlistPublic` React functional component.