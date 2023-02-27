import { Link } from 'react-router-dom'
import './Auth.css'
import logo from '../../assets/images/logo.png'

const OTP = () => {
  return (
    <div className="auth-container">
      <div className="otp-card">
        <input type="checkbox" id="check" aria-hidden="true" name="" />
        <div className="auth-content">
          <div className="log-in">
            <div className="inner">
              <img src={logo} alt="logo" />
              <h2>Verify OTP</h2>
              <form action="">
                <input type="number" name="otp" placeholder="Enter OTP" className="input-field" />
                <Link to="#">Resend OTP</Link>
                <button type="submit" className="btn otp-btn">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTP