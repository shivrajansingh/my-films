**Favourites Component Documentation**
=====================================

### Overview

The `Favourites` component is a React functional component that displays the user's favourite movies or TV shows. It utilizes the `fetchFavourites` function from the `FavouriteService` to retrieve the data and updates the state accordingly.

### Dependencies

* `React`: The core library for building user interfaces.
* `useState`: A hook provided by React to manage state in functional components.
* `useEffect`: A hook that allows you to perform side-effects, such as API calls or DOM mutations, after rendering a component.
* `connect`: A higher-order function from `react-redux` that connects the component to the Redux store.
* `IndexDB`: A library for interacting with the IndexedDB storage.

### Properties

The `Favourites` component expects an object with the following properties:

* `isFavouriteUpdated`: A boolean indicating whether the favourite list has been updated since the last fetch.

```
interface FavouriteProps {
  isFavouriteUpdated: boolean;
}
```

### State Management

The component uses the `useState` hook to manage three state variables:

* `data`: An array containing the favourite movies or TV shows.
* `isLoading`: A boolean indicating whether data is being fetched or not.
* `totalResults`: The total number of results in the favourite list.

```
const [data, setData] = useState<any[]>([]);
const [isLoading, setIsLoading] = useState(false);
const [totalResults, setTotalResults] = useState(1);
```

### Effects

The component uses two `useEffect` hooks to handle side-effects:

* The first hook fetches the favourite list using the `fetchFavourites` function and updates the state with the received data.
* The second hook updates the state when the `isFavouriteUpdated` property changes or when the page number is changed.

```
useEffect(() => {
  setIsLoading(true);
  fetchFavourites()
    .then((data) => {
      if (data) {
        setTotalResults(data.length);
        const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
        const end = start + RESULTS_PER_PAGE;
        let paginationData = data.slice(start, end);
        setData(paginationData);
        setIsLoading(false);
      }
    });
}, [page]);

useEffect(() => {
  getAll("favourites")
    .then((data) => {
      const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
      const end = start + RESULTS_PER_PAGE;
      let paginationData = data.slice(start, end);
      setData(paginationData);
    });
}, [isFavouriteUpdated, page]);
```

### Rendering

The component renders a `CategoryView` component with the favourite list data, loading state, and pagination information.

```
return (
  <main>
    <div className="container">
      <CategoryView
        title="Favourite"
        data={data}
        isViewType={true}
        isLoading={isLoading}
        isPagination={true}
        totalResults={totalResults}
      />
    </div>
  </main>
);
```

### Redux Connection

The component is connected to the Redux store using the `connect` function from `react-redux`. The `mapStateToProps` function maps the `isFavouriteUpdated` property from the Redux state to the component's props.

```
function mapStateToProps(state: Record<string, any>) {
  return {
    isFavouriteUpdated: state.MovieDetailsReducer.isFavouriteUpdated,
  };
}

export default connect(mapStateToProps, {})(Favourites);
```

### Conclusion

The `Favourites` component fetches and displays the user's favourite movies or TV shows using the `fetchFavourites` function and updates the state accordingly. It also handles pagination and loading states. The component is connected to the Redux store using the `connect` function from `react-redux`.