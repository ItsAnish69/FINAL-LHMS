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
import  BookDetails from "./components/bookDetails";
import Contact from './components/contact'
import Profile from './components/userDashBoard';


import AdminDashboard from "./components/Admin/AdminDashboard";
import Dashboard from "./components/Admin/pages/dashboard";
import UserManagement from "./components/Admin/pages/userManagment";  
import BookManagement from "./components/Admin/pages/bookManagment";
import BorrowReturn from "./components/Admin/pages/borrowReturn";
import Settings from "./components/Admin/pages/setting";


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
        <Route path="/book-info/:id" element={<BookDetails/>}/>
        <Route path="/user-dashboard" element={<Profile/>}/>
        <Route path="/contact" element={<Contact/>}/>

        <Route path="/admin-dashboard" element={<AdminDashboard/>}>
          <Route index element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="books" element={<BookManagement />} />
          <Route path="Borrow-return" element={<BorrowReturn />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
    </>
  );
};

export default App