**Error Component Documentation**
=====================================

**Overview**
------------

The `Error` component is a React functional component designed to display error messages in a visually appealing and consistent manner.

**Code Block**
---------------

```jsx
import React from 'react';

interface ErrorProps {
  title?: string;
  description?: string;
}

const Error: React.FC<ErrorProps> = ({ title, description }) => {
  return (
    <div className="container mt-3">
      <div className="alert alert-danger bg-dark text-light" style={{borderColor : "red"}}>
        {title && <h4 className="alert-heading">{title}</h4>}
        {description && <p className="mb-0">{description}</p>}
      </div>
    </div>
  );
};

export default Error;
```

**Component Props**
-------------------

The `Error` component accepts two optional props:

* **title**: A string representing the error title.
* **description**: A string representing the error description.

Both `title` and `description` are optional, meaning you can pass either one or both of them to customize the error message. If not provided, they will default to empty strings.

**Component Structure**
-----------------------

The component consists of:

1. A container div with a margin top of 3 units (`mt-3`) for spacing.
2. An alert div with the following classes:
	* `alert`: A Bootstrap class for displaying alerts.
	* `alert-danger`: A Bootstrap class for displaying error messages.
	* `bg-dark` and `text-light`: Custom styles for setting the background color to dark and text color to light, respectively.
3. Conditional rendering of the title and description based on their presence:
	* If `title` is truthy (i.e., not empty), render a heading (`h4`) with the error title.
	* If `description` is truthy (i.e., not empty), render a paragraph (`p`) with the error description.

**Usage Example**
-----------------

```jsx
import React from 'react';
import Error from './Error';

const App = () => {
  return (
    <div>
      <Error title="Invalid Credentials" description="Please check your username and password." />
    </div>
  );
};
```

In this example, the `Error` component is used to display an error message with a title and description. The `title` prop is set to "Invalid Credentials", and the `description` prop is set to "Please check your username and password.".