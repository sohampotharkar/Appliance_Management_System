import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AddAppliance = () => {
    const navigate = useNavigate();
    const g_id = localStorage.getItem('g_id');
    const u_id = localStorage.getItem('userId');
    const [applianceName, setApplianceName] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [previousServiceDate, setPreviousServiceDate] = useState('');
    const [warrantyPeriod, setWarrantyPeriod] = useState('');
    const [cost, setCost] = useState(0);
    const [invoiceImage, setInvoiceImage] = useState(null);

    const handleFileChange = (e) => {
        setInvoiceImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('g_id', g_id);
        formDataToSend.append('u_id', u_id);
        formDataToSend.append('a_name', applianceName);
        formDataToSend.append('purchase_date', purchaseDate);
        formDataToSend.append('previous_service_date', previousServiceDate || null);
        formDataToSend.append('warranty_period', warrantyPeriod);
        formDataToSend.append('cost', cost);
        formDataToSend.append('document', invoiceImage);

        try {
            const response = await axios.post('http://localhost:5001/add-appliance', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data); // Assuming your backend returns some data
            navigate('/appliance'); // Redirect to home page after successful submission
        } catch (error) {
            console.error('Error adding appliance:', error);
            // Handle error, show error message to user, etc.
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Add Appliance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
            <label className="block mb-1">Appliance Name:</label>
            <input type="text" name="applianceName" value={applianceName} onChange={(e) => setApplianceName(e.target.value)} className="border border-gray-300 rounded px-4 py-2 w-full" required />
        </div>
        <div>
            <label className="block mb-1">Purchase Date:</label>
            <input type="date" name="purchaseDate" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} className="border border-gray-300 rounded px-4 py-2 w-full" required />
        </div>
        <div>
            <label className="block mb-1">Previous Service Date:</label>
            <input type="date" name="previousServiceDate" value={previousServiceDate} onChange={(e) => setPreviousServiceDate(e.target.value)} className="border border-gray-300 rounded px-4 py-2 w-full" />
        </div>
        <div>
            <label className="block mb-1">Warranty Period (in years):</label>
            <input type="number" name="warrantyPeriod" value={warrantyPeriod} onChange={(e) => setWarrantyPeriod(e.target.value)} className="border border-gray-300 rounded px-4 py-2 w-full"  />
        </div>
        <div>
            <label className="block mb-1">Cost:</label>
            <input type="number" name="cost" value={cost} onChange={(e) => setCost(e.target.value)} className="border border-gray-300 rounded px-4 py-2 w-full"  />
        </div>
        <div>
                    <label className="block mb-1">Invoice Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        name="invoiceImage"
                        onChange={handleFileChange}
                        className="border border-gray-300 rounded px-4 py-2 w-full"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Add Appliance
                </button>
            </form>
            <Link to="/appliance" className="block mt-4 text-blue-500">
                Cancel
            </Link>
        </div>
    );
};

export default AddAppliance;
