import { Link, useNavigate } from "react-router-dom"
import './Auth.css'
import logo from '../../assets/images/logo.png'
import { useRef } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"

const Auth = () => {
    const fullnameRef = useRef()
    const mobileRef = useRef()
    const loginMobileRef = useRef()
    const passwordRef = useRef()
    const loginPassRef = useRef()
    const confirmPassRef = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogin = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:4000/user/login", {
            mobile: loginMobileRef.current.value,
            password: loginPassRef.current.value
        }).then(res => {
            toast.success("Login Successful!");
            const { userDetails } = res.data;
            dispatch({ type: "LOGIN", payload: userDetails._doc });
            Cookies.set("user", JSON.stringify(userDetails._doc));
            navigate('/')
        })

    }

    const handleSignup = async (e) => {
        e.preventDefault()

        await axios.post("http://localhost:4000/user/signup", {
            fullname: fullnameRef.current.value,
            mobile: mobileRef.current.value,
            password: passwordRef.current.value,
            confirmpass: confirmPassRef.current.value,
        }).then(res => {
            Cookies.set("notvalid", JSON.stringify(res.data.token));
            navigate('/otp')
        }).catch(error => {
            toast.error(error.response.data.message)
            console.log(error)
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
                            <h2>Log In</h2>
                            <form onSubmit={handleLogin}>
                                <input type="number" ref={loginMobileRef} placeholder="Mobile Number" className="auth-input-field" />
                                <input type="password" ref={loginPassRef} placeholder="Password" className="auth-input-field" />
                                <Link to="#">Forgot Password?</Link>
                                <button type="submit" className="auth-btn login-btn">Login</button>
                            </form>
                            <span>New User? <label htmlFor="check" aria-hidden="true">Register Here</label></span>
                        </div>
                    </div>
                    <div className="register">
                        <div className="inner">
                            <img src={logo} alt="logo" />
                            <h2>Register</h2>
                            <form onSubmit={handleSignup}>
                                <input type="text" ref={fullnameRef} placeholder="Full Name" className="auth-input-field" />
                                <input type="number" ref={mobileRef} placeholder="Mobile Number" className="auth-input-field" />
                                <div className="pass-inputs">
                                    <input type="password" ref={passwordRef} placeholder="Password" className="pass-input" />
                                    <input type="password" ref={confirmPassRef} placeholder="Confirm Password" className="pass-input" />
                                </div>
                                <button type="submit" className="auth-btn reg-btn">Submit</button>
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