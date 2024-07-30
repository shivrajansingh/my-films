**Pagination Component Documentation**

### Overview

The Pagination component is a React functional component that generates pagination links based on the total results and current page number.

### Props

| Prop | Type | Description |
| --- | --- | --- |
| `totalResults` | `number` | The total number of results. |
| `searchText` | `string` | The search text (if applicable). |
| `type` | `string` | The type of pagination (e.g., "Search" or other). |

### Usage

```jsx
import Pagination from './Pagination';

function Example() {
  return (
    <div>
      <Pagination totalResults={100} searchText="search" type="Search" />
    </div>
  );
}
```

### Implementation

The Pagination component uses the `useLocation` hook from React Router to get the current URL and parse it into a query string. It then calculates the number of pages based on the results per page (10) and the total results.

#### Calculating Page Numbers

*   The `currentPage` is extracted from the query string using `URLSearchParams`.
*   The `startPage` and `endPage` are calculated to show only a certain number of page links (3 by default).
*   If the current page is close to the start or end, the page numbers are adjusted accordingly.

#### Generating Pagination Links

*   A function `scrollToTop` is defined to scroll to the top of the page when clicking on pagination links.
*   The pagination links are generated using a `map` function and array methods.
*   Each page link has an active class if it matches the current page number.

### Styles

The component uses Bootstrap classes for styling. The `.page-nav` class is used to center the pagination links, and the `.page-item`, `.page-link`, and `.active` classes are used for individual page items and links.

### Code Block
```jsx
import Image from '../common/Image';
import { Link, useLocation } from 'react-router-dom';

interface PaginationProps {
  totalResults: number;
  searchText: string;
  type: string;
}

export default function Pagination({ totalResults, searchText, type }: PaginationProps) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') ?? '1', 10);

  const resultsPerPage = 10; // Number of results per page
  const totalPages = Math.ceil(totalResults / resultsPerPage); // Total number of pages

  const maxVisiblePages = 3; // Maximum visible pages (by default)
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, currentPage - halfVisiblePages);
  let endPage = Math.min(totalPages, currentPage + halfVisiblePages);

  if (currentPage - halfVisiblePages < 1) {
    endPage = Math.min(totalPages, endPage + (halfVisiblePages - (currentPage - 1)));
  }

  if (currentPage + halfVisiblePages > totalPages) {
    startPage = Math.max(1, startPage - (halfVisiblePages - (totalPages - currentPage)));
  }

  let PAGINATION_LINK: string = ""; // Base link for pagination
  if (type === "Search") {
    PAGINATION_LINK = `/search?s=${searchText}`;
  } else {
    PAGINATION_LINK = "?";
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-nav text-center py-4">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li
            className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          >
            <Link
              className="page-link"
              to={`${PAGINATION_LINK}&page=${currentPage - 1}`}
              onClick={scrollToTop}
              aria-label="Previous"
            >
              <span aria-hidden="true">
                <Image src="/assets/images/CaretLeft-r.svg" />
              </span>
            </Link>
          </li>

          {startPage > 1 && (
            <>
              <li className="page-item">
                <Link
                  className="page-link"
                  to={`${PAGINATION_LINK}&page=1`}
                  onClick={scrollToTop}
                >
                  1
                </Link>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}

          {[...Array(endPage - startPage + 1)].map((_, index) => {
            const pageNumber = startPage + index;
            return (
              <li key={pageNumber} className="page-item">
                <Link
                  className={
                    currentPage === pageNumber ? "page-link active" : "page-link"
                  }
                  to={`${PAGINATION_LINK}&page=${pageNumber}`}
                  onClick={scrollToTop}
                >
                  {String(pageNumber).padStart(2, '0')}
                </Link>
              </li>
            );
          })}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <Link
                  className="page-link"
                  to={`${PAGINATION_LINK}&page=${totalPages}`}
                  onClick={scrollToTop}
                >
                  {totalPages}
                </Link>
              </li>
            </>
          )}

          <li
            className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}
          >
            <Link
              className="page-link"
              to={`${PAGINATION_LINK}&page=${currentPage + 1}`}
              onClick={scrollToTop}
              aria-label="Next"
            >
              <span aria-hidden="true">
                <Image src="/assets/images/CaretRight-r.svg" />
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
```