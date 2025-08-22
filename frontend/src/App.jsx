import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import React from 'react'
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Login from './components/login';
import Register from "./components/register";
import ForgotPassword from "./components/forgotPassword";
import VerifyOtp from "./components/verifyOtp";
import ChangePassword from "./components/changePassword";
import Preview from "./components/previewPage";
import NotFound from "./components/notFound";
import Books from "./components/books";
import Dashboard from "./components/Admin/AdminDashboard";
import Employee from "./components/Admin/employee";
import  DB from "./components/DefaultBooks";
import  BookDetails from "./components/bookDetails";
import Cart from "./components/cart";
import Contact from './components/contact'
import Profile from './components/userDashBoard';

const App = () => {
  return (
    <>
    <Router>
      <Routes>
        {/* grouping the navbar, banner, and footer */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/books" element={<Books/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/verify-otp" element={<VerifyOtp/>}/>
        <Route path="/change-password" element={<ChangePassword/>}/>
        <Route path="/" element={<Preview/>}/>
        <Route path="/*" element={<NotFound/>}/>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="employee" element={<Employee/>}/>
        </Route>
        <Route path="/defaultbooks" element={<DB/>}/>
        <Route path="/book-info/:id" element={<BookDetails/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/user-dashboard" element={<Profile/>}/>
        <Route path="/contact" element={<Contact/>}/>
      </Routes>
    </Router>
    </>
  );
};

export default App