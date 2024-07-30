**Scroll To Top Component Documentation**
=============================================

### Overview

The `ScrollToTop` component is a React hook that enables scrolling to the top of the page when the user navigates between routes using the `react-router-dom` library.

### Code Block
```jsx
import React, { useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  children: ReactNode;
}

const ScrollToTop: React.FC<ScrollToTopProps> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => window.scrollTo(0, 0);
    handleScroll();
  }, [location.key]);

  return <>{children}</>;
};

export default ScrollToTop;
```

### Explanation

#### Importing Dependencies

The code imports the necessary dependencies:

* `React` and its hooks (`useEffect`, `ReactNode`) from the `react` library.
* The `useLocation` hook from the `react-router-dom` library, which provides information about the current location.

#### Interface Definition

The code defines an interface `ScrollToTopProps` to specify the props expected by the component. In this case, it's a single prop `children`, which is of type `ReactNode`.

#### Component Definition

The `ScrollToTop` component is defined as a functional component (`React.FC`) that takes in the `children` prop.

#### Using Location Hook

The code uses the `useLocation` hook to get the current location object. This hook returns an object with information about the current location, including its key (i.e., the URL parameter).

#### Effect Hook

The code uses the `useEffect` hook to run a function whenever the location's key changes. The function is defined as `handleScroll`, which simply scrolls the window to the top by calling `window.scrollTo(0, 0)`.

#### Returning Children

Finally, the component returns its children (i.e., any JSX elements passed as props) wrapped in an empty element (`<>{children}</>`).

### Usage

To use this component, you can wrap it around your app or specific routes to enable scrolling to the top when navigating between them. For example:
```jsx
import React from 'react';
import ScrollToTop from './ScrollToTop';

const App = () => {
  return (
    <div>
      <ScrollToTop>
        <Router>
          <Routes>
            {/* Route components here */}
          </Routes>
        </Router>
      </ScrollToTop>
    </div>
  );
};
```
By wrapping the `ScrollToTop` component around your app or specific routes, you'll enable scrolling to the top whenever the user navigates between them.