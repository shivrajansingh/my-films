import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import Image from '../common/Image'
import { deleteIDB, getIDB, setIDB } from 'idbkeyvalue';
import { connect } from 'react-redux';
import { toggleFavourite } from '../../services/FavouriteService';
import { setIsFavouriteUpdated, setMovieDetails, setDeleteRequest } from '../../store/action/MoviesAction';
import { setAddToWatchlistDetails } from '../../store/action/WatchlistAction';
import { fetchWatchlists } from '../../services/WatchlistService';
interface ColItemsProps extends HTMLAttributes<HTMLDivElement> {
    posterSrc: string;
    title: string;
    year: string;
    duration: string;
    imdbRating: string;
    details:any;
    deleteRequest : Record<string, any>; 
    type : string; 
    setMovieDetails: (details: any) => void;
    isFavouriteUpdated :boolean;
    setIsFavouriteUpdated : (isUpdated:boolean) => void;
    setDeleteRequest : (requestDetails:Record<string, any>) => void;
    setAddToWatchlistDetails: (payload: Record<string, any>) => void;
  }

const ColListItems: FC<ColItemsProps> = (props) => {
  const { posterSrc, title, year, duration, imdbRating,details, isFavouriteUpdated, deleteRequest, type} = props; 
  const [heartImg, setHeartImage] = useState("");
  const [favText, setFavText] = useState(""); 
  const [isFavourite, setIsFavourite] = useState(false); 
  const [user, setUser] = useState<any>({});

  useEffect(()=>{
    //getting users
    let user = localStorage.getItem('user');
    user = user && JSON.parse(user); 
    setUser(user); 
  }, [])
  
  /**
   * Check whether current grid value is in favourite list or not
   */
  useEffect(()=>{
    const checkDocument = async() =>{
      try{
        let isExists = await getIDB(details?.imdbID ,"favourites");
        if(isExists){
          setHeartImage("/assets/images/Trash-f.svg");
          setFavText(" Delete From List"); 
          setIsFavourite(true); 
        }else{
          setHeartImage("/assets/images/heart.svg");
          setIsFavourite(false); 
          setFavText(" Add To Favourite"); 
        } 
      }
      catch(e:any){
        setHeartImage("/assets/images/heart.svg");
      }
    }
    checkDocument();     
  }, [details])

  useEffect(()=>{
    if(deleteRequest.isDeleted && deleteRequest.title === title){
      setHeartImage("/assets/images/heart.svg");
      setIsFavourite(false); 
      setFavText(" Add To Favourite"); 
    } 
  }, [deleteRequest, title])


  const handleFavourite = async()=>{
    setFavText("Please Wait..");
    let favouriteObj = { email : user.email, imdbID : details?.imdbID, Title : details.Title };
    let { img, action } = await toggleFavourite(favouriteObj, details)
    
    setHeartImage(img); 
     
    if(action === 'added'){
      setIDB(details?.imdbID,details,"favourites");
      setFavText(" Added to Favourite");
      setIsFavourite(true); 
    }else{
      deleteIDB(details?.imdbID, "favourites");
    }
    props.setIsFavouriteUpdated(!isFavouriteUpdated); 
  }

  const handleDelete = () =>{
    props.setDeleteRequest({
      title : details.Title, 
      type : type,
      details
    })
  }
  
  const handleAddToWatchList = async() =>{
    props.setAddToWatchlistDetails(details); 
    let data = await fetchWatchlists(); 
    if(data && data.length > 0){
      document.getElementById("open-assign-movies-to-watchlist")?.click();
    }else{
      document.getElementById("open-create-watchlist-modal")?.click();
    }
  }
  
  return (
  <div className="col col-md-12 col-lg-10">
  <div className="category-item-listś">
    <div className="row">
      <div className="col-md-3" data-bs-toggle="modal" data-bs-target="#movie-details" onClick={()=>{ props.setMovieDetails(details) }}>
        <Image src={posterSrc}/></div>
      <div className="col-md-6">
        <h2 data-bs-toggle="modal" data-bs-target="#movie-details">{title}</h2>
        <p>{details.Plot}</p>
        <div className="category-info">
          <div className="films-14h">{year} ‧ {details.Genre} ‧ {duration}</div>
          <div className="rating row">
            <div className="col-md-12">
              <Image src="/assets/images/IMDB_Logo_2016 1.svg" />
              <div className="films-14h">&nbsp; IMDb : {imdbRating} &nbsp;</div>
              <Image src="/assets/images/starf.svg" />
            </div>
          </div>            
        </div> 
      </div>
      <div className="col-md-3">
        <button type="button" className="d-block w-100 atf-btn atw-btn" onClick={handleAddToWatchList}> <Image src="/assets/images/MonitorPlay-f-2.svg" style={{padding : '0 0 4px 0'}}/> Add To Watchlist</button>
        {
          isFavourite ? <button type="button" className="d-block w-100 atf-btn bg-danger" data-bs-toggle="modal" data-bs-target="#delete-confirmation" onClick={handleDelete}> 
          <Image src={heartImg} style={{padding : '0 0 4px 0'}}/> 
                {favText}
                </button> : <button type="button" className="d-block w-100 atf-btn" onClick={handleFavourite}> 
          <Image src={heartImg} style={{padding : '0 0 4px 0'}}/> 
          {favText}
        </button>
        }
        
      </div>
    </div>
  </div>
  <span data-bs-toggle="modal" id="open-create-watchlist-modal" data-bs-target="#new-watchlist" ></span>
  <span data-bs-toggle="modal" id="open-assign-movies-to-watchlist" data-bs-target="#add-movies-to-watchlist"></span>
  <hr />
</div>
  )
}


function mapStateToProps(state:Record<string, any>){
  return { 
    isFavouriteUpdated: state.MovieDetailsReducer.isFavouriteUpdated, 
    deleteRequest : state.MovieDetailsReducer.deleteRequest
  }
}

export default connect(mapStateToProps, {setMovieDetails, setIsFavouriteUpdated, setDeleteRequest, setAddToWatchlistDetails})(ColListItems); 