**Category View Component Documentation**
=============================================

### Overview
---------------

The `CategoryView` component is a reusable React component that displays a list of movie or TV show items in a grid or list format. It supports pagination and allows users to switch between different views (grid vs list).

### Props
-----

The component accepts the following props:

#### Required Props

*   **data**: An array of movie or TV show objects, each containing properties such as `Poster`, `Title`, `Year`, `Runtime`, `Ratings`, etc.
*   **title**: A string representing the title to be displayed above the list.

#### Optional Props

*   **isViewType**: A boolean indicating whether to display a view type switcher (grid/list toggle).
*   **isCarousel**: A boolean indicating whether to render the items in a carousel format.
*   **isLoading**: A boolean indicating whether data is being loaded.
*   **error**: An object containing error information, including `title` and `description`.
*   **isBackButton**: A boolean indicating whether to display a back button.
*   **type**: A string representing the type of list (e.g., "favourite", "watchlist", etc.).
*   **isPagination**: A boolean indicating whether to render pagination controls.
*   **totalResults**: The total number of results available.
*   **searchText**: The search text entered by the user.

### State
-----

The component uses two state variables:

*   **viewType**: A string representing the current view type (grid or list).
*   **viewAllLink**: A string representing the URL to link to when clicking on "View All".

### Code Block with Explanations
--------------------------------

```jsx
import React, { FC, useEffect, useState } from 'react';
import ColGridItems from './ColGridtems';
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
    
    // Define the carousel responsive settings
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
    
    // Use effect hook to update viewAllLink based on type prop
    useEffect(()=>{
        if(type === 'favourite'){
            setViewAllLink("/favourite");
        }else if(type === 'watchlist'){
            setViewAllLink("/watchlist");
        }
    }, [type]);
    
    // Render the category view component
    return (
        <div>
            {/* Display title */}
            {title && 
                <h2>{title}</h2>
            }
            
            {/* Display loading indicator if data is being loaded */}
            {isLoading && 
                <Loader />
            }
            
            {/* Display error message if an error occurs */}
            {error.title && 
                <Error title={error.title} description={error.description} />
            }
            
            {/* Display back button if required */}
            {isBackButton && 
                <button>Back</button>
            }
            
            {/* Render carousel or list view based on viewType and isCarousel props */}
            {(viewType === "grid" || viewType === "carousel") && (
                !isLoading && !error.title ? (
                    <div className="grid-view">
                        {/* If isCarousel prop is true, render carousel component with responsive settings */}
                        {isCarousel && (
                            <Carousel
                                responsive={responsive}
                                itemClass="carousel-item"
                                infiniteLoop={true}
                            >
                                {/* Render ColGridItems component for each data item */}
                                {data.map((item, index) => (
                                    <ColGridItems key={index} item={item} />
                                ))}
                            </Carousel>
                        ) : (
                            /* If isCarousel prop is false, render list view with ColListItems component for each data item */
                            data.map((item, index) => (
                                <ColListItems key={index} item={item} />
                            ))
                        )}
                    </div>
                ) : 
                ""
            )}
            
            {/* Render pagination controls if required */}
            {isPagination && 
                <Pagination totalResults={totalResults} searchText={searchText} type={type} />
            }
        </div>
    );
}
```

### Usage
-----

To use the `CategoryView` component, simply import it into your React app and pass in the required props. You can also customize its behavior by passing in optional props.

```jsx
import React from 'react';
import CategoryView from './CategoryView';

const App = () => {
    const data = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Doe" },
        // ...
    ];

    return (
        <div>
            <CategoryView
                data={data}
                title="My Category"
                isViewType={true}
                isCarousel={false}
                isLoading={false}
                error={{ title: "", description: "" }}
                isBackButton={true}
                type="favourite"
                isPagination={true}
                totalResults={100}
                searchText=""
            />
        </div>
    );
};
```

### Tips and Variations
------------------------

*   To customize the look and feel of the component, you can modify the CSS styles used in the `CategoryView` component.
*   If you need to render a large number of items, consider using a more efficient data rendering library or framework.
*   You can also add additional features such as filtering, sorting, and editing capabilities to the component.