// src/components/Checkout.js
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { items, userId: CusID, total } = location.state || {};

    const [store, setStore] = useState([]);
    const [loading, setLoading] = useState(false);
    const [customerInfo, setCustomerInfo] = useState({
        FirstName: "",
        Email: "",
        ContactNo: "",
    });
    const [deliveryInfo, setDeliveryInfo] = useState({
        address: "",
        city: "",
        postalCode: "",
    });
    const [paymentMethod, setPaymentMethod] = useState("Cash");
    const [cardInfo, setCardInfo] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:8076/customers/${CusID}`);
                const { FirstName, Email, ContactNo } = response.data;
                setCustomerInfo({
                    FirstName: FirstName || "",
                    Email: Email || "",
                    ContactNo: ContactNo || ""
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching customer information:", error);
                Swal.fire("Error", "Failed to fetch customer information", "error");
                setLoading(false);
            }
        };

        if (CusID) {
            fetchCustomerInfo();
        }
    }, [CusID]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleDeliveryChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handlePaymentChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCardInfoChange = (e) => {
        const { name, value } = e.target;
        setCardInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        if (!customerInfo.FirstName || !customerInfo.Email || !customerInfo.ContactNo) {
            Swal.fire('Error', 'Please fill in all customer information fields.', 'error');
            return false;
        }
        if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.postalCode) {
            Swal.fire('Error', 'Please fill in all delivery information fields.', 'error');
            return false;
        }
        if (paymentMethod === 'Card' && (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv)) {
            Swal.fire('Error', 'Please fill in all card information fields.', 'error');
            return false;
        }
        return true;
    };

    const handlePlaceOrder = async () => {
        if (!validateForm()) return;

        setLoading(true);
        const orderData = {
            CusID,
            items,
            total,
            customerInfo,
            deliveryInfo,
            paymentMethod,
            cardInfo,
        };
        try {
            const response = await axios.post("http://localhost:8076/order", orderData);
            localStorage.removeItem("cart");
            setLoading(false);
            Swal.fire("Success", `Order placed successfully! Order ID: ${response.data.orderId}`, "success")
                .then(() => {
                    navigate(`/my-orders/${CusID}`);  // Navigate to My Orders page with CusID
                });
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", "Failed to place order. Please try again.", "error");
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-8 flex flex-col items-center">
            <div className="w-full max-w-4xl bg-gray-100 p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Customer Information</h2>
                    <input
                        type="text"
                        name="FirstName"
                        placeholder="First Name"
                        value={customerInfo.FirstName}
                        onChange={handleInputChange}
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        value={customerInfo.Email}
                        onChange={handleInputChange}
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="ContactNo"
                        placeholder="Contact Number"
                        value={customerInfo.ContactNo}
                        onChange={handleInputChange}
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Delivery Information</h2>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={deliveryInfo.address}
                        onChange={handleDeliveryChange}
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={deliveryInfo.city}
                        onChange={handleDeliveryChange}
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={deliveryInfo.postalCode}
                        onChange={handleDeliveryChange}
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <h2 className="text-2xl font-semibold mb-2">Payment Method</h2>
                    <select
                        value={paymentMethod}
                        onChange={handlePaymentChange}
                        className="block w-full mb-2 p-2 border border-gray-300 rounded"
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                    </select>
                    {paymentMethod === 'Card' && (
                        <div>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={cardInfo.cardNumber}
                                onChange={handleCardInfoChange}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="Expiry Date"
                                value={cardInfo.expiryDate}
                                onChange={handleCardInfoChange}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={cardInfo.cvv}
                                onChange={handleCardInfoChange}
                                className="block w-full mb-2 p-2 border border-gray-300 rounded"
                            />
                        </div>
                    )}
                </div>
                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
};

export default Checkout;
