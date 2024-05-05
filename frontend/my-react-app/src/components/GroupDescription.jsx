import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const GroupDescription = () => {
    const [groupData, setGroupData] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook
    const location = useLocation();
    const g_id = localStorage.getItem('g_id');
    const g_name = localStorage.getItem('g_name');

    useEffect(() => {
        // Fetch group description when the component mounts
        fetchGroupDescription();
        console.log(groupData);
    }, []);

    const fetchGroupDescription = async () => {
        try {
            const response = await axios.get('http://localhost:5000/group-description', {
                params: { g_id } // Send group ID as a parameter
            });
            setGroupData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching group description:', error);
        }
    };

    const handleLogout = () => {
        // Clear local storage data
        localStorage.removeItem('userId');
        localStorage.removeItem('password');
        localStorage.removeItem('g_id');
        localStorage.removeItem('g_name');
        // Navigate to login page
        navigate('/login');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-bold">{g_name}'s Group</h1>
                    <p className="text-sm">Group ID: {g_id}</p>
                    <p className='text-sm'>Total Members: {groupData.u_count}</p>
                </div>
                <div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-8 rounded-md" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            {/* Body Section */}
            <main className="p-6">
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search Members"
                        className="px-2 py-1 border rounded-md"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {groupData.users &&
                        groupData.users
                            .filter((user) =>
                                user.u_name.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((user) => (
                                <div
                                    key={user.u_id}
                                    className="bg-white shadow-md p-4 rounded-md"
                                >
                                    <h3 className="text-lg font-semibold mb-2">
                                        {user.u_name}
                                    </h3>
                                    <p className="text-gray-500">User ID: {user.u_id}</p>
                                    {/* Add more details here as needed */}
                                </div>
                            ))}
                </div>
            </main>
        </div>
    );
};

export default GroupDescription;
