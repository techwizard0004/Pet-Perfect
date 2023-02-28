import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Header from './Controllers/Header';
import Home from './Controllers/Home';
import Footer from './Controllers/Footer';
import Signup from './Controllers/Signup';
import SignupRoute from './Controllers/SignupRoute';
import Profile from './Controllers/Profile';
import UpdateProfile from './Controllers/UpdateProfile';
import Login from './Controllers/Login';
import UserLists from './Controllers/UserLists';
import UserDetails from './Controllers/UserDetails';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<SignupRoute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/:role" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/updateuser/:id" element={<UpdateProfile />} />
        <Route path="/updateprofile" element={<UpdateProfile />} />
        <Route path="/userlist" element={<UserLists />} />
        <Route path="/userdetails/:id" element={<UserDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
