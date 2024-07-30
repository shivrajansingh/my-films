
import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import CategoryView from '../../components/categoryView/CategoryView';
import { fetchWatchlistMoviesBySlug } from '../../services/WatchlistService';
import { connect } from 'react-redux'; 

interface GenreProps{
    deleteRequest : Record<string, any>;
}
function Genre(props:GenreProps) {
    const { slug } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<Array<Record<string, any>>>([]);
    const { deleteRequest } = props; 

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const page = queryParams.get('page') ?? '1';
    const [totalResults, setTotalResults] = useState(1); 
    const RESULTS_PER_PAGE = 10;

    useEffect(()=>{
    const fetchData = async()=>{
        setIsLoading(true); 
        if(slug){
            let data = await fetchWatchlistMoviesBySlug(slug); 
            if(data && data.length> 0){
                setTotalResults(data.length); 
                const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
                const end = start + RESULTS_PER_PAGE;
                let paginationData = data.slice(start,end); 
                setData(paginationData);
            }
        }
        setIsLoading(false)
    }
    fetchData(); 
    }, [slug, page])

    useEffect(()=>{
        if(deleteRequest && deleteRequest.hasOwnProperty("isDeleted") && deleteRequest.isDeleted && deleteRequest.type === 'watchlistMovie' ){
            const fetchData = async()=>{
                setIsLoading(true); 
                if(slug){
                    let data = await fetchWatchlistMoviesBySlug(slug); 
                    if(data && data.length> 0){
                        setTotalResults(data.length); 
                        const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
                        const end = start + RESULTS_PER_PAGE;
                        let paginationData = data.slice(start,end); 
                        setData(paginationData);
                        setIsLoading(false); 
                    }
                }
                setIsLoading(false)
            }
            fetchData(); 
        }
    }, [deleteRequest, slug, page])

    return (
    <main>
    <CategoryView 
    title={slug} 
    data={data} 
    isViewType={true} 
    isBackButton={true} 
    isLoading={isLoading}
    type="watchlistMovie"
    isPagination={true}
    totalResults={totalResults}
    />
    </main>
    )
}

function mapStateToProps(state:Record<string, any>){
    return { 
        deleteRequest : state.MovieDetailsReducer.deleteRequest
    }
}

export default connect(mapStateToProps, {})(Genre); 