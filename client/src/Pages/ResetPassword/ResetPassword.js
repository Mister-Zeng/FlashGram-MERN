import React from 'react';
import { NotLoggedInNavBar } from "../../Components/NavBar/NotLoggedInNavBar"
import "./ResetPassword.css";

export function ResetPassword() {

    return (
        <div>
            <NotLoggedInNavBar />
            <div className='container reset-password-container'>
                <div>
                    <h2 className='reset-password-heading'>Reset Password</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        </div>
                        <div class="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">User Name</label>
                            <input type="text" className="form-control" id="exampleInputPassword1" required />
                        </div>
                        <button type="submit" className="btn btn-primary float-end">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}