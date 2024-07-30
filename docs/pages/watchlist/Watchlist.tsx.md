**React Component Documentation**

### Watchlist Component

The `Watchlist` component is a React functional component that displays a list of watchlists. It uses the `connect` function from `react-redux` to connect to the Redux store and fetch the watchlists data.

#### Code Block
```jsx
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Image from '../../components/common/Image';
import WatchlistItem from '../../components/watchlist/WatchlistItem';
import { chunkArray } from '../../utils/helper/helper';
import Loader from '../../components/common/Loader';
import Error from '../../components/common/Error';
import { watchlist_tables } from '../../utils/constants/tables';
import { fetchWatchlists } from '../../services/WatchlistService';

interface WatchlistProps {
  watchlists: Array<Record<string, any>>;
}

function Title() {
  return (
    <div className="col-md-6 col-6">
      <h1 className="category-title">Watchlists</h1>
    </div>
  );
}

function NewWatchListButton() {
  return (
    <div className="col-md-6 col-6">
      <div className="view-content new-watchlist-btn">
        <button
          type="button"
          data-bs-toggle="modal" data-bs-target="#new-watchlist" 
        >
          <Image src="/assets/images/MonitorPlay-f-2.svg" style={{ padding: '0 0 4px 0' }} /> Create New Watchlist
        </button>
      </div>
    </div>
  );
}

function Watchlist(props: WatchlistProps) {
  const { watchlists } = props; 
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { wl_lists } = watchlist_tables; 

  useEffect(() => {
    const fetchData = async() => {
      setIsLoading(true); 
      let watchlistData = await fetchWatchlists(); 
      watchlistData = watchlistData && chunkArray(watchlistData, 5); 
      watchlistData && watchlistData.length > 0 && setData(watchlistData); 
      setIsLoading(false);
    }
    fetchData(); 
  }, []);

  useEffect(() => {
    fetchWatchlists()
      .then((data) => {
        let watchlistData = data && chunkArray(data, 5); 
        watchlistData && watchlistData.length > 0 && setData(watchlistData); 
        setData(watchlistData);
      });
  }, [watchlists, wl_lists]);

  return (
    <main>
      <div className="container pb-5">
        <div className="row pt-5 mb-4">
          <Title />
          <NewWatchListButton />
          {
            isLoading ? <Loader/> :
            data.length === 0 ? <Error title='No Watchlist Found' description='No Watchlist found, Please create a new Watchlist' /> :
            data && data.length > 0 && data.map((value: any, key: any) =>
              <div className="row" key={key}>
                {
                  value && value.length > 0 && value.map((val: any, k: any) =>
                    <WatchlistItem details={val}  key={k} type="watchlist"/>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state: Record<string, any>) {
  return {
    watchlists: state.WatchlistReducer.watchlists,
  };
}

export default connect(mapStateToProps)(Watchlist);
```
#### Explanation

The `Watchlist` component is a React functional component that displays a list of watchlists. It uses the `connect` function from `react-redux` to connect to the Redux store and fetch the watchlists data.

The component has two main sections: the title section, which displays the text "Watchlists", and the content section, which displays a list of watchlists.

**Title Section**

The title section is a simple React component that renders a `<h1>` element with the text "Watchlists".

```jsx
function Title() {
  return (
    <div className="col-md-6 col-6">
      <h1 className="category-title">Watchlists</h1>
    </div>
  );
}
```

**Content Section**

The content section is a React component that displays a list of watchlists. It uses the `map` function to iterate over an array of watchlist items and render each item as a separate `<WatchlistItem>` component.

```jsx
function Watchlist() {
  const { watchlists } = props; 
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { wl_lists } = watchlist_tables; 

  useEffect(() => {
    // Fetch data from Redux store and update the component state
    const fetchData = async() => {
      setIsLoading(true); 
      let watchlistData = await fetchWatchlists(); 
      watchlistData = watchlistData && chunkArray(watchlistData, 5); 
      watchlistData && watchlistData.length > 0 && setData(watchlistData); 
      setIsLoading(false);
    }
    fetchData(); 
  }, []);

  useEffect(() => {
    fetchWatchlists()
      .then((data) => {
        let watchlistData = data && chunkArray(data, 5); 
        watchlistData && watchlistData.length > 0 && setData(watchlistData); 
        setData(watchlistData);
      });
  }, [watchlists, wl_lists]);

  return (
    <main>
      <div className="container pb-5">
        <div className="row pt-5 mb-4">
          <Title />
          // ...
        </div>
      </div>
    </main>
  );
}
```

The component also uses a hook called `useEffect` to fetch the watchlists data from the Redux store and update the component state.

**Error Handling**

If there is no watchlist data available, the component will render an error message instead of the list of watchlists. The error message can be customized by passing different values for the `title` and `description` props to the `<Error>` component.

```jsx
{
  isLoading ? <Loader/> :
  data.length === 0 ? <Error title='No Watchlist Found' description='No Watchlist found, Please create a new Watchlist' /> :
  // ...
}
```

**Watchlist Item Component**

The `WatchlistItem` component is a separate React component that renders a single watchlist item. It takes two props: `details` and `type`.

```jsx
function WatchlistItem({ details, type }) {
  return (
    <div className="row">
      // ...
    </div>
  );
}
```

The `WatchlistItem` component is used to render each individual watchlist item in the list of watchlists.

**Redux Store**

The Redux store is a separate entity that holds the application's state. In this case, it stores an array of watchlist items.

```jsx
const initialState = {
  watchlists: [],
};

const reducer = (state = initialState, action) => {
  // Handle different actions to update the application state
};
```

The Redux store is used to fetch the watchlists data and update the component state using the `useEffect` hook.

**Loading Indicator**

If there is a delay in fetching the watchlist data from the Redux store, the component will render a loading indicator instead of the list of watchlists. The loading indicator can be customized by passing different values for the `title` and `description` props to the `<Loader>` component.

```jsx
{
  isLoading ? <Loader/> :
  // ...
}
```

**Other Components**

The other components used in this example include:

*   `Title`: A simple React component that renders a `<h1>` element with the text "Watchlists".
*   `NewWatchListButton`: A React component that renders a button to create a new watchlist item.
*   `Error`: A React component that renders an error message instead of the list of watchlists if there is no data available.
*   `Loader`: A React component that renders a loading indicator while fetching data from the Redux store.

Overall, this example demonstrates how to use React and Redux together to build a simple application with a list of watchlist items.