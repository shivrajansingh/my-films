import Image from '../components/common/Image';
import CategoryView from '../components/categoryView/CategoryView';
import { useEffect, useState } from 'react';
import {  getDataFromFirestore } from '../utils/helper/FireBaseHelper';
import { useNavigate } from 'react-router-dom';
import { getAll, setIDB } from 'idbkeyvalue';
import { connect } from 'react-redux';
import { fetchFavourites } from '../services/FavouriteService';
import { fetchWatchlists, getPublicWatchlists } from '../services/WatchlistService';
import WatchlistView from '../components/watchlist/WatchlistView';
import ErrorFallback from '../components/common/ErrorFallback';
import { ErrorBoundary } from 'react-error-boundary';
const Banner = () => {
  const navigate = useNavigate(); 
  const [search, setSearch] = useState("");
  
  const handleSearch = (value:string) => {
    navigate("/search?s="+value);
  };

  const handleKeyDown = (event:any) => {
    if (event.key === 'Enter') {
      handleSearch(event.target.value);
    }
  };

  return (
    <div className="bg-black pb-5">
    <div className="text-whiten banner-image">
      <div className="container">
        <div className="col-md-6 px-0">
          <h1 className="welcome-to-my-container">
            <p className="welcome-to-my">Welcome to My Films,</p>
            <p className="your-favorite-movies-series">
              Your favorite Movies &amp; Series all in one place
            </p>
          </h1>
          <div className="search-bar-parent" id="frameContainer"  onChange={(e:any)=>setSearch(e.target.value)} onKeyDown={handleKeyDown}>
            <input className="search-bar" placeholder="Search here" type="text" />
            <Image className="magnifyingglass-r-icon" alt="Banner" onClick={()=>handleSearch(search)} src="/assets/images/magnifyingglassr.svg" />
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

interface HomeProps{
  isFavouriteUpdated : boolean;
  watchlists : Array<Record<string, any>>;
}
function Home(props:HomeProps) {
  const { isFavouriteUpdated, watchlists } = props; 
  const [isLoading, setLoading] = useState(false); 
  const [isLoadingPublicWL, setLoadingPublicWL] = useState(false); 
  const [recommended, setRecommended] = useState<any>([]);
  const [favorite, setFavourite] = useState<any[]>([]);
  const [watchlistsData, setWatchlists] = useState<any[]>([]);
  const [publicWatchlists, setPublicWatchlists] =useState<any[]>([]);
  
  useEffect(()=>{
    const get = async()=>{
      setLoading(true)
      let recommendedMovies; 
      recommendedMovies = await getAll("recommended");
      if(!recommendedMovies || recommendedMovies.length === 0){
        recommendedMovies = await getDataFromFirestore('recommended'); 
        recommendedMovies && recommendedMovies.length > 0 && recommendedMovies.map((item)=>setIDB(item.imdbID, item, "recommended")); 
      }
      setRecommended(recommendedMovies);

      //getting favourites
      let movies = await fetchFavourites();
      if(movies && movies.length>0) setFavourite(movies)
       

      //getting watchlists
      let watchlist = await fetchWatchlists(); 
      watchlist && setWatchlists(watchlist)
      setLoading(false);

      //getting public watchlists
      setLoadingPublicWL(true);
      let publicWL = await getPublicWatchlists(); 
      publicWL && setPublicWatchlists(publicWL); 
      setLoadingPublicWL(false);
      
    }
    
    get(); 
  }, [])
  
  useEffect(()=>{
    getAll("favourites")
      .then((data)=>{
        setFavourite(data)
      })
  }, [isFavouriteUpdated]);

  useEffect(()=>{
    const fetchData = async()=>{
      let watchlist = await fetchWatchlists(); 
      watchlist && setWatchlists(watchlist)
    }
    fetchData();     
  }, [watchlists])

  // const saveData = () =>{
  //   saveDataToFireStore("recommended", 
  //     {
  //       "Title": "Smile",
  //       "Year": "2022",
  //       "Rated": "R",
  //       "Released": "30 Sep 2022",
  //       "Runtime": "115 min",
  //       "Genre": "Horror, Mystery, Thriller",
  //       "Director": "Parker Finn",
  //       "Writer": "Parker Finn",
  //       "Actors": "Sosie Bacon, Jessie T. Usher, Kyle Gallner",
  //       "Plot": "After witnessing a bizarre, traumatic incident involving a patient, a psychiatrist becomes increasingly convinced she is being threatened by an uncanny entity.",
  //       "Language": "English, Spanish",
  //       "Country": "United States",
  //       "Awards": "2 wins & 22 nominations",
  //       "Poster": "https://m.media-amazon.com/images/M/MV5BZjE2ZWIwMWEtNGFlMy00ZjYzLWEzOWEtYzQ0MDAwZDRhYzNjXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_SX300.jpg",
  //       "Ratings": [
  //           {
  //               "Source": "Internet Movie Database",
  //               "Value": "6.5/10"
  //           },
  //           {
  //               "Source": "Rotten Tomatoes",
  //               "Value": "79%"
  //           },
  //           {
  //               "Source": "Metacritic",
  //               "Value": "68/100"
  //           }
  //       ],
  //       "Metascore": "68",
  //       "imdbRating": "6.5",
  //       "imdbVotes": "166,338",
  //       "imdbID": "tt15474916",
  //       "Type": "movie",
  //       "DVD": "N/A",
  //       "BoxOffice": "$105,935,048",
  //       "Production": "N/A",
  //       "Website": "N/A",
  //       "Response": "True"
  //   }
  //   )
  // }

  return (
    <main>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
      >
      <Banner/>
      <div className="homepage-grids">
      <CategoryView title="My Favourite" data={favorite}  isCarousel={true} isLoading={isLoading}/>
      <WatchlistView title="Watchlists" data={watchlistsData} isLoading={isLoading} isCarousel={true}/>
      <WatchlistView title="Trending Watchlist" data={publicWatchlists} isLoading={isLoadingPublicWL} type="public" isCarousel={true}/>
      <CategoryView title="Recommended" data={recommended} isCarousel={true} isLoading={isLoading} type="recommended"/>
      </div>
      </ErrorBoundary>
    </main>
  )
}


function mapStateToProps(state: Record<string, any>) {
  return {
    isFavouriteUpdated: state.MovieDetailsReducer.isFavouriteUpdated,
    watchlists : state.WatchlistReducer.watchlists
  };
}

export default connect(mapStateToProps, {})(Home);