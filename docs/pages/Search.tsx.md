**Search Page Component**
=========================

This is the main search page component written in React, responsible for handling user input and displaying search results.

### Importing Dependencies
---------------------------

```
import React, { useEffect, useState } from 'react';
import Image from '../components/common/Image';
import CategoryView from '../components/categoryView/CategoryView';
import { useLocation, useNavigate } from 'react-router-dom';
import { SEARCH_API } from '../utils/constants/APIUrls';
import { Get } from '../services/service';
```

*   Import necessary dependencies:
    *   `React` for building the UI component
    *   `Image` and `CategoryView` components from other files
    *   `useLocation` and `useNavigate` hooks from `react-router-dom`
    *   API URL constants from `SEARCH_API`
    *   Service functions from `Get`

### Defining the Search Page Component
--------------------------------------

```
export default function Search() {
    // ...
}
```

*   Define a new React component called `Search`.

### Handling Search Query Parameters
------------------------------------

```
const location = useLocation();
const queryParams = new URLSearchParams(location.search);
const searchQuery = queryParams.get('s');
const page = queryParams.get('page') ?? '1';
```

*   Use the `useLocation` hook to get the current URL and extract query parameters using `URLSearchParams`.
*   Get the search query value from the URL parameters.
*   Get the page number value from the URL parameters, defaulting to 1 if not provided.

### Initializing State Variables
-------------------------------

```
const [searchText, setSearchText] = useState("");
const [year, setYear] = useState('');
const [searchType, setSearchType] = useState("");
const [yearError, setYearError] = useState('');
const [isLoading, setLoading] = useState(false);
const [error, setError] = useState({ title: "", description: "" });
const [searchData, setSearchData] = useState([]);  
```

*   Initialize state variables using the `useState` hook:
    *   `searchText`: The search query input by the user
    *   `year`: The year filter value
    *   `searchType`: The type filter value (e.g., movie, series, episode)
    *   `yearError`: An error message for invalid year inputs
    *   `isLoading`: A flag indicating whether data is being loaded
    *   `error`: An object containing an error title and description
    *   `searchData`: The search result data

### Handling Search Input Changes
-------------------------------

```
const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
        setYearError('Invalid year. Please enter a value between 1900 and ' + currentYear);
        setYear('');
    }
}
```

*   Define event handlers for search input changes:
    *   `handleKeyDown`: Trigger the `handleSearch` function when the Enter key is pressed
    *   `handleYearChange`: Update the year filter value based on user input, validating the value as a number and ensuring it's within the correct range

### Handling Search Button Clicks
-------------------------------

```
const handleSearch = () => {
    // ...
}

const handleReset = () => {
    // ...
}
```

*   Define event handlers for search button clicks:
    *   `handleSearch`: Handle the search query submission, calling the API service to retrieve data and updating the component state accordingly
    *   `handleReset`: Reset the search input fields and filter values

### Rendering the Search Page UI
------------------------------

```
return (
    <main>
        {/* ... */}
    </main>
)
```

*   Render the search page UI using JSX, including:
    *   Input fields for user queries and filters
    *   Button to submit the search query or reset input values
    *   A container to display search results (using the `CategoryView` component)

This documentation provides an overview of the code structure and functionality. Each section is designed to be self-contained, making it easy to navigate and understand the logic behind the Search page component.