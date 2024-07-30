**Public Routes Documentation**
=====================================

### Overview
------------

The `PublicRoutes` component is a React functional component that defines the public routes for a web application. It uses the `react-router-dom` library to handle client-side routing.

### Import Statements
----------------------

```jsx
import { Route, Routes } from 'react-router-dom';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import TermsCondition from '../pages/legal/TermsConditions';
import PublicLayout from '../components/layout/PublicLayout';
```

*   The first two import statements bring in the `Route` and `Routes` components from the `react-router-dom` library.
*   The next two import statements import the `PrivacyPolicy` and `TermsCondition` components, which are custom pages for displaying the application's privacy policy and terms of condition, respectively.
*   The final import statement brings in the `PublicLayout` component, which serves as a wrapper for the public routes.

### PublicRoutes Component
---------------------------

```jsx
export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicLayout />}>
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-condition" element={<TermsCondition />} />
      </Route>
    </Routes>
  );
}
```

*   The `PublicRoutes` component is a functional component that returns a `Routes` component from the `react-router-dom` library.
*   Inside the `Routes` component, there is a single `Route` component with a path of `/`. This route serves as a wrapper for all public routes and renders the `PublicLayout` component as its element.
*   Within the wrapped route, there are two additional `Route` components that define specific public routes:
    *   The first `Route` component has a path of `/privacy-policy` and renders the `PrivacyPolicy` component as its element.
    *   The second `Route` component has a path of `/terms-condition` and renders the `TermsCondition` component as its element.

### Usage
-----

To use this code, simply import the `PublicRoutes` component into your application's main file (usually `App.js`) and render it inside the `BrowserRouter` component:

```jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';

function App() {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  );
}

export default App;
```

This will enable client-side routing for the application and render the public routes defined in the `PublicRoutes` component.