import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const LoginForm = () => {
    const [u_id, setU_id] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/login', { u_id, password });
            console.log(response.data); // Handle successful login
            
            // Save user ID and password to local storage
            localStorage.setItem('userId', u_id);
            localStorage.setItem('password', password);

            navigate('/dashboard'); // Navigate to the dashboard
        } catch (error) {
            setError('Invalid credentials'); // Handle login error
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 to-yellow-500">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="py-8 px-6">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Sign in</h2>
                {error && <p className="text-red-600 text-center mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <input 
                            type="number"
                            placeholder="U_id"
                            value={u_id}
                            onChange={(e) => setU_id(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <div className="mb-6">
                        <input 
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-yellow-500 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-pink-500 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign in
                    </button>
                </form>
            </div>
            <div className="py-4 px-6 bg-gray-100 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600">
                    Don't have an account? {' '}
                    <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    </div>
    );
};

export default LoginForm;
