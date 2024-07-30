export const setMovieDetails = (payload: Record<string, any>) =>({
    type : 'MOVIE_DETAILS', 
    payload : payload
});

export const setIsFavouriteUpdated = (payload: boolean) =>({
    type : 'FAVOURITE_UPDATED', 
    payload : payload
});

export const setDeleteRequest = (payload: Record<string, any>) =>({
    type : 'DELETE_REQUEST', 
    payload : payload
});
