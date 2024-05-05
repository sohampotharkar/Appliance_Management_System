import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const ApplianceDetails = () => {
    const [applianceData, setApplianceData] = useState({});
    const navigate = useNavigate(); // Initialize useNavigate hook
    const location = useLocation();
    const selectedApplianceId = localStorage.getItem('selectedApplianceId');
    const u_id = localStorage.getItem('userId');
    const password = localStorage.getItem('password');
    console.log(applianceData);

    useEffect(() => {
        // Fetch appliance details when the component mounts
        fetchApplianceDetails();
    }, []);

    const fetchApplianceDetails = async () => {
        try {
            // Fetch appliance details using the selected appliance ID
            const response = await axios.get('http://localhost:5000/appliance-details', {
                params: {
                    a_id: selectedApplianceId,
                    u_id: u_id,
                    password: password
                }
            });
            setApplianceData(response.data);
            console.log(response.data.appliance.a_name);
        } catch (error) {
            console.error('Error fetching appliance details:', error);
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

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-semibold">{applianceData.appliance.a_name} Details</h1>
                    <p className="text-sm">Appliance ID: {applianceData.appliance.a_id}</p>
                </div>
                <div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-8 rounded-md m-4" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            {/* Body Section */}
            <main className="p-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Appliance Details</h2>
                    <p>Purchase Date: {new Date(applianceData.appliance.purchase_date).toLocaleDateString()}</p>
                    <p>Cost: Rs {applianceData.appliance.cost}</p>
                    <img src={`data:image/jpeg;base64,${applianceData.image.invoice_image_base64}`} alt="Invoice" />
                    {/* Add more details here as needed */}
                </div>
            </main>
        </div>
    );
};

export default ApplianceDetails;
