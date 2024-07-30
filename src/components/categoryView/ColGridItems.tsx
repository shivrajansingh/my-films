import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import Image from '../common/Image';
import { connect } from 'react-redux';
import { setMovieDetails, setDeleteRequest } from '../../store/action/MoviesAction';
import { setAddToWatchlistDetails } from '../../store/action/WatchlistAction';
import {  getIDB } from 'idbkeyvalue';
import { fetchWatchlists } from '../../services/WatchlistService';

interface ColGridItemsProps extends HTMLAttributes<HTMLDivElement> {
    posterSrc: string;
    title: string;
    year: string;
    duration: string;
    imdbRating: string;
    details:any;
    deleteRequest:Record<string, any>;
    type:string;
    setMovieDetails: (details: any) => void;
    setDeleteRequest : (requestDetails:Record<string, any>) => void;
    setAddToWatchlistDetails : (payload:Record<string, any>) => void;
  }
  
const ColGridItems: FC<ColGridItemsProps> = (props) => {
  const {
    posterSrc,
    title,
    year,
    duration,
    imdbRating,
    details,
    type
  } = props;

  const [heartImg, setHeartImage] = useState("");
  const types = ["watchlist", "watchlistMovie", "favourite"]; 
  useEffect(()=>{
    //checking for favourite
    const checkDocument = async() =>{
      try{
        let isExists = await getIDB(details?.imdbID ,"favourites");
        if(isExists){
          setHeartImage("/assets/images/heartstraightf-1.svg");
        }else{
          setHeartImage("/assets/images/heart.svg");
        } 
      }
      catch(e:any){
        setHeartImage("/assets/images/heart.svg");
      }
    }
    checkDocument();     
  }, [details])

 
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
    <>
    <div className="col pt-3">
      <div className="category-items zoom" >
          <Image className="category-poster-icon" src={posterSrc} />
          <div className="favourite-icon">
            <span data-bs-toggle="modal" id="open-create-watchlist-modal" data-bs-target="#new-watchlist" ></span>
            <span data-bs-toggle="modal" id="open-assign-movies-to-watchlist" data-bs-target="#add-movies-to-watchlist"></span>
            <Image src="/assets/images/Frame-277131901.svg" onClick={handleAddToWatchList}/>
          </div>
          {
            (types.includes(type)) ? <div className="trash-icon">
            <Image src="/assets/images/Frame 277131902.svg" data-bs-toggle="modal" data-bs-target="#delete-confirmation" onClick={handleDelete}/>
          </div> : ""
          }
          
          
          
          <div className="category-info">
              <h3 className="sci-fi-movies">{title.length > 15 ? title.substring(0, 15) + "..." : title}</h3>
              <div className="films-14h">{year} Films ‧ {duration}</div>
              <div className="rating row">
                  <div className="col-md-10 col-10">
                      <Image src="/assets/images/IMDB_Logo_2016 1.svg" />
                      <div className="films-14h">&nbsp; IMDb : {imdbRating} &nbsp;</div>
                      <Image src="/assets/images/starf.svg" />
                  </div>
                  {
                    (heartImg && heartImg!== '') ? <div className="col-md-2 col-2"><Image src={heartImg}/></div> : ""
                  }
              </div>
          </div>
          <div className="black-film" data-bs-toggle="modal" data-bs-target="#movie-details"
      onClick={()=>{ props.setMovieDetails(details) }}></div>
      </div>
    </div>
    </>
  )
}

function mapStateToProps(state:Record<string, any>){
  return { 
    deleteRequest : state.MovieDetailsReducer.deleteRequest
  }
}

export default connect(mapStateToProps, {setMovieDetails, setDeleteRequest, setAddToWatchlistDetails})(ColGridItems); 