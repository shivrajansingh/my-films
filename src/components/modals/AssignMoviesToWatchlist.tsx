import React, { useEffect, useState } from 'react'
import Image from '../common/Image';
import { setAddToWatchlistDetails, setWatchlist } from '../../store/action/WatchlistAction';
import { connect } from 'react-redux';
import { deleteIDB, getBy, setIDB } from 'idbkeyvalue';
import { deleteDataFromFireStore, insertIfNotExists } from '../../utils/helper/FireBaseHelper';
import { watchlist_tables } from '../../utils/constants/tables';
import { fetchWatchlistMovies, fetchWatchlists, updateWatchlists } from '../../services/WatchlistService';
import Loader from '../common/Loader';
import { SEARCH_API } from '../../utils/constants/APIUrls';
import { Get } from '../../services/Service';
import Error from '../common/Error';

interface AssignMoviesToWatchlistProps {
  watchlists: Array<Record<string, any>>;
  addToWatchlistDetails: Record<string, any>;
  setAddToWatchlistDetails: (payload: Record<string, any>) => void;
  setWatchlist: (payload: Array<Record<string, any>>) => void;
}

function AssignMoviesToWatchlist(props: AssignMoviesToWatchlistProps) {

  const [btnText, setBtnText] = useState("Add to Watchlist");
  const [watchlistData, setWatchlistData] = useState<Array<Record<string, any>>>([]);
  const [watchlistMovies, setWatchlistMovies] = useState<Array<string>>([]); //the data will update, when check box is clicked
  const [watchlistMovies2, setWatchlistMovies2] = useState<Array<string>>([]); // the data will not updated, so that we can compare which movies are removed
  const { watchlists, addToWatchlistDetails } = props;
  // const { Title, imdbID, Poster, Runtime } = addToWatchlistDetails;
  const [details, setDetails] = useState<Record<string, any>>({});
  const [isError, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { wl_movies } = watchlist_tables;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let watchlistData = await fetchWatchlists();
      watchlistData && setWatchlistData(watchlistData);
      setIsLoading(false);
    }
    fetchData();
  }, [])

  useEffect(()=>{
    if(addToWatchlistDetails && addToWatchlistDetails.hasOwnProperty("Actors")){
      setDetails(addToWatchlistDetails);
      setIDB(addToWatchlistDetails.imdbID, addToWatchlistDetails, 'histories'); 
    }else{
      setIsLoading(true);
      if(addToWatchlistDetails?.imdbID){
      Get(SEARCH_API+"&plot=full&i="+addToWatchlistDetails?.imdbID)
      .then(async(data)=>{
        if(data && data.hasOwnProperty('Response') && data.Response === 'False'){
          setError(true)
        }else{
          setDetails(data); 
          setError(false); 
          setIDB(data.imdbID, data, 'histories'); 
          insertIfNotExists('movies', data, { 'Title' : data.Title})
        }
        setIsLoading(false); 
      })
      .catch((err)=>{
        setError(true)
        setIsLoading(false); 
      })
      }
    }
  }, [addToWatchlistDetails]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let watchlistData = await fetchWatchlists();
      watchlistData && setWatchlistData(watchlistData);
      setIsLoading(false);
    }
    fetchData();
  }, [watchlists])

  useEffect(() => {
    const getWatchlistMovies = async () => {
      setIsLoading(true);
      await fetchWatchlistMovies();
      let watchlistMovies = await getBy(wl_movies, { Title: details?.Title });
      if (watchlistMovies && watchlistMovies.length > 0) {
        watchlistMovies = watchlistMovies.map((item) => item.watchlistName)
        setWatchlistMovies(watchlistMovies);
        setWatchlistMovies2(watchlistMovies);
      }
      setIsLoading(false);
    }
    getWatchlistMovies();
  }, [details, wl_movies])


  const handleSubmit = async () => {
    setBtnText("Adding to Watchlist(s)..");
    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : {};
    const imdbID = details?.imdbID; 
    /**
     * adding newly added watchlists
     */
    const addToWatchlistMovies = async () => {
      for (let value of watchlistMovies) {
        const categoryObj = {
          ...details,
          email: parsedUser.email,
          watchlistName: value
        }
        await insertIfNotExists(wl_movies, categoryObj, { email: parsedUser.email, imdbID : details?.imdbID, watchlistName: value });
        await setIDB(value + "_" + details?.imdbID, categoryObj, wl_movies);
      }
    }

    /**
     * removing movies which are removed from watchlists
     **/
    const removeFromWatchlistMovies = async () => {
      for (let value of watchlistMovies2) {
        if (!watchlistMovies.includes(value)) {
          console.log("Deleting " + value);
          await deleteDataFromFireStore(wl_movies, { email: parsedUser.email, imdbID, watchlistName: value });
          await deleteIDB(value + "_" + imdbID, wl_movies);
        }
      }
    }

    await addToWatchlistMovies();
    await removeFromWatchlistMovies();
    let newList = await updateWatchlists(parsedUser?.email);
    newList && newList.length > 0 && props.setWatchlist(newList);
    setBtnText("Added to Watchlist(s)");
  }

  const toggleCheckItems = (name: string) => {
    setWatchlistMovies(watchlistMovies =>
      watchlistMovies.includes(name)
        ? watchlistMovies.filter(movie => movie !== name)
        : [...watchlistMovies, name]
    );
  };

  const handleCloseModal = () => {
    // props.setAddToWatchlistDetails({});
    setWatchlistMovies([]);
    setBtnText("Add to Watchlist")
  };

  return (
    <div className="modal" id="add-movies-to-watchlist">
      <div className="modal-dialog">
        <div className="modal-content bg-black">
          <div className="modal-body bg-black">
            <button type="button" onClick={handleCloseModal} className="btn-close-1 mt-2" id="add-to-watchlist-close-btn" data-bs-dismiss="modal" />
            <h5 className="mt-2">{ isLoading ? "Loading.." : "Add To Watchlist ("+details?.Title+")" }</h5>
            <br />
            <div className="row p-2">
              {
                isLoading ? <Loader /> :
                (isError) ? <Error title="Something went wrong" description="Unable to fetch data"/> :
                  watchlistData && watchlistData.length > 0 && watchlistData.map((value: any, key) =>
                    <div className="col-md-6 mb-4" key={key}>
                      <div className="d-flex align-items-center">
                        <Image src={value.image} alt={value.name} watchlist={value?.images} className="img-fluid me-3 thumbnail-115" />
                        <div>
                          <h6>{value.name}</h6>
                          <p>{value.number_of_movies} Films · {value.total_hours}</p>
                        </div>
                        <div className="ms-auto" onClick={() => toggleCheckItems(value.name)}>
                          <Image src={watchlistMovies.includes(value.name) ? "/assets/images/check-icon.svg" : "/assets/images/uncheck-icon.svg"} alt="Selected" className="img-fluid " />
                        </div>
                      </div>
                    </div>
                  )
              }

            </div>
            <div className="row p-4">
              <div className="col-md-6">
                <button className="d-block w-100 atf-btn text-white bg-black cnf-cancel-btn p-1" data-bs-dismiss="modal" onClick={handleCloseModal}>
                  <Image src="/assets/images/xcircle-f.svg" /> Cancel
                </button>
              </div>
              <div className="col-md-6">
                <button type="button" className="d-block w-100 atf-btn p-1 text-dark bg-theme-yellow margin-t" onClick={handleSubmit}>
                  <Image src="/assets/images/MonitorPlay-f-2.svg"/> {btnText}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state: Record<string, any>) {
  return {
    watchlists: state.WatchlistReducer.watchlists,
    addToWatchlistDetails: state.WatchlistReducer.addToWatchlistDetails
  };
}

export default connect(mapStateToProps, { setAddToWatchlistDetails, setWatchlist })(AssignMoviesToWatchlist);