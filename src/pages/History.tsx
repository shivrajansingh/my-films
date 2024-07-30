import React, { useEffect, useState } from 'react'
import CategoryView from '../components/categoryView/CategoryView'
import { getAll } from 'idbkeyvalue'
import { useLocation } from 'react-router-dom';


export default function History() {
  const [data, setData] = useState<any[]>([]); 

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get('page') ?? '1';
  const [totalResults, setTotalResults] = useState(1); 
  const RESULTS_PER_PAGE = 10;
  
  useEffect(()=>{
    getAll("histories")
    .then((data)=>{
      setTotalResults(data.length); 
      const start = (parseInt(page) - 1) * RESULTS_PER_PAGE;
      const end = start + RESULTS_PER_PAGE;
      let paginationData = data.slice(start,end); 
      setData(paginationData);
    })
  }, [page])

  return (
    <main>
    <div className='container'>
    <CategoryView title="History" data={data} isViewType={true} type="history"
    isPagination={true}
    totalResults={totalResults}
    />
    </div>
    </main>
  )
}
