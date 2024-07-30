
import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import CategoryView from '../../components/categoryView/CategoryView';
import { fetchWatchlistMoviesByID } from '../../services/WatchlistService';
import { connect } from 'react-redux'; 
interface WatchlistPublicProps{
}
function WatchlistPublic(props:WatchlistPublicProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Array<Record<string, any>>>([]);
    const [title, setTitle] = useState(""); 
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') ?? '1';
    const [totalResults, setTotalResults] = useState(1); 
    const RESULTS_PER_PAGE = 10;
    const { id } = useParams();

    useEffect(()=>{
    const fetchData = async()=>{
        setIsLoading(true); 
        if(id){
            let { title, movies } = await fetchWatchlistMoviesByID(id); 
            setTitle(title);
            if(movies && movies.length> 0){
                setTotalResults(movies.length);
                const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
                const end = start + RESULTS_PER_PAGE;
                let paginationData = movies.slice(start,end); 
                setData(paginationData);
            }
        }else{
            setTitle("Error : Invalid Watchlist"); 
        }
        setIsLoading(false)
    }
    fetchData(); 
    }, [id, page])

    
    return (
    <main>
    <CategoryView 
    title={title} 
    data={data} 
    isViewType={true} 
    isBackButton={true} 
    isLoading={isLoading}
    type="publicWatchlist"
    isPagination={true}
    totalResults={totalResults}
    />
    </main>
    )
}

function mapStateToProps(state:Record<string, any>){
    return {}
}

export default connect(mapStateToProps, {})(WatchlistPublic); 