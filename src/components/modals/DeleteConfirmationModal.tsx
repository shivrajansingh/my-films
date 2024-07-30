import React, { useEffect, useState } from 'react'
import Image from '../common/Image'
import { connect } from 'react-redux'
import { setDeleteRequest, setIsFavouriteUpdated } from '../../store/action/MoviesAction';
import { setWatchlist } from '../../store/action/WatchlistAction';
import { clearAllKeys, deleteIDB, getAll } from 'idbkeyvalue';
import { toggleFavourite } from '../../services/FavouriteService';
import { deleteDataFromFireStore } from '../../utils/helper/FireBaseHelper';
import { watchlist_tables } from '../../utils/constants/tables';
import {  updateWatchlists } from '../../services/WatchlistService';
interface DeleteConfirmationModalProps{
    deleteRequest : Record<string, any>;
    isFavouriteUpdated :boolean;
    setDeleteRequest : (requestDetails:Record<string, any>) => void;
    setIsFavouriteUpdated : (isUpdated:boolean) => void;
    setWatchlist: (payload: Array<Record<string, any>>) => void;
}

function DeleteConfirmationModal({ deleteRequest, isFavouriteUpdated, setDeleteRequest, setIsFavouriteUpdated, setWatchlist } : DeleteConfirmationModalProps) {
    const { title, type, details } = deleteRequest; 
    const [btnText, setBtnText] = useState("Yes, Delete"); 

    const [user, setUser] = useState<any>({});
    const { wl_lists, wl_movies } = watchlist_tables; 
    useEffect(()=>{
      //getting users
      let user = localStorage.getItem('user');
      user = user && JSON.parse(user); 
      setUser(user); 
    }, [])
    
    const handleCancel = () =>{
        setDeleteRequest({
            title : "", 
            type : "",
            details : {}, 
            isDeleted : false
        }); 
    }

    const handleDelete = async()=>{
        setBtnText("Please Wait..");
        if(type === 'favourite'){
            let favouriteObj = { email : user.email, imdbID : details?.imdbID, Title : details.Title };
            await toggleFavourite(favouriteObj, details)
            deleteIDB(details?.imdbID, "favourites");
            setIsFavouriteUpdated(!isFavouriteUpdated); 
        }else if(type === 'watchlist'){
            let condition = { email : user.email, name : title }
            await deleteDataFromFireStore(wl_lists, condition); //delete from firebase
            await deleteIDB(title, wl_lists); //delete from idb
            await deleteDataFromFireStore(wl_movies, { email : user.email, watchlistName : title });
            await clearAllKeys(wl_movies); 
            let watchlistData = await getAll(wl_lists); //get latest data
            setWatchlist(watchlistData); //update redux
        }else if(type === 'watchlistMovie'){
            let condition = { email : user.email, watchlistName : details?.watchlistName, Title : title }
            await deleteDataFromFireStore(wl_movies, condition);
            await deleteIDB(details?.watchlistName+"_"+details?.imdbID,wl_movies); 
            let newList = await updateWatchlists(user?.email);
            newList && newList.length > 0 && setWatchlist(newList);
        }
        setBtnText("Yes, Delete");
        setDeleteRequest({
            ...deleteRequest, 
            isDeleted : true
        }); 
        document.getElementById("close-btn")?.click(); 
    }

    return (
        <div className="modal" id="delete-confirmation">
            <div className="modal-dialog">
                <div className="modal-content text-center">
                    <button type="button" className="btn-close-1" id="close-btn" data-bs-dismiss="modal"/>
                    <div className="modal-body bg-black">
                        <h4>Delete {type === 'watchlist' ? "Watchlist" : "Movie"}</h4>
                        <p>Are you sure you want to delete {title} from your {type}? </p>
                        <br/>
                        <div className="row">
                            <div className="col-12 col-md-6"><button className="d-block w-100 atf-btn bg-black cnf-cancel-btn" data-bs-dismiss="modal" onClick={handleCancel}> <Image src="/assets/images/xcircle-f.svg"  /> No, Cancel </button></div>
                            <div className="col-12 col-md-6"><button className="d-block w-100 atf-btn bg-danger cnf-delete-btn" onClick={handleDelete}> 
                                <Image src="/assets/images/Trash-f.svg"/> {btnText} </button></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


function mapStateToProps(state:Record<string, any>){
    return { 
        deleteRequest : state.MovieDetailsReducer.deleteRequest,
        isFavouriteUpdated : state.MovieDetailsReducer.isFavouriteUpdated
    }
}

export default connect(mapStateToProps, {setDeleteRequest, setIsFavouriteUpdated, setWatchlist})(DeleteConfirmationModal); 