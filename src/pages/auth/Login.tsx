import React, { FC, useState, HTMLAttributes} from 'react'
import Register from './Register';
import { auth, provider } from '../../firebase'
import { signInWithPopup, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
// import { setUser } from '../../store/action/UserAction';
import { connect } from 'react-redux';
import { useNavigate } from "react-router-dom";
import ForgotPassword from './ForgotPassword';
import { saveOrUpdateDataToFireStore, extractUserData } from '../../utils/helper/FireBaseHelper';

interface LoginProps extends HTMLAttributes<HTMLDivElement> {
  // setUser : (payload: object) => void;
}

const Login:FC<LoginProps> = (props) => {

  const navigate = useNavigate(); 
  // const { setUser } = props; 
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState<string>('');
  const [button, setButton] = useState("Sign in"); 
  const [isButtonDisabled, setButtonDisabled] = useState(false); 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = async()=>{
    signInWithPopup(auth, provider)
    .then(async(result)=>{
      if(result){
        let user = result.user; 
        let userData = await extractUserData(user); 
        saveOrUpdateDataToFireStore('users', userData, { 'email' : user.email}); 
        localStorage.setItem("user", JSON.stringify(userData));  
        navigate("/");
      }else{
        console.error("Something went wrong"); 
      }
    })
    .catch((error)=>{
      console.error(error.message.replace("Firebase:", ""));
    })
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      setButtonDisabled(true); 
      setButton("Signing you in..")
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      let userData = await extractUserData(user);
      saveOrUpdateDataToFireStore('users', userData, { 'email' : user.email}); 
      if(user.emailVerified){
        setButton("Success"); 
        localStorage.setItem("user", JSON.stringify(userData));  
        navigate("/");
      }else{
        setButtonDisabled(false); 
        setButton("Try Again")
        sendEmailVerification(userCredential.user)
        .then(() => {
          setError("Email id is not verified, Please check your email and click on verify link");
        })
        .catch((error:any) => {
          setError('Error sending verification email:'+ error.message.replace("Firebase:", ""));
        });
        
      }
    } catch (error:any) {
      setButtonDisabled(false); 
      setButton("Try Again")
      setError(error.message.replace("Firebase:", ""));
      console.error('Error signing in:', error);
    }
  };

  

  return (
    <main className="login-form">
      <section className="p-3 p-md-4 p-xl-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-9 col-lg-7 col-xl-5 col-xxl-5">
              <div className="row">
                <div className="col-12">
                  <div className="mb-5">
                    <h3>Welcome to My Films,<br />
                      <span>Sign In to Continue</span>
                    </h3>
                  </div>
                </div>
              </div>
              <form onSubmit={handleLogin}>
                <div className="row gy-3 overflow-hidden">
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email ID</label>
                      <input
                        type="email"
                        className="form-control search-bar-parent mt-0"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email ID"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control search-bar-parent mt-0"
                        name="password"
                        id="password"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  {error && <div className="col-12"><p className="text-danger">{error}</p></div>}
                  <div className="col-12">
                    <div className="d-grid">
                      <button className="btn bsb-btn-2xl btn-sign" type="submit" disabled={isButtonDisabled}>{button}</button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="row">
                <div className="col-12">
                <p className="mt-4 mb-4 text-center" style={{ color: '#fff' }}>
                <span style={{ color: '#FCB040', cursor: 'pointer', textDecoration: 'underline' }} data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">Forgot Password?</span>
                  </p>
                  <p className="mt-4 mb-4 text-center" style={{ color: '#fff' }}>Or</p>
                  <div className="d-flex gap-3 flex-column">
                    <button className="btn bsb-btn-xl bg-white"  onClick={handleGoogleLogin}>
                      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                        <path d="M11 4.59997C12.9594 4.59997 14.2812 5.44634 15.0348 6.15359L17.9797 3.27823C16.171 1.59707 13.8174 0.565186 11 0.565186C6.91886 0.565186 3.39422 2.90721 1.67828 6.31591L5.05219 8.9362C5.89857 6.42026 8.2406 4.59997 11 4.59997Z" fill="#EA4335" />
                        <path d="M21.0174 11.2317C21.0174 10.3738 20.9478 9.74766 20.7971 9.09839H11V12.9709H16.7507C16.6348 13.9332 16.0087 15.3824 14.6174 16.3564L17.9101 18.9071C19.8812 17.0868 21.0174 14.4085 21.0174 11.2317Z" fill="#4285F4" />
                        <path d="M5.06377 13.0639C4.84348 12.4146 4.71595 11.7189 4.71595 11.0001C4.71595 10.2813 4.84349 9.5856 5.05218 8.93633L1.67827 6.31604C0.971022 7.73053 0.565225 9.31894 0.565225 11.0001C0.565225 12.6813 0.971022 14.2697 1.67827 15.6842L5.06377 13.0639Z" fill="#FBBC05" />
                        <path d="M11 21.4347C13.8174 21.4347 16.1826 20.5072 17.9101 18.9072L14.6174 16.3565C13.7362 16.971 12.5536 17.4 11 17.4C8.24058 17.4 5.89855 15.5797 5.06376 13.0637L1.68985 15.684C3.40579 19.0927 6.91884 21.4347 11 21.4347Z" fill="#34A853" />
                      </svg>
                      <span className="ms-2 fs-6 btn-l"><b data-testid="sign-in-with-google">Sign in With Google</b></span>
                    </button>
                  </div>
                  <div className="mt-3 mb-4 text-center signin-text">
                    Don't have an account? <span style={{ color: '#FCB040', cursor: 'pointer', textDecoration: 'underline' }} data-bs-toggle="modal" data-bs-target="#myModal" data-testid="register">Sign Up</span>
                   <Register/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     <ForgotPassword/>
    </main>
  )
}

function mapStateToProps(state:Record<string, any>){
  return {}
}

export default connect(mapStateToProps, {})(Login); 