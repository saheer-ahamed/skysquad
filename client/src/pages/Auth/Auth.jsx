import { Link } from "react-router-dom"
import './Auth.css'
import logo from '../../assets/images/logo.png'

const Auth = () => {
    return (
        <div className="auth-container">
            <div className="card">
                <input type="checkbox" id="check" aria-hidden="true" name="" />
                <div className="content">
                    <div className="log-in">
                        <div className="inner">
                            <img src={logo} alt="logo" />
                            <h2>Log In</h2>
                            <form action="">
                                <input type="number" name="mobile" placeholder="Mobile Number" className="input-field" />
                                <input type="password" name="password" placeholder="Password" className="input-field" />
                                <Link to="#">Forgot Password?</Link>
                                <button type="submit" className="btn login-btn">Login</button>
                            </form>
                            <span>New User? <label htmlFor="check" aria-hidden="true">Register Here</label></span>
                        </div>
                    </div>
                    <div className="register">
                        <div className="inner">
                            <img src={logo} alt="logo" />
                            <h2>Register</h2>
                            <form action="">
                                <input type="text" name="fullname" placeholder="Full Name" className="input-field" />
                                <input type="number" name="mobile" placeholder="Mobile Number" className="input-field" />
                                <div className="pass-inputs">
                                    <input type="password" name="password" placeholder="Password" className="pass-input" />
                                    <input type="password" name="confirmpassword" placeholder="Confirm Password" className="pass-input" />
                                </div>
                                <button type="submit" className="btn reg-btn">Submit</button>
                            </form>
                            <span>Already a user? <label htmlFor="check" aria-hidden="true">Log In</label></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth