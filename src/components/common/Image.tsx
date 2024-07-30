import { FC, HTMLAttributes, useState, useEffect } from 'react';
import { mergeImages } from '../../utils/helper/MergeImages';

interface ImageProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  watchlist?:any
}

const Image: FC<ImageProps> = ({ src, alt="",watchlist=[], ...rest }) =>{
    const [imageSrc, setImageSrc] = useState(src); 
  
    useEffect(()=>{

      const setFeaturedImage = (src:string)=>{
        setImageSrc((src === 'N/A') ? "/assets/images/default.jpg" : src); 
      }
      const fetchWatchlistImage = async()=>{
        let newSrc; 
        if(watchlist && watchlist.length > 0){
          try{
            newSrc = await mergeImages(watchlist);
            if(newSrc){
              setImageSrc(newSrc); 
            }else{ setFeaturedImage(src) } 
          }catch(err){
            console.log(err);
            setFeaturedImage(src);
          }
        }else{
          setFeaturedImage(src);
        }
      }
      fetchWatchlistImage(); 
    }, [watchlist, src])

    return (
    <img src={imageSrc} alt={alt} loading="lazy" {...rest}/>
  )
}

export default Image; 

