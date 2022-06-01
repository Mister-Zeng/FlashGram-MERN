import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./Pages/LoginPage/LoginPage"
import { Register } from "./Pages/Register/Register"
import { ContactForm } from "./Pages/ContactForm/ContactForm"
import { ResetPassword } from "./Pages/ResetPassword/ResetPassword"
import { Home } from "./Pages/Home/Home"

function App(props) {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>

  );
}

export default App;
