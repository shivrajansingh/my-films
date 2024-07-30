import React, { useState } from 'react';
import { auth } from '../../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

interface ForgotPasswordProps {
//   onClose: () => void; // Callback to close the modal
}

const ForgotPassword: React.FC<ForgotPasswordProps> = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError('');
    } catch (error: any) {
      setError(error.message);
      setResetSent(false);
    }
  };

  return (
    <div className="modal" id="forgotPasswordModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Forgot Password</h5>
            <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal" data-testid="close"></button>
          </div>
          <div className="modal-body">
            {!resetSent ? (
              <>
                 <form onSubmit={handleResetPassword} className="">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label" style={{ color: 'black' }}>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {error && <p className="text-danger">{error}</p>}
                  <button type="submit" className="btn btn-sign btn-block w-100">Reset Password</button>
                </form>
              </>
            ) : (
              <div className="alert alert-success" role="alert">
                Password reset email sent to {email}. Check your inbox and follow the instructions.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
