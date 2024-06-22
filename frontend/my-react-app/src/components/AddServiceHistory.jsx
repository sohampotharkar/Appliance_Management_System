import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddServiceHistory = () => {
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceDate, setServiceDate] = useState('');
    const [serviceCost, setServiceCost] = useState('');
    const [technicianName, setTechnicianName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const a_id = localStorage.getItem('selectedApplianceId')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            // Make API call to add service history
            const response = await axios.post('http://localhost:5000/add-service-history', {
                a_id,
                service_description: serviceDescription,
                service_date: serviceDate,
                service_cost: serviceCost,
                technician_name: technicianName
            });
            console.log('Service history added successfully:', response.data);
            // Redirect to ApplianceDetails page after adding service history
            navigate('/appliance-details');
        } catch (error) {
            console.error('Error adding service history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold mb-6">Add Service History</h1>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceDescription">
                        Service Description
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="serviceDescription"
                        type="text"
                        placeholder="Enter service description"
                        value={serviceDescription}
                        onChange={(e) => setServiceDescription(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceDate">
                        Service Date
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="serviceDate"
                        type="date"
                        value={serviceDate}
                        onChange={(e) => setServiceDate(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceCost">
                        Service Cost
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="serviceCost"
                        type="text"
                        placeholder="Enter service cost"
                        value={serviceCost}
                        onChange={(e) => setServiceCost(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="technicianName">
                        Technician Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="technicianName"
                        type="text"
                        placeholder="Enter technician name"
                        value={technicianName}
                        onChange={(e) => setTechnicianName(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Service History'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddServiceHistory;
