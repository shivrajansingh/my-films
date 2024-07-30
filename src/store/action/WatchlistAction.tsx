export const setWatchlist = (payload: Array<Record<string, any>>) =>({
    type : 'ADD_DATA', 
    payload : payload
});

export const setAddToWatchlistDetails = (payload: Record<string, any>) =>({
    type : 'ADD_TO_WATCHLIST', 
    payload : payload
});