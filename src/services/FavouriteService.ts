import { insertIfNotExists, deleteDataFromFireStore, checkIfDocumentExists, getDataFromFirestore, getDataWithInCondition } from "../utils/helper/FireBaseHelper";
import { insertIDB, getAll } from "idbkeyvalue";

interface FavouriteParams {
    email: string;
    imdbID:string;
    Title : string;
}

export const AddToFavourite = ({ email, imdbID, Title }: FavouriteParams): void => {
    insertIfNotExists('favourites',{ email, imdbID, Title }, { email, imdbID, Title });
};

export const RemoveFromFavourite = ({ email, imdbID, Title } : FavouriteParams)  : void =>{
    deleteDataFromFireStore('favourites', { email, imdbID, Title })
}

export const toggleFavourite = async (condition : FavouriteParams, details:Record<string, any>): Promise<Record<string, any>> => {
    const collectionName = 'favourites';
    const exists = await checkIfDocumentExists(collectionName, condition);
    if (exists) {
        deleteDataFromFireStore(collectionName, condition);
        return { img :  "/assets/images/heart.svg", action : "removed" } ; 
    } else {
        insertIfNotExists(collectionName, condition, condition);
        insertIfNotExists("movies", details, { imdbID : condition.imdbID });
        return { img :  "/assets/images/heartstraightf-1.svg", action : 'added' }
    }
}


export const fetchFavourites = async()=>{
    let data = await getAll("favourites"); 
    if(data && data.length > 0) {
        return data;  
    }
    let user = localStorage.getItem('user'); 
    let userData = user && JSON.parse(user); 
    if(!userData) return;
    let condition = {  email :  userData.email }
    const favouriteMovies = await getDataFromFirestore("favourites", condition);
    let imdbIds = (favouriteMovies && favouriteMovies.length > 0 && favouriteMovies.map((item)=>item.imdbID)) || []; 
    const movies = await getDataWithInCondition("movies", 'imdbID', imdbIds) || [];
    if(movies && movies.length > 0) movies.map(async(item)=>await insertIDB(item.imdbID, item, 'favourites'))
    return movies;    
}