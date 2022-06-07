import React, { useEffect } from "react";
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/screens/login/login"
import { Register } from "./components/screens/register/register"
import { ContactPage } from "./components/screens/contact-page/contact-page"
import { Home } from "./components/screens/home/home"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
