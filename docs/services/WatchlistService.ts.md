**Watchlist Management System Documentation**

### Overview

This code snippet is part of a larger application responsible for managing user watchlists. The system allows users to create and manage their own watchlists, which are collections of movies or TV shows. The code is written in JavaScript using the ES6 syntax and utilizes various helper functions from the `../utils/helper` module.

### Importing Helper Functions

```
import { watchlist_tables } from "../utils/constants/tables";
import { getDataByIdFromFirestore, getDataFromFirestore, getDataWithInCondition, saveOrUpdateDataToFireStore } from "../utils/helper/FireBaseHelper";
import { getAll, getBy, setIDB, updateIDB } from "../utils/helper/IndexDB";
```

The code imports necessary helper functions from the `../utils/helper` module. These functions are used to interact with the Firebase Realtime Database and IndexedDB.

### Watchlist Tables

```
const { wl_lists, wl_movies } = watchlist_tables;
```

The code defines two constants, `wl_lists` and `wl_movies`, which represent the watchlists and movies tables in the IndexedDB respectively. These tables are used to store user data and movie information.

### Fetch Watchlists Function

```
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
```

This function fetches the user's watchlist data from IndexedDB or Firebase Realtime Database. If the data is available in IndexedDB, it returns the data directly. Otherwise, it retrieves the data from Firebase and saves it to IndexedDB before returning it.

### Fetch Watchlist Movies Function

```
export const fetchWatchlistMovies = async() =>{
  let data = await getAll(wl_movies); 
  if(data && data.length > 0) {
    return data;  
  }
  let user = localStorage.getItem('user'); 
  let userData = user && JSON.parse(user); 
  if(!userData) return;
  let condition = {  email :  userData.email }
  const movies = await getDataFromFirestore(wl_movies, condition);
  movies && movies.length > 0 && movies.map(async(item)=>setIDB(item.watchlistName, item, wl_movies));
  return movies;
}
```

This function fetches the user's movie data from IndexedDB or Firebase Realtime Database. If the data is available in IndexedDB, it returns the data directly. Otherwise, it retrieves the data from Firebase and saves it to IndexedDB before returning it.

### Update Watchlists Function

```
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
```

This function updates the user's watchlists by fetching movie data from IndexedDB or Firebase Realtime Database and recalculating total runtime for each list. It also updates the watchlists in IndexedDB.

### Get Public Watchlists Function

```
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
```

This function retrieves public watchlists from Firebase Realtime Database and returns them as an array of objects.

### Conclusion

In conclusion, this code snippet provides functions for managing user watchlists in a larger application. It utilizes IndexedDB to store watchlist data and Firebase Realtime Database to fetch data when necessary. The functions provided include fetching watchlists, movies, updating watchlists, and getting public watchlists.