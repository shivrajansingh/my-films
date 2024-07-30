**PublicLayout Component Documentation**
==============================================

### Overview

The `PublicLayout` component is a React functional component that serves as a wrapper for public-facing routes in an application built using the React Router library.

### Import Statements
--------------------

```jsx
import { Outlet } from "react-router-dom";
import AuthHeader from "./template/AuthHeader";
import AuthFooter from "./template/AuthFooter";
import ScrollToTop from "../common/ScrollToTop";
```

*   **`Outlet`**: This is a hook provided by the React Router library, which allows you to render routes defined in the `routes.js` file.
*   **`AuthHeader` and `AuthFooter`**: These are custom components that display authentication-related headers and footers for public-facing routes.
*   **`ScrollToTop`**: This is a utility component that scrolls the page to the top when rendered.

### PublicLayout Component
-------------------------

```jsx
export default function PublicLayout() {
  return (
    <>
      <ScrollToTop>
        <AuthHeader />
        <Outlet />
        <AuthFooter />
      </ScrollToTop>
    </>
  );
}
```

*   **`PublicLayout`**: This is the main functional component that wraps public-facing routes.
*   The component uses the `Outlet` hook to render child routes defined in the `routes.js` file.
*   It includes an instance of the `AuthHeader` and `AuthFooter` components to display authentication-related headers and footers.
*   The entire component is wrapped within a `<ScrollToTop>` utility component to ensure smooth scrolling.

### Usage
---------

To use this layout component, you would typically create a new route in your `routes.js` file that points to the `PublicLayout` component:

```jsx
import PublicLayout from './components/PublicLayout';

const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      // Define public-facing child routes here
    ],
  },
];
```

This allows you to structure your application with a clear separation of concerns, keeping authentication-related components separate from the main layout.