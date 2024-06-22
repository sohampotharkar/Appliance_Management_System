import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const YourAppliances = () => {
    const [adminAppliances, setAdminAppliances] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAdminAppliances();
    }, []);

    const fetchAdminAppliances = async () => {
        try {
            // Fetch admin's appliances from the backend
            const response = await axios.get('http://localhost:5000/admin-appliances', {
                params: {
                    u_id: localStorage.getItem('userId'),
                    password: localStorage.getItem('password'),
                    g_id: localStorage.getItem('g_id')
                }
            });
            setAdminAppliances(response.data);
        } catch (error) {
            console.error('Error fetching admin appliances:', error);
        }
    };

    const handleApplianceClick = (a_id) => {
        // Store the selected appliance ID in local storage
        localStorage.setItem('selectedApplianceId', a_id);
        // Navigate to the appliance details page
        navigate('/appliance-details');
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <h1 className="text-lg font-semibold">Your Appliances</h1>
            </header>
            <main className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {adminAppliances.map(appliance => (
                        <div key={appliance.a_id} className="bg-white shadow-md p-4 rounded-md" onClick={() => handleApplianceClick(appliance.a_id)}>
                            <h3 className="text-lg font-semibold mb-2">{appliance.a_name}</h3>
                            <p className="text-gray-500">Cost: Rs {appliance.cost}</p>
                            <p className="text-gray-500">Purchase Date: {new Date(appliance.purchase_date).toLocaleDateString()}</p>
                            {/* Add more details here as needed */}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default YourAppliances;
