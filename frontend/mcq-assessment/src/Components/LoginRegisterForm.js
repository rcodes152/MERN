// src/Components/LoginRegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginRegisterForm.css';

const backgroundStyle = {
    backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/ngo.png'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
};

const statesOfIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
    "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
    "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
    "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
    "Uttarakhand", "West Bengal"
];

const LoginRegisterForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        region: '',
        profession: '',
        ngoWork: ''
    });
    const navigate = useNavigate(); // Hook for navigation

    const switchForm = () => {
        setIsLogin(!isLogin);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLogin) {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email: formData.email,
                    password: formData.password
                });
                console.log('Login successful', response.data);
                // Redirect to /blankpage after successful login
                navigate('/blankpage');
            } catch (error) {
                console.error('Error during login:', error.response?.data || error.message);
                // Handle login error
            }
        } else {
            try {
                const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
                console.log('Registration successful', response.data);
                // Automatically switch to login form after successful registration
                switchForm();
                // Redirect to login page after registration
                navigate('/');
            } catch (error) {
                console.error('Error during registration:', error.response?.data || error.message);
                // Handle registration error
            }
        }
    };

    return (
        <div style={backgroundStyle}>
            <div className="wrapper">
                <div className="container">
                    <h1 className="brand">Welcome!</h1>
                    {isLogin ? (
                        <form className="form" onSubmit={handleSubmit}>
                            <h2>Login</h2>
                            <div className="form-group">
                                <label htmlFor="loginEmail">Email Address</label>
                                <input 
                                    type="email" 
                                    id="loginEmail" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="loginPassword">Password</label>
                                <input 
                                    type="password" 
                                    id="loginPassword" 
                                    name="password" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe">Remember this device</label>
                            </div>
                            <button type="submit" className="btn-primary">Sign In</button>
                            <p>
                                Don't have an account? <button type="button" className="link-button" onClick={switchForm}>Register</button>
                            </p>
                        </form>
                    ) : (
                        <form className="form" onSubmit={handleSubmit}>
                            <h2>Register</h2>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerEmail">Email Address</label>
                                <input 
                                    type="email" 
                                    id="registerEmail" 
                                    name="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="registerPassword">Password</label>
                                <input 
                                    type="password" 
                                    id="registerPassword" 
                                    name="password" 
                                    value={formData.password}
                                    onChange={handleChange}
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="profession">Profession</label>
                                <select 
                                    id="profession" 
                                    name="profession" 
                                    value={formData.profession}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select your profession</option>
                                    <option value="Student">Student</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="region">Region</label>
                                <select 
                                    id="region" 
                                    name="region" 
                                    value={formData.region}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select your state</option>
                                    {statesOfIndia.map((state) => (
                                        <option key={state} value={state}>{state}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="ngoWork">Have you done any past NGO work?</label>
                                <select 
                                    id="ngoWork" 
                                    name="ngoWork" 
                                    value={formData.ngoWork}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select an option</option>
                                    <option value="yes">Yes</option>
                                    <option value="no">No</option>
                                </select>
                            </div>
                            <button type="submit" className="btn-primary">Register</button>
                            <p>
                                Already have an account? <button type="button" className="link-button" onClick={switchForm}>Login</button>
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoginRegisterForm;
