import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home.js';
import Login from './Login.js';
import Signup from './Signup.js';
import OptionsPage from './OptionsPage.js';
import ProfileOptionsPage from './ProfileOptionsPage.js';
import EditProfilePage from './EditProfilePage.js';
import EmployeeListPage from './EmployeeListPage.js';
import JobOffersPage from './JobOffersPage.js';


function MainApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/options" element={<OptionsPage />} />
                <Route path="/hacer-perfil" element={<ProfileOptionsPage />} />
                <Route path="/make-edit-profile" element={<EditProfilePage/>} />
                <Route path="/buscar-empleado" element={<EmployeeListPage />} />
                <Route path="/look-at-offers" element={<JobOffersPage />}/>
            </Routes>
        </Router>
    );
}


export default MainApp;
