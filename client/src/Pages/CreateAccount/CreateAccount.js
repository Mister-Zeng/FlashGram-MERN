import React from 'react';
import "./CreateAccount.css";
import { Link } from "react-router-dom";
import { NotLoggedInNavBar } from "../../Components/NavBar/NotLoggedInNavBar"

export function CreateAccount() {


    return (
        <div>
            <NotLoggedInNavBar />
            <div className="container create-account-main-container">
                <div className="background-div container">
                    <h2 className="create-account-heading">Create an account</h2>
                    <form action="/home" method="POST">
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputFullName" className="form-label">Full Name</label>
                            <input type="text" className="form-control" id="exampleInputFullName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputUserName" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="exampleInputUserName" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input type="password" className="form-control" id="exampleInputPassword1" required />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" required />
                            <label className="form-check-label" htmlFor="exampleCheck1">
                                <div className="">
                                    <p className="">
                                        Check this box to accept our
                                        <Link to="" className="">Terms of Use</Link> and
                                        <Link to="" className="">Privacy Policy</Link>.
                                    </p>
                                </div>
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary float-end">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}