interface WatchlistState {
    watchlists: Array<Record<string, any>>;
    addToWatchlistDetails : Record<string, any>;
  }
  
  interface WatchlistAction {
    type: string;
    payload: Array<Record<string, any>>;
  }
  
  const initState: WatchlistState = {
    watchlists: [],
    addToWatchlistDetails : {}
  };
  
  const WatchlistReducer = (state: WatchlistState = initState, action: WatchlistAction): WatchlistState => {
    const { type, payload } = action;
    if (type === 'ADD_DATA') {
      return {
        ...state,
        watchlists: payload,
      };
    }else if(type === 'ADD_TO_WATCHLIST'){
      return {
        ...state, 
        addToWatchlistDetails : payload
      }
    } else {
      return state;
    }
  };
  
  export default WatchlistReducer;
  