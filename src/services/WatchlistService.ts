import { watchlist_tables } from "../utils/constants/tables";
import { getDataByIdFromFirestore, getDataFromFirestore, getDataWithInCondition, saveOrUpdateDataToFireStore } from "../utils/helper/FireBaseHelper";
import { getAll, getBy, setIDB, updateIDB } from "idbkeyvalue";
const { wl_lists, wl_movies } = watchlist_tables; 

export const fetchWatchlists = async() =>{
    let data = await getAll(wl_lists); 
    if(data && data.length > 0) {
        return data;  
    }
    let user = localStorage.getItem('user'); 
    let userData = user && JSON.parse(user); 
    if(!userData) return;
    let condition = {  email :  userData.email }
    const watchlists = await getDataFromFirestore(wl_lists, condition);
    watchlists && watchlists.length > 0 && watchlists.map(async(item)=>setIDB(item.name, item, wl_lists));
    return watchlists;
} 

export const fetchWatchlistMovies = async() =>{
    let data = await getAll(wl_movies); 
    if(data && data.length > 0) {
        return data;  
    }
    let user = localStorage.getItem('user'); 
    let userData = user && JSON.parse(user); 
    if(!userData) return;
    let condition = {  email :  userData.email }
    const watchlistMovies = await getDataFromFirestore(wl_movies, condition);
    //watchlistMovies && watchlistMovies.length > 0 && watchlistMovies.map((item)=>setIDB(item.watchlistName+"_"+item.imdbID, item, wl_movies));
    let imdbIds = (watchlistMovies && watchlistMovies.length > 0 && watchlistMovies.map((item)=>item.imdbID)) || []; 
    const movies = await getDataWithInCondition("movies", 'imdbID', imdbIds) || [];
    if(watchlistMovies && watchlistMovies.length > 0){
        for(let value of watchlistMovies){
            let watchlistName = value.watchlistName;
            let email = userData.email
            movies && movies.length > 0 && movies.map((item)=>{
                if(item.imdbID === value.imdbID){
                    let obj = { ...item, watchlistName, email }
                    setIDB(watchlistName+"_"+item.imdbID, obj, wl_movies); 
                }
                return null
            })
        }
    }
}

export const fetchWatchlistMoviesBySlug = async(slug:string, email:string="") =>{
    let data = await getBy(wl_movies, { watchlistName : slug })
    if(data && data.length > 0) {
        return data;  
    }
    let user = localStorage.getItem('user'); 
    let userData = user && JSON.parse(user); 
    if(email === "") email = userData?.email; 
    if(!userData) return;
    let condition = {  email : email, watchlistName : slug }
    const watchlistMovies = await getDataFromFirestore(wl_movies, condition);
    console.log(watchlistMovies); 
    let imdbIds = (watchlistMovies && watchlistMovies.length > 0 && watchlistMovies.map((item)=>item.imdbID)) || []; 
    const movies = await getDataWithInCondition("movies", 'imdbID', imdbIds) || [];
    movies && movies.length > 0 && movies.map((item)=>setIDB(slug+"_"+item.imdbID, { ...item, email : email, watchlistName : slug }, wl_movies));
    return movies;
}

interface FetchWatchlistMoviesResponse {
  title: string;
  movies: any[];
}

export const fetchWatchlistMoviesByID = async (id: string): Promise<FetchWatchlistMoviesResponse> => {
  try {
      const watchlist = await getDataByIdFromFirestore(wl_lists, id);
      if(watchlist && watchlist.hasOwnProperty('isPublic') && watchlist.isPublic){
        const watchlistMovies = await getDataFromFirestore(wl_movies, {watchlistName : watchlist.name, email : watchlist.email}); 
        if (watchlistMovies && watchlistMovies.length > 0) {
            const imdbIds = watchlistMovies.map((item:any) => item.imdbID);
            const movies = await getDataWithInCondition('movies', 'imdbID', imdbIds);

            if (movies && movies.length > 0) {
                return { title: watchlist.name, movies };
            }
        }
      }
      
      return { title: 'Error: Invalid Watchlist', movies: [] };
  } catch (error) {
      console.error('Error fetching watchlist movies:', error);
      return { title: 'Error: Invalid Watchlist', movies: [] };
  }
};


 /**
   * When Movies are added or removed from a watchlist category then its meta data such as poster, run time, number of movies needs to be updated, 
   * this function is updating these meta data
   */
export const updateWatchlists = async (email: string) => {
    const calculateTotalRuntime = (movies: Array<Record<string, any>>) => {
      if (movies && movies.length > 0) {
        const runTimes = movies.map((item) => item.Runtime);
        let totalMinutes = 0;

        runTimes.forEach(time => {
          const parts = time.split(' ');
          totalMinutes += parseInt(parts[0]);
        });

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours} hrs ${minutes} min`;
      } else {
        return "0 min";
      }
    }
    const lists = await getAll(wl_lists);
    if (lists && lists.length > 0) {
      let newList = [];
      for (let list of lists) {
        let name = list.name;
        let movies = await getBy(wl_movies, { watchlistName: name });
        let total_hours = calculateTotalRuntime(movies);
        let images = movies.slice(0, 4).map((item: Record<string, any>) => item.Poster);
        let obj = {
          ...list,
          image : "/assets/images/default.jpg",
          images, total_hours, number_of_movies: movies.length
        }
        newList.push(obj);
        updateIDB(name, obj, wl_lists);
        saveOrUpdateDataToFireStore(wl_lists, obj, { email: email, name: name });
      }
      return newList; 
    //   props.setWatchlist(newList);//trigger the changes to all over the app using redux
    }
}

export const getPublicWatchlists = async()=>{
  let publicWL = await getDataFromFirestore(wl_lists, { isPublic : true }, 10);
  let watchlist = []; 
  if(publicWL && publicWL.length> 0){
    for(let value of publicWL){
      let email = value.email; 
      let user = await getDataFromFirestore("users", { email : email }); 
      if(user && user.length>0){
        value.user = user[0]; 
        watchlist.push(value); 
      }
    }
  }
  return watchlist; 
}
