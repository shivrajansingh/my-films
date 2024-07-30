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
              Copyright © 2024 My Films. All rights reserved.
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
