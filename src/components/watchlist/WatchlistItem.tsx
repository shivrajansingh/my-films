import React from 'react'
import Image from '../common/Image'
import { setDeleteRequest } from '../../store/action/MoviesAction'
import { connect } from 'react-redux'; 
import { Link } from 'react-router-dom';

interface WatchlistItemProps{
    details : Record<string, any>;
    type:string;
    setDeleteRequest : (payload : Record<string, any>) => void; 
}

function WatchlistItem(props:WatchlistItemProps) {
    const { type } = props; 
    const { name, image, number_of_movies, total_hours } = props.details; 
    var user = { photoURL : "", displayName : ""}; 
    if(type === 'public' && props.details.hasOwnProperty('user')){
      user = props.details.user; 
    }
    const handleDelete = () =>{
        props.setDeleteRequest({
          title : name, 
          type : type,
          details : props.details
        })
      }

    return (
        <div className="col pt-3">
        <div className="category-items" >
            <Image className="category-poster-icon" src={image} watchlist={props.details?.images} />
            {
              type === 'watchlist' ?  <div className="trash-icon">
              <Image src="/assets/images/Frame 277131902.svg" data-bs-toggle="modal" data-bs-target="#delete-confirmation" onClick={handleDelete}/>
            </div> : ""
            }
          
            
            <div className="category-info">
                <h3 className="sci-fi-movies">{name}</h3>
                <div className="films-14h">{number_of_movies} Films ‧ {total_hours}</div>
                {
                  type === 'public' && user ? <div className='films-14h'>
                  <Image src={user?.photoURL} style={{width:"25px",borderRadius : "20px"}} /> <strong>{user?.displayName}</strong>
                </div> : ""
                }
                
            </div>
            {
              type === 'public' ?  
              <Link to={"/watchlist/trending-watchlist/"+props.details.id}><div className="black-film"></div></Link> :  
              <Link to={"/watchlist/"+name}><div className="black-film"></div></Link>
            }
           
        </div>
      </div>
    )
}


function mapStateToProps(state:Record<string, any>){
    return { 
        deleteRequest : state.MovieDetailsReducer.deleteRequest
    }
}

export default connect(mapStateToProps, {setDeleteRequest})(WatchlistItem); 