import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./components/screens/login/login"
import { Register } from "./components/screens/register/register"
import { ContactPage } from "./components/screens/contact-page/contact-page"
import { Home } from "./components/screens/home/home"

function App(props) {

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
