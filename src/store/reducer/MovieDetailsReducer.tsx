interface MovieDetailsState {
  movieDetails: Record<string, any>;
  isFavouriteUpdated : boolean;
  deleteRequest : Record<string, any>
}
  
interface MovieDetailsAction {
  type: string;
  payload: any;
}
  
const initState: MovieDetailsState = {
  movieDetails: {},
  isFavouriteUpdated : false,
  deleteRequest : {
    title : "", 
    type : "", 
    details : {}, 
    isDeleted : false
  }
};
  
const MovieDetailsReducer = (state: MovieDetailsState = initState, action: MovieDetailsAction): MovieDetailsState => {
  const { type, payload } = action;
  if (type === 'MOVIE_DETAILS') {
    return {
      ...state,
      movieDetails: payload,
    };
  }
  else if (type === 'FAVOURITE_UPDATED') {
    return {
      ...state,
      isFavouriteUpdated: payload,
    };
  } 
  else if (type === 'DELETE_REQUEST') {
    return {
      ...state,
      deleteRequest: payload,
    };
  }
  else {
    return state;
  }
};
  
export default MovieDetailsReducer;
  