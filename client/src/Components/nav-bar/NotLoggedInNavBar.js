import React from 'react';
import { NavLink } from 'react-router-dom';
import { notLoggedInMenuItems } from './MenuItems'
import "./NotLoggedInNavBar.css";
import logo from "../logos.png"

export function NotLoggedInNavBar() {
    return (
        <nav className="navbar navbar-expand-lg nav-bar-background-color">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand">
                    <img className="create-account-nav-bar-logo" src={logo} alt="logo" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {notLoggedInMenuItems.map((item, index) => {
                            return (
                                <li className="nav-item" key={index}>
                                    <NavLink to={item.url} className="nav-link">{item.title}</NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </nav>
    )
}