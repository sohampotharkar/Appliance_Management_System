import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplianceDetails = () => {
    const [applianceData, setApplianceData] = useState({});
    const [invoiceImage, setInvoiceImage] = useState(null); // State to store invoice image blob
    const [serviceHistory, setServiceHistory] = useState([]); // State to store service history
    const navigate = useNavigate(); // Initialize useNavigate hook
    const selectedApplianceId = localStorage.getItem('selectedApplianceId');
    const u_id = localStorage.getItem('userId');
    const password = localStorage.getItem('password');
   

    useEffect(() => {
        // Fetch appliance details when the component mounts
        fetchApplianceDetails();
        console.log(invoiceImage);
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
            console.log(applianceData)
            // Fetch invoice image if available
            if (applianceData.documentImage) {
                let unit8array = new unit8array(applianceData.documentImage.data);
                let blob = new Blob([unit8array], {type: 'image/jpeg'});
                let imageUrl = URL.createObjectURL(blob);

                setInvoiceImage(imageUrl);
               
            }

            // Set service history if available
            if (response.data.service_h) {
                setServiceHistory(response.data.service_h);
               
            }
            
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

    const handleImage = ()=> {
        const newTab = window.open();
        newTab.document.body.innerHTML = `img`
        
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Top Bar */}
            <header className="bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
                <div>
                    <h1 className="text-lg font-semibold">{applianceData.appliance?.a_name || ''} Details</h1>
                    {/* <p className="text-sm">Appliance ID: {applianceData.appliance?.a_id || ''}</p> */}
                </div>
                <div>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md mr-4">
                       <a href = {invoiceImage} target = "_blank">View Invoice</a>
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-8 rounded-md m-4" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>
            {/* Body Section */}
            <main className="p-6">
                <div>
                    <h2 className="text-xl font-bold mb-4">Appliance Details</h2>
                    <table className="min-w-full mb-6">
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold">Appliance Name:</td>
                                <td className="px-6 py-4 whitespace-nowrap font">{applianceData.appliance?.a_name || ''}</td>
                            </tr>
                            {/* <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold">Appliance Id:</td>
                                <td className="px-6 py-4 whitespace-nowrap">{applianceData.appliance?.a_id || ''}</td>
                            </tr> */}
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold">Purchase Date:</td>
                                <td className="px-6 py-4 whitespace-nowrap">{applianceData.appliance?.purchase_date ? new Date(applianceData.appliance.purchase_date).toLocaleDateString() : ''}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold">Cost:</td>
                                <td className="px-6 py-4 whitespace-nowrap">Rs {applianceData.appliance?.cost || ''}</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold">Warranty:</td>
                                <td className="px-6 py-4 whitespace-nowrap"> {applianceData.appliance?.warranty_period || ''} years</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold">Warranty End Date:</td>
                                <td className="px-6 py-4 whitespace-nowrap">{applianceData.war_end_date && applianceData.war_end_date.length > 0 && applianceData.war_end_date[0].Warrenty_End_Date ? new Date(applianceData.war_end_date[0].Warrenty_End_Date).toLocaleDateString() : ''} </td>
                            </tr>
                            {/* Add more appliance details here as needed */}
                        </tbody>
                    </table>

                    {/* {invoiceImage && <img src={invoiceImage} alt="Invoice" />} Render invoice image if available */}

                    {/* Service History Table */}
                    <h2 className="text-xl font-bold mb-4 mt-8">Service History</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Description</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Cost</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {serviceHistory.map((service, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.s_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(service.service_date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.technician_name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.service_description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{service.service_cost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Add more details here as needed */}
                </div>
            </main>
        </div>
    );
};

export default ApplianceDetails;