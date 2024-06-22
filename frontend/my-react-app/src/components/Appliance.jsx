import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Appliance = () => {
    const [appliances, setAppliances] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [userData, setUserData] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate hook
    const g_name = localStorage.getItem('g_name');
    const g_id = localStorage.getItem('g_id');

    useEffect(() => {
        // Retrieve user ID, password, and username from local storage
        const u_id = localStorage.getItem('userId');
        const password = localStorage.getItem('password');

        // Fetch user data and appliance data using the retrieved user ID, password, and group ID
        fetchUserData(u_id, password);
        fetchAppliances(u_id, password, g_id);
    }, []);

    const fetchUserData = async (u_id, password) => {
        try {
            const response = await axios.get('http://localhost:5000/user', {
                params: { u_id, password } // Send user ID and password as parameters
            });
            setUserData(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const fetchAppliances = async (u_id, password, g_id) => {
        try {
            const response = await axios.get('http://localhost:5000/appliances', {
                params: { u_id, password, g_id } // Send user ID, password, and group ID as parameters
            });
            setAppliances(response.data);
        } catch (error) {
            console.error('Error fetching appliances:', error);
        }
    };

    const handleLogout = () => {
        // Clear local storage data
        localStorage.removeItem('userId');
        localStorage.removeItem('password');
        localStorage.removeItem('g_id');
        localStorage.removeItem('g_name');
        localStorage.removeItem('selectedApplianceId');
        // Navigate to login page
        navigate('/login');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleGroupDescription = async () => {
        try {
            // Fetch group details from the backend
            const response = await axios.get('http://localhost:5000/group-description', {
                params: { g_id }
            });
            const groupData = response.data;

            // Navigate to the group description page and pass the group data as state
            navigate('/group-description', { state: { groupData } });
        } catch (error) {
            console.error('Error fetching group description:', error);
        }
    };

    const handleYourAppliances = async () => {
        try {
            // Fetch admin's appliances from the backend
            const response = await axios.get('http://localhost:5000/admin-appliances', {
                params: { u_id: localStorage.getItem('userId'), password: localStorage.getItem('password'), g_id }
            });
            const adminAppliances = response.data;

            // Navigate to the page to display admin's appliances and pass the data as state
            navigate('/your-appliances', { state: { adminAppliances } });
        } catch (error) {
            console.error('Error fetching admin appliances:', error);
        }
    };

    const handleApplianceClick = (a_id) => {
        // Store the appliance ID in local storage
        localStorage.setItem('selectedApplianceId', a_id);
        // Navigate to the appliance details page
        navigate(`/appliance-details`);
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-semibold">{userData.u_name}'s Appliance</h1>
                    <p className="text-sm">User No:- {userData.u_id}</p>
                </div>
                <div>
                    <button className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md mr-4" onClick={handleGroupDescription}>
                        Group Description
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-8 rounded-md m-4" onClick={handleYourAppliances}>
                        Your Appliances
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-md" onClick={() => navigate('/add-appliance')}>
                        Add Appliance
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-8 rounded-md m-4" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            {/* Body Section */}
            <main className="p-6">
                <input
                    type="text"
                    placeholder="Search Appliances"
                    className="px-2 py-1 border rounded-md mb-4"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <h2 className="text-xl font-semibold mb-4">Appliances in {g_name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {appliances.filter(appliance =>
                        appliance.a_name.toLowerCase().includes(searchTerm.toLowerCase())
                    ).map(appliance => (
                        <div key={appliance.a_id} className="bg-white shadow-md p-4 rounded-md" onClick={() => handleApplianceClick(appliance.a_id)}>
                            <h3 className="text-lg font-semibold mb-2">{appliance.a_name}</h3>
                            <p className="text-gray-500">Cost:-  Rs {appliance.cost}</p>
                            <p className="text-gray-500">Purchase Date: {new Date(appliance.purchase_date).toLocaleDateString()}</p>
                            {/* Add more details here as needed */}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Appliance;
