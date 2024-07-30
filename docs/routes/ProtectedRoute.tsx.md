**Protected Route Component Documentation**
==============================================

### Overview

The `ProtectedRoute` component is a React functional component that conditionally renders an outlet or redirects the user to an offline page based on their online status.

### Props

#### `isOnline`: boolean

* Type: `boolean`
* Description: A flag indicating whether the user is currently online or not.
* Required: Yes
* Default Value: N/A

### Usage

To use the `ProtectedRoute` component, import it in your React app and pass the `isOnline` prop with a value of `true` or `false`.

```jsx
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <ProtectedRoute isOnline={Boolean(window.navigator.onLine)}>
      {/* Outlet content */}
      <Outlet />
    </ProtectedRoute>
  );
};
```

### Implementation

The `ProtectedRoute` component uses the following dependencies:

#### `React`: ^17.0.2

* The official React library.

```jsx
import React from 'react';
```

#### `react-router-dom`: ^5.1.2

* A popular React library for client-side routing.
* Imports the following components:
	+ `Navigate`: A component that redirects to a new location.
	+ `Outlet`: A component that renders the outlet content when protected.
	+ `useLocation`: A hook that returns the current location.

```jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
```

### Component Logic

The `ProtectedRoute` component follows this logic:

1. Checks if the user is online by verifying the value of the `isOnline` prop.
2. If the user is online (`true`), renders the outlet content using `<Outlet />`.
3. If the user is offline (`false`), redirects them to the `/offline` page with a state object containing the current location's pathname.

```jsx
const ProtectedRoute = ({ isOnline }) => {
  const location = useLocation();
  return isOnline ? <Outlet /> : <Navigate to="/offline" state={{ from: location.pathname }} />;
};
```

### Example Use Cases

1. **Protected Content**: Render sensitive content only when the user is online.
```jsx
<ProtectedRoute isOnline={Boolean(window.navigator.onLine)}>
  {/* Protected content */}
  <h1>Welcome, you're online!</h1>
</ProtectedRoute>
```
2. **Offline Redirect**: Redirect users to an offline page if they try to access sensitive content while offline.
```jsx
<ProtectedRoute isOnline={Boolean(window.navigator.onLine)}>
  {/* Outlet content */}
  <Outlet />
</ProtectedRoute>

// In offline.js file
const Offline = () => {
  return (
    <div>
      <h1>Offline Mode</h1>
      <p>You're currently offline. Please try again when you're online.</p>
    </div>
  );
};
```
Note: This documentation is a comprehensive guide to the `ProtectedRoute` component, including its usage, implementation, and example use cases. The code block explanations provide additional context for each section.