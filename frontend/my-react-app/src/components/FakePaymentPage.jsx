import React, { useState } from 'react';

const FakePaymentPage = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [isSuccess, setIsSuccess] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Fake validation for demonstration purposes
        const cardNumberRegex = /^\d{16}$/; // 16 digit card number
        const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
        const cvvRegex = /^\d{3}$/; // 3-digit CVV

        if (!cardNumber.match(cardNumberRegex)) {
            alert('Invalid card number. It should be 16 digits.');
            return;
        }

        if (!expiryDate.match(expiryDateRegex)) {
            alert('Invalid expiry date. Use MM/YY format.');
            return;
        }

        if (!cvv.match(cvvRegex)) {
            alert('Invalid CVV. It should be 3 digits.');
            return;
        }

        // If validation passes, fake a successful payment
        setIsSuccess(true);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-semibold text-gray-800 mb-4">Fake Payment Page</h1>
            <p className="text-lg text-gray-700 mb-4">
                Please enter your credit/debit/prepaid card details below to complete the demo payment.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-4">
                    <label htmlFor="cardNumber" className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                    <input
                        type="text"
                        id="cardNumber"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter 16-digit card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        maxLength="16"
                        pattern="\d{16}"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="expiryDate" className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date (MM/YY)</label>
                    <input
                        type="text"
                        id="expiryDate"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="MM/YY"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        pattern="(0[1-9]|1[0-2])\/\d{2}"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="cvv" className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                    <input
                        type="text"
                        id="cvv"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Enter 3-digit CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        maxLength="3"
                        pattern="\d{3}"
                        required
                    />
                </div>

                <div className="mb-4">
                    <button
                        type="submit"
                        className="w-full px-6 py-3 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-700 transition duration-200 ease-in-out"
                    >
                        Complete Payment
                    </button>
                </div>
            </form>

            {/* Success Message */}
            {isSuccess !== null && (
                <div className={`mt-6 p-4 ${isSuccess ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} rounded-md`}>
                    {isSuccess ? 'Payment Successful! Thank you for your demo payment.' : 'Payment failed. Please check your details.'}
                </div>
            )}
        </div>
    );
};

export default FakePaymentPage;
