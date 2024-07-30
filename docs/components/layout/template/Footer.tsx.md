**Footer Component Documentation**
=====================================

### Overview
-----------------

The `Footer` component is a React functional component that renders the footer section of a web application. It includes copyright information, links to privacy policy and terms and conditions pages, and imports several modal components.

### Code Block
--------------

```jsx
import React from 'react'
import MovieDetailsModal from '../../modals/MovieDetailsModal';
import DeleteConfirmationModal from '../../modals/DeleteConfirmationModal';
import NewWatchlistModal from '../../modals/NewWatchlistModal';
import AssignMoviesToWatchlist from '../../modals/AssignMoviesToWatchlist';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="copyright-2024">
                Copyright &copy; 2024 My Films. All rights reserved.
              </div>
            </div>
            <div className="col-md-6">
              <div className="privacy-policy-terms-and-container">
                <span>
                  <span className="privacy-policy"><Link to="/p/privacy-policy" >Privacy Policy</Link> &nbsp;</span>|
                  <span className="terms-and-conditions">&nbsp;<Link to="/p/terms-condition" >Terms and Conditions</Link></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <MovieDetailsModal/>
      <DeleteConfirmationModal/>
      <NewWatchlistModal/>
      <AssignMoviesToWatchlist/>
    </>
  )
}
```

### Components
----------------

*   **`Footer`**: The main component, responsible for rendering the footer section.
*   **`MovieDetailsModal`**, **`DeleteConfirmationModal`**, **`NewWatchlistModal`**, and **`AssignMoviesToWatchlist`**: Modal components imported from separate files. These modals are not directly related to the `Footer` component but are rendered along with it.

### Styles
------------

The `footer` element has a CSS class of "footer", which is likely defined in an external stylesheet or CSS file. The styles for this component can be found in the corresponding CSS file.

*   **`.copyright-2024`**: A CSS class used to style the copyright information.
*   **`.privacy-policy-terms-and-container`**: A CSS class used to style the container for the privacy policy and terms and conditions links.
*   **`.row`**, **`.col-md-6`**: Bootstrap grid classes used to create a two-column layout.

### Routing
------------

The `Link` component from React Router is used to create links to external pages. The `to` prop specifies the URL for each link:

*   `/p/privacy-policy`: A link to the privacy policy page.
*   `/p/terms-condition`: A link to the terms and conditions page.

### Props
---------

The `Footer` component does not accept any props in this implementation.

### State
--------

The `Footer` component does not use state in this implementation.