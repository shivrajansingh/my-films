import React, { FC, useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Loader from '../common/Loader';
import Error from '../common/Error';
import WatchlistItem from './WatchlistItem';
import Image from '../common/Image';
import { Link } from 'react-router-dom';
interface WatchlistViewProps {
  data?:any;
  title?: string;
  isCarousel? : boolean; 
  isLoading? : boolean;
  error? : { title : string, description : string };
  type? : string; 
  isPublic? : boolean
}

const WatchlistView: FC<WatchlistViewProps> = ({ 
  data=[], 
  title=null, 
  isLoading=false, 
  error={title : "", description: ""}, 
  type="watchlist",
  isPublic=false,
  isCarousel=false,
}) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const [viewAllLink, setViewAllLink] = useState("");
  useEffect(()=>{ 
    if(type === 'favourite'){
      setViewAllLink("/favourite");
    }else if(type === 'watchlist'){
      setViewAllLink("/watchlist");
    }
    else if(type==='public'){
      setViewAllLink("/watchlist/trending-watchlist");
    }
  }, [type])
  
  return (
    <section className="container pb-5">
      {
        title === null ? "" :  
        <div className="row pt-3 mb-4">
          <div className="col-md-6 col-6">
            <h1 className="category-title">
            {title} 
            
            </h1>
          </div>
          <div className="col-md-6 col-6">
          <div className="watchlist-content">
          {
              isCarousel && viewAllLink !== '' ?  <><Link to={viewAllLink}><div className="view-all1">View All</div>
              <Image className="arrowcircleright-f-icon1" src="/assets/images/arrowcirclerightf.svg" /> </Link></> : ""
            }
          </div>
        </div>

        </div>
      }
      {
        isLoading ? <Loader/> : 
        error?.title ? <Error title={error.title} description={error?.description || "Something went wrong"}/> :
        !error?.title && data.length === 0 ? <Error title="No Watchlist Found"/> :
      <>
      
      <div className="row">
        <Carousel responsive={responsive}>
            {
            data && data.length > 0 && data.map((value:any, key:string)=>
                <WatchlistItem 
                key={key}
                details={value}
                type={type}
                />
            )
        }
            </Carousel>
    </div> 
    </>
    }
    </section>
)

}

export default WatchlistView; 