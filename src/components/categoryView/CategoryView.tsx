import React, { FC, useEffect, useState } from 'react'
import ColGridItems from './ColGridItems';
import ColListItems from './ColListItems';
import ViewType from '../ViewType'; 
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Loader from '../common/Loader';
import Error from '../common/Error';
import { chunkArray } from '../../utils/helper/helper';
import Image from '../common/Image';
import Pagination from '../common/Pagination';
import { Link } from 'react-router-dom';


interface CategoryViewProps {
  data?:any;
  title?: string;
  isViewType? : boolean;
  isCarousel? : boolean; 
  isLoading? : boolean;
  isBackButton? : boolean;
  error? : { title : string, description : string };
  type? : string; 
  isPagination?:boolean;
  totalResults?:number;
  searchText?:string;
}

const CategoryView: FC<CategoryViewProps> = ({ 
  data=[], 
  title=null, 
  isViewType=false, 
  isCarousel=false, 
  isLoading=false, 
  error={title : "", description: ""}, 
  isBackButton=false, 
  type="favourite",
  isPagination=false,
  totalResults=1,
  searchText=""
}) => {
  const [viewType, setViewType] = useState("grid"); 
  const [viewAllLink, setViewAllLink] = useState("");
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

  const chunkedData = chunkArray(data, 5);
  return (
    <section className="container pb-5">
      {
        title === null ? "" :  
        <div className="row pt-3 mb-4">
          <div className="col-md-6 col-6">
            <h1 className="category-title">
            { isBackButton ? <Image src="/assets/images/ArrowCircleLeft-r.svg" alt="Back Button" onClick={()=>window.history.back()}/> : "" }
            {title === null ? "" : " "+title}
            </h1>

          </div>
          
         <div className="col-md-6 col-6">
          <div className="watchlist-content">
            {
              isCarousel && viewAllLink !== '' ?  <><Link to={viewAllLink}><div className="view-all1">View All</div>
              <Image className="arrowcircleright-f-icon1" src="/assets/images/arrowcirclerightf.svg" /> </Link></> : ""
            }
          </div>
          {
            isViewType ? <ViewType onChangeViewType={(type)=>setViewType(type)} type={type} title={title}/> : ""
            }
        </div>


          
         
        </div>
      }
      {
        isLoading ? <Loader/> : 
        error?.title ? <Error title={error.title} description={error?.description || "Something went wrong"}/> :
        !error?.title && data.length === 0 ? <Error title="No Movies Found"/> :
      <>
      {(viewType === 'grid') ? 
      <div className="row">
        {
          isCarousel ? <Carousel responsive={responsive} className='slider' infinite={true}>
            {
              data && data.length > 0 && data.map((value:any, key:string)=>
                  <ColGridItems 
                  key={key}
                  posterSrc={value.Poster} 
                  title={value.Title} 
                  year={value.Year} 
                  duration={value.Runtime} 
                  imdbRating={value.Ratings?.[0]?.Value || "N/A"} 
                  details={value}
                  type={type}
                  />
              )
            }
            </Carousel>
       : 
       chunkedData && chunkedData.map((chunk, rowIndex) => (
        <div className="row" key={rowIndex}>
          {chunk.map((value:any, colIndex) => (
            <ColGridItems
              key={colIndex}
              posterSrc={value.Poster}
              title={value.Title}
              year={value.Year}
              duration={value.Runtime}
              imdbRating={value.Ratings?.[0]?.Value || "N/A"}
              details={value}
              type={type}
            />
          ))}
        </div>
      ))
        }
      </div> : 
      <div className='row'>
        {
          data && data.length > 0 && data.map((value:any, key:any)=>
            <ColListItems 
          key={key}
          posterSrc={value.Poster} 
          title={value.Title} 
          year={value.Year} 
          duration={value.Runtime} 
          imdbRating={value.Ratings?.[0]?.Value || "N/A"} 
          details={value}
          type={type}
            />
          ) 
        }
      </div>
      }
      {
        isPagination ? <Pagination totalResults={totalResults} searchText={searchText} type={type}/> : "" 
      }
      </>
     }
      
    </section>
  )

}

export default CategoryView; 