import React, { useState, ChangeEvent, FormEvent } from 'react';
import { auth, provider } from '../../firebase';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, updateProfile} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { insertIfNotExists, extractUserData } from '../../utils/helper/FireBaseHelper';


interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [button, setButton] = useState("Sign Up"); 
  const [errors, setErrors] = useState<Errors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate(); 
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({
        ...errors, 
        [e.target.name] : ""
    })
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleGoogleLogin = async()=>{
    signInWithPopup(auth, provider)
    .then(async(result)=>{
      if(result){
        let user = result.user; 
        let userData = await extractUserData(user); 
        insertIfNotExists('users', userData, { 'email' : user.email}); 
        localStorage.setItem("user", JSON.stringify(user)); 
        document.getElementById('btn-cancel')?.click(); 
        navigate("/");
      }else{
        console.error("Something went wrong"); 
      }
    })
    .catch((error)=>{
      console.error(error.message.replace("Firebase:", ""));
    })
  }

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { fullName, email, password, confirmPassword } = formData;

    let errors: Errors = {};

    if (!fullName || fullName.length > 50) {
        errors.fullName = "Full Name is required and should not exceed 50 characters.";
    }
    if (!email || !validateEmail(email)) {
        errors.email = "A valid Email is required.";
    }
    if (!password || !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
        errors.password = "Password must be at least 8 characters long and contain at least one digit, one lowercase letter, and one uppercase letter.";
    }

    if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
        setButton("Signing Up...");
      createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName,
            photoURL: "/assets/images/avatar.jpg"
          })
          let userData = await extractUserData(user);
          insertIfNotExists('users', userData, {'email' : user.email}); 
          sendEmailVerification(user)
          .then(() => {
            setSuccessMessage('Registration successful! Please check your email to verify your account.');
            setButton("Sign Up");
          })
          .catch((error) => {
            console.error('Error sending verification email:', error);
            setErrors({ email: 'Failed to send verification email. Please try again.' });
            setButton("Try Again");
          });
        })
        .catch((error) => {
          console.error('Error registering user:', error);
          setErrors({ email: 'Failed to register, '+error.message.replace("Firebase:", "") });
          setButton("Try Again");
        });
    }
  };

  return (
    <div className="modal" id="myModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-body">
            <section className="signup-popup">
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="row">
                      <div className="col-12">
                        <h3 style={{ color: '#000', fontSize: 26, fontWeight: 600 }} className="mb-3">Sign Up</h3>
                      </div>
                    </div>
                    <form onSubmit={handleRegister}>
                      <div className="row gy-3 overflow-hidden">
                        <div className="col-12">
                          <label htmlFor="fullName" className="form-label">Full Name</label>
                          <input 
                            type="text" 
                            className="form-control mb-1" 
                            name="fullName" 
                            id="fullName" 
                            placeholder="Enter Your Full Name" 
                            value={formData.fullName}
                            onChange={handleChange}
                            required 
                          />
                          {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                        </div>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Email</label>
                          <input 
                            type="email" 
                            className="form-control mb-1" 
                            name="email" 
                            id="email" 
                            placeholder="Enter Your Email Id" 
                            value={formData.email}
                            onChange={handleChange}
                            required 
                          />
                          {errors.email && <small className="text-danger">{errors.email}</small>}
                        </div>
                        <div className="col-12">
                          <label htmlFor="password" className="form-label">Password</label>
                          <input 
                            type="password" 
                            className="form-control mb-1" 
                            name="password" 
                            id="password" 
                            placeholder="Enter a Strong Password" 
                            value={formData.password}
                            onChange={handleChange}
                            required 
                          />
                          {errors.password && <small className="text-danger">{errors.password}</small>}
                        </div>
                        <div className="col-12">
                          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                          <input 
                            type="password" 
                            className="form-control mb-1" 
                            name="confirmPassword" 
                            id="confirmPassword" 
                            placeholder="Confirm Your Password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required 
                          />
                          {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button className="btn bsb-btn-2xl btn-sign mb-2" type="submit" data-testid="register-button">{button}</button>
                            <button className="btn bsb-btn-2xl btn-sign mb-2 btn-cancel" id="btn-cancel" type="button" data-bs-dismiss="modal">Cancel</button>
                          </div>
                        </div>
                      </div>
                    </form>
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <div className="col-12">
                      <p className="mt-4 mb-4 text-center">Or</p>
                      <div className="d-flex gap-3 flex-column">
                        <a href="#!" onClick={handleGoogleLogin} className="btn bsb-btn-xl bg-white" style={{ border: '1px solid', padding: 0 }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
                            <path d="M11 4.59997C12.9594 4.59997 14.2812 5.44634 15.0348 6.15359L17.9797 3.27823C16.171 1.59707 13.8174 0.565186 11 0.565186C6.91886 0.565186 3.39422 2.90721 1.67828 6.31591L5.05219 8.9362C5.89857 6.42026 8.2406 4.59997 11 4.59997Z" fill="#EA4335" />
                            <path d="M21.0174 11.2317C21.0174 10.3738 20.9478 9.74766 20.7971 9.09839H11V12.9709H16.7507C16.6348 13.9332 16.0087 15.3824 14.6174 16.3564L17.9101 18.9071C19.8812 17.0868 21.0174 14.4085 21.0174 11.2317Z" fill="#4285F4" />
                            <path d="M5.06377 13.0639C4.84348 12.4146 4.71595 11.7189 4.71595 11.0001C4.71595 10.2813 4.84349 9.5856 5.05218 8.93633L1.67827 6.31604C0.971022 7.73053 0.565225 9.31894 0.565225 11.0001C0.565225 12.6813 0.971022 14.2697 1.67827 15.6842L5.06377 13.0639Z" fill="#FBBC05" />
                            <path d="M11 21.4347C13.8174 21.4347 16.1826 20.5072 17.9101 18.9072L14.6174 16.3565C13.7362 16.971 12.5536 17.4 11 17.4C8.24058 17.4 5.89855 15.5797 5.06376 13.0637L1.68985 15.684C3.40579 19.0927 6.91884                        11 21.4347C13.8174 21.4347 16.1826 20.5072 17.9101 18.9072L14.6174 16.3565C13.7362 16.971 12.5536 17.4 11 17.4C8.24058 17.4 5.89855 15.5797 5.06376 13.0637L1.68985 15.684C3.40579 19.0927 6.91884 21.4347 11 21.4347Z" fill="#34A853" />
                          </svg>
                          <span className="ms-2 fs-6 btn-l"><b>Sign in With Google</b></span>
                        </a>
                      </div>
                      <p className="mt-3 mb-4 text-center">
                        Already have an account? <span style={{ color: '#FCB040' }} data-bs-dismiss="modal">Sign In</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

