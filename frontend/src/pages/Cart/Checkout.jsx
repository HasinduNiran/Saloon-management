import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
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
        setLoading(true);
        axios.get('http://localhost:8076/store')
            .then((response) => {
                const data = response.data;
                if (Array.isArray(data)) {
                    setStore(data);
                } else {
                    console.warn('Data is not an array:', data);
                    setStore([]);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching store data:', error);
                setStore([]);
                setLoading(false);
            });
    }, []);

    const { items, CusID, total } = location.state || {};

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleDeliveryChange = (e) => {
        const { name, value } = e.target;
        setDeliveryInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleCardChange = (e) => {
        const { name, value } = e.target;
        setCardInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    const validateForm = () => {
        if (!customerInfo.FirstName || !customerInfo.Email || !customerInfo.ContactNo) {
            Swal.fire("Validation Error", "Please fill in all customer details.", "error");
            return false;
        }
        if (!deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.postalCode) {
            Swal.fire("Validation Error", "Please fill in all delivery details.", "error");
            return false;
        }
        if (paymentMethod === "Card" && (!cardInfo.cardNumber || !cardInfo.expiryDate || !cardInfo.cvv)) {
            Swal.fire("Validation Error", "Please fill in all card details.", "error");
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
                    navigate("/my-orders");
                });
        } catch (error) {
            setLoading(false);
            Swal.fire("Error", "Failed to place order. Please try again.", "error");
        }
    };

    return (
        <div className="min-h-screen p-8 flex flex-col items-center">
            <div className="w-full lg:w-3/4 flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-10">
                {/* Left Side: Order Summary */}
                <div className="w-full lg:w-1/2 space-y-6">
                    <h1 className="text-3xl font-semibold mb-4">Order Summary</h1>
                    {items && items.length > 0 ? (
                        items.map((item) => (
                            <div key={item.ItemNo} className="flex justify-between items-center p-4 border-b">
                                <div className="flex gap-2 items-center">
                                    <img src={item.image} alt={item.ItemName} className="w-16 h-16 object-cover rounded" />
                                    <span className="font-medium">{item.ItemName}</span>
                                </div>
                                <span>Qty: {item.quantity !== undefined ? item.quantity : "N/A"}</span>
                                <span>
                                    ${item.SPrice && item.quantity
                                        ? (Number(item.SPrice) * Number(item.quantity)).toFixed(2)
                                        : "N/A"}
                                </span>
                            </div>
                        ))
                    ) : (
                        <p>No items to display</p>
                    )}
                    <div className="flex justify-between mt-4 font-semibold">
                        <span>Subtotal:</span>
                        <span>${total?.toFixed(2) || 0}</span>
                    </div>
                    <button
                        onClick={() => navigate("/cart")}
                        className="mt-4 w-full bg-gray-300 text-black py-2 rounded-full hover:bg-gray-400 transition duration-300"
                    >
                        Back to Cart
                    </button>
                </div>

                {/* Right Side: Customer Information */}
                <div className="w-full lg:w-1/2 p-6 bg-gray-100 rounded-lg space-y-4">
                    <h2 className="text-2xl font-semibold mb-4">Customer Information</h2>
                    <input
                        type="text"
                        name="FirstName"
                        placeholder="Name"
                        value={customerInfo.FirstName}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        name="Email"
                        placeholder="Email"
                        value={customerInfo.Email}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="ContactNo"
                        placeholder="Mobile No."
                        value={customerInfo.ContactNo}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                    />

                    {/* Delivery Info Section */}
                    <h2 className="text-xl font-semibold mt-4 mb-2">Delivery Information</h2>
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={deliveryInfo.address}
                        onChange={handleDeliveryChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={deliveryInfo.city}
                        onChange={handleDeliveryChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        value={deliveryInfo.postalCode}
                        onChange={handleDeliveryChange}
                        className="w-full p-2 border rounded"
                    />

                    {/* Payment Info Section */}
                    <h2 className="text-xl font-semibold mt-4 mb-2">Payment Information</h2>
                    <select
                        name="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="Cash">Cash</option>
                        <option value="Card">Card</option>
                    </select>

                    {/* Card Info Section (Only if Card is selected) */}
                    {paymentMethod === "Card" && (
                        <>
                            <input
                                type="text"
                                name="cardNumber"
                                placeholder="Card Number"
                                value={cardInfo.cardNumber}
                                onChange={handleCardChange}
                                className="w-full p-2 border rounded mt-2"
                            />
                            <input
                                type="text"
                                name="expiryDate"
                                placeholder="Expiry Date"
                                value={cardInfo.expiryDate}
                                onChange={handleCardChange}
                                className="w-full p-2 border rounded mt-2"
                            />
                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={cardInfo.cvv}
                                onChange={handleCardChange}
                                className="w-full p-2 border rounded mt-2"
                            />
                        </>
                    )}

                    {/* Place Order Button */}
                    <button
    onClick={handlePlaceOrder}
    className="mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition duration-300"
    disabled={loading}
>
    {loading ? "Placing Order..." : "Place Order"}
</button>

                </div>
            </div>
        </div>
    );
};

export default Checkout;

