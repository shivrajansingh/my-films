import React, {  useEffect, useState, KeyboardEvent } from 'react'
import Image from '../components/common/Image'
import CategoryView from '../components/categoryView/CategoryView';
import { useLocation,useNavigate } from 'react-router-dom';
import { SEARCH_API} from '../utils/constants/APIUrls';
import { Get } from '../services/Service';
export default function Search() {

    const currentYear = new Date().getFullYear()+5;
    const [searchText, setSearchText] = useState("");
    const [year, setYear] = useState('');
    const [searchType, setSearchType] = useState("");
    const [yearError, setYearError] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState({title:"", description : ""});
    const [searchData, setSearchData] = useState([]);  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('s');
    const page = queryParams.get('page') ?? '1';
    const [totalResults, setTotalResults] = useState(1); 
    const navigate = useNavigate();

    useEffect(()=>{
        const search = async(searchQuery:string) =>{
            setLoading(true); 
            let url = SEARCH_API+"&s="+searchQuery+"&page="+page;
            let data = await Get(url); 
            if(data && data.hasOwnProperty('Search')){
            setSearchData(data.Search); 
            setTotalResults(parseInt(data.totalResults)); 
            }else{
                setError({ title : "No Result Found", description : "No Movies available with the key, try different keyword or movie name"})
            }
            setLoading(false); 
        }
        if(searchQuery){
            setSearchText(searchQuery);
            search(searchQuery); 
        }
    }, [searchQuery,page])

    const handleSearch = () =>{
        const search = async(searchQuery:string) =>{
            setLoading(true); 
            let url = SEARCH_API;
            if (searchQuery) {
            url += "&s=" + encodeURIComponent(searchQuery);
            }

            if (year) {
            url += "&y=" + encodeURIComponent(year);
            }

            if (searchType) {
            url += "&type=" + encodeURIComponent(searchType);
            }
            let data = await Get(url); 
            if(data && data.hasOwnProperty('Search')){
            setSearchData(data.Search); 
            setTotalResults(data.totalResults);
            setError({title: "", description:""})
            }else{
                setError({ title : "No Result Found", description : "No Movies available with the key, try different keyword or movie name"})
            }
            setLoading(false); 
        }
        search(searchText); 
    }

    const handleKeyDown = (event:KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        const numericValue = Number(value);
        if (value === '' || isNaN(numericValue)) {
            setYearError('Please enter a valid number.');
            setYear(''); 
            return;
        }

        if (numericValue >= 1900 && numericValue <= currentYear) {
            setYear(value);
            setYearError('');
        } else {
            setYearError(`Please enter a year between 1900 and ${currentYear}.`);
            setYear('')
        }
    };
    
    const handleReset = () =>{
        setSearchText("");
        setSearchType("");
        setYear("");
        var yearField = window.document.getElementById('year') as HTMLInputElement;
        yearField.value=""; 
        var searchText = window.document.getElementById('searchText') as HTMLInputElement;
        searchText.value=""; 
        setSearchData([]);
        navigate("/search"); 
    }

return (
<main>
    <div className="container">
    <section className="detail-view">
      <div className="row py-5">
        <div className="col-md-6 col-lg-3">
          <div className="search-bar-parent" id="frameContainer">
            <input className="search-bar" placeholder="Search here" onChange={(e:any)=>{
                setSearchText(e.target.value)
            }} onKeyDown={handleKeyDown} defaultValue={searchText} type="text" id="searchText"/>
            <Image className="magnifyingglass-r-icon" alt="search" src="/assets/images/magnifyingglassr.svg" />
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <select name="Select Type" id="Type" 
            className="search-bar-parent" 
            value={searchType}
            onChange={(e:any)=>{
            setSearchType(e.target.value)
          }}>
            <option value="">Please Select</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
            <option value="episode">Episode</option>
          </select>
        </div>
        <div className="col-md-6 col-lg-3">
        <input
        className="search-bar-parent"
        type="number"
        id="year"
        name="year"
        min="1900"
        max={currentYear}
        step="1"
        onChange={(e)=>handleYearChange(e)}
        onKeyDown={(e) => {
            if (!['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key) &&
                (e.key < '0' || e.key > '9')) {
                e.preventDefault();
            }
        }}
        placeholder="Enter Year"
        />
        {yearError && <p style={{ color: 'red' }}>{yearError}</p>}
        </div>
        <div className="col-md-6 col-lg-3">
          <button type="button" className="search-bar-parent reset-btn" onClick={handleReset}> <i className="fa fa-refresh" aria-hidden="true" /> Reset</button>
          <button type="button" className="search-bar-parent Search-btn" onClick={handleSearch}> <i className="fa fa-search" aria-hidden="true" /> Search</button>
        </div>
      </div>  
    </section>
    <CategoryView 
    title="Search Result" 
    data={searchData} 
    isLoading={isLoading} 
    error={error} 
    isViewType={false} 
    isPagination={true}
    totalResults={totalResults}
    searchText={searchText}
    type="search"
    />
    </div>
</main>
)
}
