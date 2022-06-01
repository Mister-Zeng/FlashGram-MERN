import React from 'react'
import { Link } from 'react-router-dom';
import "./LoginPage.css";
import Logo from "../../Components/Logos.png"

export function LoginPage() {
    const onSubmitHandler = event => {
        event.preventDefault()
    }


    return (
        <div className="main-container">
            <div className="about-us-container container-fluid container">
                <div className="about-us">
                    <h2 className="about-us-head">About Us</h2>
                    <p className="message">
                        We are a social media platform that aim for diversity and inclusion. We're committed to
                        fostering a safe and supportive community for everyone. Express yourself in a new way. Connect
                        with more people, build connection, and create contents that's disctinctly yours.
                    </p>
                </div>
            </div>

            <div className="container form-container">
                <img src={Logo} alt="logo" />
                <div className="">
                    <h2 className="">Welcome back</h2>
                    <p className="">
                        New to FlashGram? <Link to="/create-account">Sign up</Link>
                    </p>
                </div>
                <form action="" method="POST" className="form container" onSubmit={onSubmitHandler} >
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required />
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember this device</label>
                    </div>
                    <button type="submit" className="btn btn-primary float-end">Log In</button>
                    <div className="float-left">
                        <Link to="/reset-password">Forgot your password?</Link>
                    </div>
                    <div className="term-container">
                        <p className="">
                            By continuing you accept our
                            <Link to="" >Terms of Use</Link> and
                            <Link to="" >Privacy Policy</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}