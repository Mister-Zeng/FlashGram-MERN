import React, {useState} from "react";
import axios from "axios";
import "./CreateAccount.css";
import { Link, useNavigate } from "react-router-dom";
import { NotLoggedInNavBar } from "../../Components/NavBar/NotLoggedInNavBar"


export function CreateAccount() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const handleSubmit = (e) => {
      e.preventDefault();
      var data = JSON.stringify({
        username,
        password,
        email,
        name
      });
  
      var config = {
        method: "post",
        url: `${process.env.REACT_APP_BE}/users/register`,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data: data
      };
  
      axios(config)
        .then(function (response) {
          localStorage.setItem("my_user_token", response.data.token);
          navigate("/home");
        })
        .catch(function (error) {
          console.log(error);
        });
    };

    return (
        <div>
            <NotLoggedInNavBar />
            <div className="container create-account-main-container">
                <div className="background-div container">
                    <h2 className="create-account-heading">Create an account</h2>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input 
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            aria-describedby="emailHelp"
                            required />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputFullName" className="form-label">Full Name</label>
                            <input 
                            onChange={(e) => setName(e.target.value)}
                            type="text" 
                            className="form-control" 
                            id="exampleInputFullName" 
                            required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputUserName" className="form-label">User Name</label>
                            <input 
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" 
                            className="form-control" 
                            id="exampleInputUserName" 
                            required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input 
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            required />
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