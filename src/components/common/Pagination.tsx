import Image from '../common/Image';
import { Link, useLocation } from 'react-router-dom';

interface PaginationProps {
    totalResults: number;
    searchText:string;
    type:string;
  }
  
export default function Pagination({ totalResults, searchText, type }: PaginationProps) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page') ?? '1', 10);
  
    const resultsPerPage = 10; 
    const totalPages = Math.ceil(totalResults / resultsPerPage);
  
    const maxVisiblePages = 2;
    const halfVisiblePages = Math.floor(maxVisiblePages / 2);
  
    let startPage = Math.max(1, currentPage - halfVisiblePages);
    let endPage = Math.min(totalPages, currentPage + halfVisiblePages);
  
    if (currentPage - halfVisiblePages < 1) {
      endPage = Math.min(totalPages, endPage + (halfVisiblePages - (currentPage - 1)));
    }
  
    if (currentPage + halfVisiblePages > totalPages) {
      startPage = Math.max(1, startPage - (halfVisiblePages - (totalPages - currentPage)));
    }
    let PAGINATION_LINK:string = ""; 
    if(type === "search"){
      PAGINATION_LINK = `/search?s=${searchText}`
    }else {
      PAGINATION_LINK = `?`
    }
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };

    return (
      <div className="page-nav text-center py-4">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <Link className="page-link" to={`${PAGINATION_LINK}&page=${currentPage - 1}`}  onClick={scrollToTop} aria-label="Previous">
                <span aria-hidden="true"><Image src="/assets/images/CaretLeft-r.svg" /></span>
              </Link>
            </li>
            {startPage > 1 && (
              <>
                <li className="page-item">
                  <Link className="page-link" to={`${PAGINATION_LINK}&page=1`}  onClick={scrollToTop} >1</Link>
                </li>
                {startPage > 2 && <li className="page-item disabled"><span className="page-link">...</span></li>}
              </>
            )}
            {[...Array(endPage - startPage + 1)].map((_, index) => {
              const pageNumber = startPage + index;
              return (
                <li key={pageNumber} className="page-item">
                  <Link className={currentPage === pageNumber ? "page-link active" : "page-link"} to={`${PAGINATION_LINK}&page=${pageNumber}`}  onClick={scrollToTop}>
                    {String(pageNumber).padStart(2, '0')}
                  </Link>
                </li>
              );
            })}
            {endPage < totalPages && (
              <>
                {endPage < totalPages - 1 && <li className="page-item disabled"><span className="page-link">...</span></li>}
                <li className="page-item">
                  <Link className="page-link" to={`${PAGINATION_LINK}&page=${totalPages}`}  onClick={scrollToTop}>{totalPages}</Link>
                </li>
              </>
            )}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <Link className="page-link" to={`${PAGINATION_LINK}&page=${currentPage + 1}`} aria-label="Next"  onClick={scrollToTop}>
                <span aria-hidden="true"><Image src="/assets/images/CaretRight-r.svg" /></span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }