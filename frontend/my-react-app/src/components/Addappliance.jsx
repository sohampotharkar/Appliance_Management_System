import React, { useState } from 'react';
import axios from 'axios';

const AddApplianceForm = () => {
    const [formData, setFormData] = useState({
        applianceName: '',
        serviceDate: '',
        cost: '',
        purchaseDate: '',
        invoiceImage: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, invoiceImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { applianceName, serviceDate, cost, purchaseDate, invoiceImage } = formData;
        const u_id = localStorage.getItem('userId');
        const g_id = localStorage.getItem('groupId');

        const formDataToSend = new FormData();
        formDataToSend.append('applianceName', applianceName);
        formDataToSend.append('serviceDate', serviceDate);
        formDataToSend.append('cost', cost);
        formDataToSend.append('purchaseDate', purchaseDate);
        formDataToSend.append('invoiceImage', invoiceImage);
        formDataToSend.append('u_id', u_id);
        formDataToSend.append('g_id', g_id);

        try {
            const response = await axios.post('http://localhost:5000/add-appliance', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Handle success, maybe redirect or show a success message
        } catch (error) {
            console.error('Error adding appliance:', error);
            // Handle error, maybe show an error message
        }
    };

    return (
        <>
        hi
        <form onSubmit={handleSubmit}>
            <input type="text" name="applianceName" placeholder="Appliance Name" value={formData.applianceName} onChange={handleInputChange} />
            <input type="date" name="serviceDate" placeholder="Service Date" value={formData.serviceDate} onChange={handleInputChange} />
            <input type="number" name="cost" placeholder="Cost" value={formData.cost} onChange={handleInputChange} />
            <input type="date" name="purchaseDate" placeholder="Purchase Date" value={formData.purchaseDate} onChange={handleInputChange} />
            <input type="file" name="invoiceImage" onChange={handleFileChange} />
            <button type="submit">Submit</button>
        </form>
        </>
    );
};

export default AddApplianceForm;
