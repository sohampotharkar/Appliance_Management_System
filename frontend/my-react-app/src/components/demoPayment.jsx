import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';



const DemoPaymentPage = () => {
    const navigate=useNavigate();
    const PaymentPage = () =>{
        navigate('/fake-payment-page');
    }
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Demo Payment Page</h1>
            <p className="text-lg text-gray-700 mb-4">
                This is an initial servicing fee for your appliance.
            </p>
            <p className="text-lg text-gray-700 mb-4">
                The actual service fee may vary based on the condition and type of service your product requires.
            </p>
            <p className="text-lg text-gray-700 mb-4">
                The base difference will be calculated after your product is serviced, and the remaining amount will be taken from you once the servicing is completed.
            </p>
            <p className="text-lg font-semibold text-gray-800 mb-6">
                <strong>Initial Servicing Fee: <span className="text-green-500">$50</span></strong> (This is a demo fee and may vary)
            </p>

            {/* Payment Button */}
            <button className="px-6 py-3 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-700 transition duration-200 ease-in-out" onClick={PaymentPage}>
                Proceed to Payment
            </button>
        </div>
    );
};

export default DemoPaymentPage;
