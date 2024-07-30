**My Account Component Documentation**
======================================

### Overview
-----------

The `MyAccount` component is a React functional component that displays and manages user account information.

### Import Statements
---------------------

```jsx
import React, { useEffect, useState } from 'react';
import Image from '../components/common/Image';
```

*   `React`, `useEffect`, and `useState` are imported from the `react` library.
*   The `Image` component is imported from a custom module.

### Component Definition
------------------------

```jsx
export default function MyAccount() {
    ...
}
```

The `MyAccount` component is defined as a functional component using the `function` keyword. It exports the component as the default export, making it available for use in other parts of the application.

### State Variables and Hooks
-----------------------------

```jsx
const [user, setUser] = useState<Record<string, any>>({});
const [editing, setEditing] = useState(false);
const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    phoneNumber: '',
    photoURL: '',
});
```

*   The component uses three state variables:
    *   `user`: an object that stores user data.
    *   `editing`: a boolean flag indicating whether the user is in edit mode or not.
    *   `formData`: an object that stores form data when the user is editing their account.
*   The `useState` hook is used to initialize and update these state variables.

### useEffect Hook
-----------------

```jsx
useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setFormData({
            displayName: userData.displayName,
            email: userData.email,
            phoneNumber: userData.phoneNumber ?? '',
            photoURL: userData.photoURL ?? '',
        });
    }
}, []);
```

*   The `useEffect` hook is used to fetch and initialize user data from local storage when the component mounts.
*   If a stored user object exists, it is parsed as JSON and assigned to the `user` state variable.
*   Additionally, the `formData` state variable is updated with the user's display name, email, phone number, and photo URL.

### Event Handlers
-------------------

```jsx
const handleEditClick = () => {
    setEditing(true);
};

const handleCancelClick = () => {
    setEditing(false);
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value,
    }));
};

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setUser(formData);
    localStorage.setItem('user', JSON.stringify(formData));
    setEditing(false);
};
```

*   Four event handlers are defined to manage user interactions:
    *   `handleEditClick`: toggles the `editing` state variable when the "Edit Profile" button is clicked.
    *   `handleCancelClick`: resets the `editing` state variable and cancels any pending form submissions.
    *   `handleChange`: updates the `formData` state variable with new values when a form input changes.
    *   `handleSubmit`: submits the form data, updates the user object in local storage, and toggles the `editing` state variable.

### JSX Rendering
-----------------

```jsx
return (
    <main className="login-form">
        ...
    </main>
);
```

*   The component returns a JSX element that represents the my account page.
*   The main content area is defined as a `<main>` element with classes for styling.