import { FC } from "react";
import Image from "../../common/Image";
import { Link } from "react-router-dom";


const AuthHeader:FC = () =>{
  return (
   <header className="header-area bg-black section-padding-lr">
  <div className="container">
    <div className="header-wrap header-netflix-style">
      <div className="logo-menu-wrap">
        <div className="logo">
          <div className="profile-header">
            <Link to="/"><Image className="maskhappy-f-icon" src="/assets/images/maskhappyf.svg" />
            <h3 className="my-films">My Films</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
  )
}

export default AuthHeader; 