import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../App.css";

const Dashboard = () => {
    const [userData, setUserData] = useState({});
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        // Retrieve user ID and password from local storage
        const u_id = localStorage.getItem('userId');
        const password = localStorage.getItem('password');

        // Fetch user data and groups using the retrieved user ID and password
        fetchUserData(u_id, password);
        fetchGroups(u_id, password);
    }, []);

    const fetchUserData = async (u_id, password) => {
        try {
            const response = await axios.get('http://localhost:5001/user', {
                params: { u_id, password } // Send user ID and password as parameters
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchGroups = async (u_id, password) => {
        try {
            const response = await axios.get('http://localhost:5001/groups', {
                params: { u_id, password } // Send user ID and password as parameters
            });
            setGroups(response.data);
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
    };

    const handleGroupClick = (g_id,g_name) => {
        // Save the group ID to local storage
        localStorage.setItem('g_id', g_id);
        localStorage.setItem('g_name',g_name);
    };

    const handleLogout = () => {
        // Clear local storage data
        localStorage.removeItem('userId');
        localStorage.removeItem('password');
        localStorage.removeItem('g_id'); // Remove the stored group ID
        localStorage.removeItem('g_name');
        // Navigate to login page
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-semibold">{userData.u_name}'s Dashboard</h1>
                    <p className="text-sm">User No:- {userData.u_id}</p>
                </div>
                <div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            {/* Body Section */}
            <main className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Groups</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groups.map(group => (
                        <Link key={group.g_id} to={`/appliance`} className="text-gray-900" onClick={() => handleGroupClick(group.g_id,group.g_name)}>
                            <div className="bg-white shadow-md p-4 rounded-md cursor-pointer">
                                <h3 className="text-lg font-semibold mb-2"> {group.g_name}</h3>
                                <p className="text-gray-500">{group.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
