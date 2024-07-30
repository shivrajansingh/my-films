import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Image from '../../components/common/Image';
import WatchlistItem from '../../components/watchlist/WatchlistItem';
import { chunkArray } from '../../utils/helper/helper';
import Loader from '../../components/common/Loader';
import Error from '../../components/common/Error';
import { watchlist_tables } from '../../utils/constants/tables';
import { fetchWatchlists } from '../../services/WatchlistService';
interface WatchlistProps {
  watchlists: Array<Record<string, any>>;
}

function Title(){
  return (
    <div className="col-md-6 col-6">
            <h1 className="category-title">Watchlists</h1>
    </div>
  )
}

function NewWatchListButton(){
  return (
    <div className="col-md-6 col-6">
            <div className="view-content new-watchlist-btn">
              <button
                type="button"
                data-bs-toggle="modal" data-bs-target="#new-watchlist" 
              >
                <Image src="/assets/images/MonitorPlay-f-2.svg" style={{ padding: '0 0 4px 0' }} /> Create New Watchlist
              </button>
            </div>
            </div>
  )
}

function Watchlist(props: WatchlistProps) {
  const { watchlists } = props; 
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { wl_lists } = watchlist_tables; 

  useEffect(() => {
    const fetchData = async()=>{
      setIsLoading(true); 
      let watchlistData = await fetchWatchlists(); 
      watchlistData = watchlistData && chunkArray(watchlistData, 5); 
      watchlistData && watchlistData.length > 0 && setData(watchlistData); 
      setIsLoading(false);
    }
    fetchData(); 
  }, []);


  useEffect(() => {
    fetchWatchlists()
      .then((data) => {
        let watchlistData = data && chunkArray(data, 5); 
        watchlistData && watchlistData.length > 0 && setData(watchlistData); 
        setData(watchlistData);
      });
  }, [watchlists, wl_lists]);


  
  return (
    <main>
      <div className="container pb-5">
        <div className="row pt-5 mb-4">
          <Title />
          <NewWatchListButton />
          {
            isLoading ? <Loader/> :
            data.length === 0 ? <Error title='No Watchlist Found' description='No Watchlist found, Please create a new Watchlist' /> :
            data && data.length > 0 && data.map((value:any, key:any)=>
              <div className="row" key={key}>
                {
                  value && value.length > 0 && value.map((val:any,k:any)=>
                    <WatchlistItem details={val}  key={k} type="watchlist"/>
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
    watchlists: state.WatchlistReducer.watchlists,
  };
}

export default connect(mapStateToProps)(Watchlist);
