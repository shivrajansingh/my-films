import React, { useEffect, useState } from 'react';
import Image from '../common/Image';
import { connect } from 'react-redux';
import Error from '../common/Error';
import { SEARCH_API } from '../../utils/constants/APIUrls';
import { Get } from '../../services/Service';
import Loader from '../common/Loader';
// import { insertIfNotExists } from '../utils/helper/FireBaseHelper';
import { toggleFavourite } from '../../services/FavouriteService';
import { deleteIDB, setIDB } from 'idbkeyvalue';
import { setIsFavouriteUpdated, setMovieDetails } from '../../store/action/MoviesAction';
import { getIDB } from 'idbkeyvalue';
import { setAddToWatchlistDetails } from '../../store/action/WatchlistAction';
import { fetchWatchlists } from '../../services/WatchlistService';
import { insertIfNotExists } from '../../utils/helper/FireBaseHelper';
interface MovieDetailsModalProps {
  movieDetails?: Record<string, any>;
  isFavouriteUpdated :boolean,
  setIsFavouriteUpdated : (isUpdated:boolean) => void,
  setMovieDetails: (payload: Record<string, any>) => void;
  setAddToWatchlistDetails: (payload: Record<string, any>) => void;
}

function MovieDetailsModal({ movieDetails, isFavouriteUpdated, setIsFavouriteUpdated, setMovieDetails, setAddToWatchlistDetails }: MovieDetailsModalProps) {
  const [details, setDetails] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [user, setUser] = useState<any>({});
  const [heartImg, setHeartImage] = useState("/assets/images/heart.svg"); 
  const [isFavourite, setIsFavourite] = useState(false);
 
  useEffect(()=>{
    //getting users
    let user = localStorage.getItem('user');
    user = user && JSON.parse(user); 
    setUser(user); 
  }, [])

  useEffect(()=>{
    if(movieDetails && movieDetails.hasOwnProperty("Actors")){
      setDetails(movieDetails);
      setIsLoading(false); 
      setIDB(movieDetails.imdbID, movieDetails, 'histories'); 
    }else{
      setIsLoading(true);
      if(movieDetails?.imdbID){
      Get(SEARCH_API+"&plot=full&i="+movieDetails?.imdbID)
      .then(async(data)=>{
        if(data && data.hasOwnProperty('Response') && data.Response === 'False'){
          setError(true)
        }else{
          setDetails(data); 
          setError(false); 
          setIDB(data.imdbID, data, 'histories'); 

          /**
           * if you need to save the movie to firestore at every open uncomment this
           * */
          insertIfNotExists('movies', data, { 'Title' : data.Title})
          // let historyData = {
          //   email : email, 
          //   Title : data.Title, 
          //   imdbID : data.imdbID
          // }
          // insertIfNotExists('histories', historyData, {'Title' :  historyData.Title})
        }
        setIsLoading(false); 
      })
      .catch((err)=>{
        setError(true)
        setIsLoading(false); 
      })
      }
    }

     //check for favourite 
     if(movieDetails?.imdbID){
      const checkIsFavourite = async()=>{
        let isExists = await getIDB(movieDetails?.imdbID ,"favourites");
        if(isExists){
          setIsFavourite(true);
          setHeartImage("/assets/images/Trash-f.svg");
        }else{
          setIsFavourite(false);
          setHeartImage("/assets/images/heart.svg");
        }
       }
       checkIsFavourite();
     }
      
     
  }, [movieDetails]);

  const getRatingImageSrc = (source: string) => {
    switch (source) {
      case 'Internet Movie Database':
        return '/assets/images/IMDB_Logo_2016.svg';
      case 'Rotten Tomatoes':
        return '/assets/images/Tomatoes.svg';
      case 'Metacritic':
        return '/assets/images/Metacritic.svg';
      default:
        return '';
    }
  };

  const getRatingLabel = (source: string) => {
    switch (source) {
      case 'Internet Movie Database':
        return 'IMDb';
      default:
        return source;
    }
  };

  const getRatingClassName = (source: string) => {
    switch (source) {
      case 'Internet Movie Database':
        return 'imdb-rating';
      case 'Rotten Tomatoes':
        return 'imdb-rating mx-2';
      case 'Metacritic':
        return 'imdb-rating';
      default:
        return 'imdb-rating';
    }
  };

  const getMovieDetail = (key: string) => {
    return details && details[key] ? details[key] : 'N/A';
  };

  const handleFavourite = async()=>{
    let heartBtnEle = window.document.getElementById('heart') as HTMLInputElement;
    heartBtnEle.innerHTML = "Please Wait.."; 
    let favouriteObj = { email : user.email, imdbID : details?.imdbID, Title : details.Title };
    let { img, action } = await toggleFavourite(favouriteObj, details)
    
    setHeartImage(img); 
     
    if(action === 'added'){
      heartBtnEle.innerHTML = "Added to Favourite"; 
      setIDB(details?.imdbID,details,"favourites");
    }else{
      heartBtnEle.innerHTML = "Add to Favourite";
      deleteIDB(details?.imdbID, "favourites"); 
    }
    setIsFavouriteUpdated(!isFavouriteUpdated);
  }

  const handleAddToWatchList = async() =>{
    setAddToWatchlistDetails(details); 
    let data = await fetchWatchlists(); 
    if(data && data.length > 0){
      document.getElementById("open-assign-movies-to-watchlist")?.click();
    }else{
      document.getElementById("open-create-watchlist-modal")?.click();
    }
  }

  return (
    <div className="modal" id="movie-details">
      <div className="modal-dialog">
        <div className="modal-content">
          <button type="button" className="btn-close-1" data-bs-dismiss="modal" onClick={()=>{
            setDetails({});
            setIsLoading(true); 
            setMovieDetails({});
          }}/>
          <div className="modal-body p-0 bg-black">

            {
              (isLoading) ? <Loader/> :
              (isError) ? <Error title="Something went wrong" description="Unable to fetch data"/> :
              (!details) ? <Error title="No Data Found" description="Something went wrong and unable to find the data" /> :
                <>
                  <div className="poster-container">
                    <Image src={getMovieDetail('Poster')} className="poster-image" />
                  </div>
                  <div className="slider-rating text-center">
                    {details && details.hasOwnProperty('Ratings') && details.Ratings.length > 0 ? (
                      details.Ratings.map((rating: any) => (
                        <div className={getRatingClassName(rating.Source)} key={rating.Source}>
                          <Image src={getRatingImageSrc(rating.Source)} alt={rating.Source} />
                          <p>{getRatingLabel(rating.Source)}: {rating.Value}</p>
                        </div>
                      ))
                    ) : (
                      <p>No ratings available.</p>
                    )}
                  </div>
                  <div className="slider-popup">
                    <h2>{getMovieDetail('Title')}</h2>
                    <p>{getMovieDetail('Plot')}</p>
                    <ul>
                      <li>Release Date : {getMovieDetail('Released')} |</li> 
                      <li> Directed By : {getMovieDetail('Director')}</li>
                    </ul>
                    <div className="clearfix" />
                    <ul>
                      <li>Run Time : {getMovieDetail('Runtime')} |</li>
                      <li>Genre : {getMovieDetail('Genre')}</li>
                    </ul>
                    <div className="clearfix" />
                    {
                      (isFavourite) ? 
                      <>
                      <button type="button" className="atf-btn bg-danger" onClick={handleFavourite}> <Image src={heartImg}/> <span id="heart">Delete From List</span></button>
                      <button type="button" className=" atf-btn atw-btn" onClick={handleAddToWatchList}> <Image src="/assets/images/MonitorPlay-f-2.svg" /> Add To Watchlist</button>
                      </> : 
                      <>
                      <button type="button" className=" atf-btn atw-btn" onClick={handleAddToWatchList}> <Image src="/assets/images/MonitorPlay-f-2.svg" /> Add To Watchlist</button>
                      <button type="button" className=" atf-btn" onClick={handleFavourite}> <Image src={heartImg}/> <span id="heart">Add To Favourites</span></button>
                      </>
                    }
                    
                  </div>
                </>
            }
          </div>
        </div>
      </div>
      <span data-bs-toggle="modal" id="open-create-watchlist-modal" data-bs-target="#new-watchlist" ></span>
      <span data-bs-toggle="modal" id="open-assign-movies-to-watchlist" data-bs-target="#add-movies-to-watchlist"></span>
    </div>
  );
}

function mapStateToProps(state: Record<string, any>) {
  return {
    movieDetails: state.MovieDetailsReducer.movieDetails,
    isFavouriteUpdated: state.MovieDetailsReducer.isFavouriteUpdated
  };
}

export default connect(mapStateToProps, {setIsFavouriteUpdated, setMovieDetails, setAddToWatchlistDetails})(MovieDetailsModal);
