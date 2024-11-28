import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [email,setEmail]=useState('');

    const handleSignup = async () => {
        try {
            if (password !== confirmPassword) {
                setPasswordError('Passwords do not match');
                return;
            }

            const response = await axios.post('http://localhost:5001/signup', { username, password ,email});

            if (response.data.message === 'User created successfully!') {
                // Show the user ID
                alert(`Your user ID is: ${response.data.u_id}`);
                // Redirect to the login page
                window.location.href = '/login';
            } else {
                console.error('Error:', response.data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-500">
            <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="py-8 px-6">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Sign up</h2>
                    {passwordError && <p className="text-red-600 text-center mb-4">{passwordError}</p>}
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 mb-4"
                    />
                    <input
                        type='email'
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordError('');
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 mb-4"
                    />
                    <button
                        type="button"
                        onClick={handleSignup}
                        className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create Account
                    </button>
                </div>
                <div className="py-4 px-6 bg-gray-100 border-t border-gray-200">
                    <p className="text-center text-sm text-gray-600">
                        Already have an account? {' '}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;