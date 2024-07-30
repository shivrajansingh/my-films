import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import WatchlistItem from '../../components/watchlist/WatchlistItem';
import { chunkArray } from '../../utils/helper/helper';
import Loader from '../../components/common/Loader';
import Error from '../../components/common/Error';
import {  getPublicWatchlists } from '../../services/WatchlistService';
interface WatchlistProps {
}

function Title(){
  return (
    <div className="col-md-6 col-6">
            <h1 className="category-title">Trending Watchlists</h1>
    </div>
  )
}



function TrendingWatchlist(props: WatchlistProps) {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async()=>{
      setIsLoading(true); 
      let watchlistData = await getPublicWatchlists(); 
      watchlistData = watchlistData && chunkArray(watchlistData, 5); 
      watchlistData && watchlistData.length > 0 && setData(watchlistData); 
      setIsLoading(false);
    }
    fetchData(); 
  }, []);
  
  return (
    <main>
      <div className="container pb-5">
        <div className="row pt-5 mb-4">
          <Title />
          {
            isLoading ? <Loader/> :
            data.length === 0 ? <Error title='No Watchlist Found' description='No Watchlist found, Please create a new Watchlist' /> :
            data && data.length > 0 && data.map((value:any, key:any)=>
              <div className="row" key={key}>
                {
                  value && value.length > 0 && value.map((val:any,k:any)=>
                    <WatchlistItem details={val}  key={k} type="public"/>
                  )
                }
              </div>
            )
          }
        </div>
      </div>
    </main>
  );
}

function mapStateToProps(state: Record<string, any>) {
  return {
  };
}

export default connect(mapStateToProps)(TrendingWatchlist);
