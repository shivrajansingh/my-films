import React, { useEffect, useState } from 'react'
import CategoryView from '../components/categoryView/CategoryView'
import { fetchFavourites } from '../services/FavouriteService';
import { connect } from 'react-redux';
import { getAll } from 'idbkeyvalue';
import { useLocation } from 'react-router-dom';

interface FavouriteProps{
  isFavouriteUpdated : boolean
}

function Favourites(props:FavouriteProps) {
  const [data, setData] = useState<any[]>([]); 
  const { isFavouriteUpdated } = props; 
  const [isLoading, setIsLoading] = useState(false); 
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') ?? '1';
  const [totalResults, setTotalResults] = useState(1); 
  const RESULTS_PER_PAGE = 10;

  useEffect(()=>{
    setIsLoading(true); 
    fetchFavourites()
    .then((data)=>{
      if(data){
        setTotalResults(data.length); 
        const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
        const end = start + RESULTS_PER_PAGE;
        let paginationData = data.slice(start,end); 
        setData(paginationData);
        setIsLoading(false);
      }
    })
  }, [page])

  useEffect(()=>{
    getAll("favourites")
      .then((data)=>{
        const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
        const end = start + RESULTS_PER_PAGE;
        let paginationData = data.slice(start,end); 
        setData(paginationData);
      })
  }, [isFavouriteUpdated, page]);


  return (
    <main>
    <div className='container'>
    <CategoryView 
    title="Favourite" 
    data={data} 
    isViewType={true} 
    isLoading={isLoading}
    isPagination={true}
    totalResults={totalResults}
    />
    </div>
    </main>
  )
}


function mapStateToProps(state: Record<string, any>) {
  return {
    isFavouriteUpdated: state.MovieDetailsReducer.isFavouriteUpdated
  };
}

export default connect(mapStateToProps, {})(Favourites);