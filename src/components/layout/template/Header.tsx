
import Image from "../../common/Image"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { auth } from "../../../firebase";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import { clearAllKeys, getAllDatabaseNames } from "idbkeyvalue";
import { connect } from "react-redux";
interface User {
  [key: string]: any;
}

// interface HeaderProps{

// }

function Header() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [user, setUser] = useState<User>({});
  const [isLoading, setisLoading] = useState(true); 
  
  useEffect(()=>{
    let user = localStorage.getItem('user'); 
    if(!user){
      navigate("/login")
    }else{
      const parsedUser:User = JSON.parse(user); 
      setUser(parsedUser); 
      setisLoading(false);
    }
  }, [navigate]);

  const logout = async() =>{
    getAllDatabaseNames()
    .then((dbNames) => {
      if(dbNames.length > 0){
        dbNames.map((name)=>clearAllKeys(name)); 
      } 
    })
    .catch((error) => {
      console.error(error);
    });

    signOut(auth)
    .then(()=>{
      localStorage.clear();
      navigate('/login'); 
    })
  }

  if(isLoading) return <Loader/>; 
  
  return (
    <header className="header-area bg-black section-padding-lr">
      <div className="container">
        <div className="header-wrap header-netflix-style">
          <div className="logo-menu-wrap">
            <div className="logo">

              <div className="profile-header">
              <Link to="/" style={{}} id="logo">
                <Image className="maskhappy-f-icon" alt="Logo" src="/assets/images/maskhappyf.svg" />
                <h3 className="my-films">My Films</h3>
                </Link>
              </div>
            </div>

            <div className="main-menu main-theme-color-four">
              <nav className="main-navigation" style={{ display: 'block' }}>
                <ul>
                  <li className={location.pathname === '/' ? 'active' : ''}>
                    <Link to="/" className={location.pathname === '/' ? 'home-icon-active' : 'home-icon'}>Home</Link>
                  </li>
                  <li className={location.pathname === '/watchlist' ? 'active' : ''}>
                    <Link to="/watchlist" className={location.pathname === '/watchlist' ? 'Watchlist-icon-active' : 'Watchlist-icon'}>Watchlist</Link>
                  </li>
                  <li className={location.pathname === '/favourite' ? 'active' : ''}>
                    <Link to="/favourite" className={location.pathname === '/favourite' ? 'Favourite-icon-active' : 'Favourite-icon'}>Favourite</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
          <div className="right-side">
            <div className="our-profile-area">
            <Image src={user.photoURL} alt="Profile" className="rounded-circle" style={{width:'40px'}}/>
              <div className="name-email">
                <p><span>{user.displayName ?? 'Welcome'}</span> <br />{user.email.substring(0, 20)}{user.email.length > 20 ? '...' : ''}</p>
              </div>
              <div className="dropdown">
                <span className="our-profile-pc dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></span>
                <div className="dropdown-content dropdown-menu" aria-labelledby="dropdownMenuButton" id="user-dropdown">
                  <Link className="dropdown-item" to="/favourite">Favourite</Link>
                  <Link className="dropdown-item" to="/watchlist">Watchlist</Link>
                  <Link className="dropdown-item" to="/history">History</Link>
                  <Link className="dropdown-item" to="/my-account">My Account</Link>
                  <Link className="dropdown-item" to="#" onClick={logout}>Log Out</Link>
                </div>
              </div>
            </div >
          </div >
        </div >
      </div >
    </header >
  )
}

function mapStateToProps(state: Record<string, any>) {
  return {};
}

export default connect(mapStateToProps, {})(Header);