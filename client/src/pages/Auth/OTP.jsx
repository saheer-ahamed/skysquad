import { Link, useNavigate } from 'react-router-dom'
import './Auth.css'
import logo from '../../assets/images/logo.png'
import { useRef } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'

const OTP = () => {
  const otpRef = useRef()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = Cookies.get('notvalid')

  const handleOTP = async (e) => {
    e.preventDefault()

    await axios.post('http://localhost:4000/user/verify', {
      otp: otpRef.current.value
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      toast.success("Registration Successful!");
      const { userDetails } = res.data;
      dispatch({ type: "LOGIN", payload: userDetails._doc });
      Cookies.set("user", JSON.stringify(userDetails._doc));
      navigate("/");
    })
  }
  return (
    <div className="auth-container">
      <div className="auth-card">
        <input type="checkbox" id="check" aria-hidden="true" name="" />
        <div className="auth-content">
          <div className="log-in">
            <div className="inner">
              <img src={logo} alt="logo" />
              <h2>Verify OTP</h2>
              <form onSubmit={handleOTP}>
                <input type="number" ref={otpRef} placeholder="Enter OTP" className="auth-input-field" />
                <Link to="#">Resend OTP</Link>
                <button type="submit" className="auth-btn otp-btn">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTP