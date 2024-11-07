import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import OptionsPage from './OptionsPage';
import ProfileOptionsPage from './ProfileOptionsPage';
import EditProfilePage from './EditProfilePage';
import EmployeeListPage from './EmployeeListPage';
import JobOffersPage from './JobOffersPage';

function App() {
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


export default App;
