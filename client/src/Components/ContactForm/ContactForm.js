import React from 'react';
import "./ContactForm.css";
import { NotLoggedInNavBar } from "../../Components/NavBar/NotLoggedInNavBar"

export function ContactForm() {

    return (
        <div>
            <NotLoggedInNavBar />
            <div className="container contact-form-container">
                <div>
                    <h2 className="contact-form-heading">Contact Us</h2>
                    <form action="" method="POST">
                        <div className="mb-3">
                            <label htmlFor="exampleInputFullName" className="form-label" required>Full Name</label>
                            <input type="text" className="form-control" id="exampleInputFullName" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Message</label>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" required ></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary float-end">Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}