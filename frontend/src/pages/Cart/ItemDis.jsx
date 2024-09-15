import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemCard from './ItemCard';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ItemDis = () => {
    const { CusID } = useParams(); 
    //const { id } = useParams();  
    const [store, setStore] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [cussID, setcussID] = useState('');
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});

    useEffect(() => {
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

    const itemdis = store.find((item) => item.ItemNo.toString() === id);
    const recommendedItems = store.filter((item) => item.ItemNo.toString() !== id);

    const handleIncrease = () => setQuantity(quantity + 1);
    const handleDecrease = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:8076/customers/${CusID}`)
            .then((response) => {
                const data = response.data;
                setUserData(response.data);
                setcussID(data.CusID);
                //setContact_Number(data.phone);
                //setEmail(data.email);
                //setCustomer_Name(`${data.firstName} ${data.lastName}`);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert(`An error happened. Please check console`);
                console.log(error);
            });
    }, [CusID]);
    const handleAddToCart = () => {
        try {
            if (!itemdis) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Item details are not available.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
                return;
            }

            const cartItem = {
                CusID: CusID,
                ItemNo: itemdis.ItemNo,
                ItemName: itemdis.ItemName,
                image: itemdis.image,
                SPrice: itemdis.SPrice,
                quantity,
            };
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push(cartItem);
            localStorage.setItem('cart', JSON.stringify(cart));

            Swal.fire({
                title: 'Item added to cart successfully!',
                text: 'Would you like to view your cart or add more items?',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'Go to Cart',
                cancelButtonText: 'Add More',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/cart';
                }
            });
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while adding the item to the cart. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleBuyNow = () => {
        // Logic to buy the item immediately
        navigate('/checkout');
    };

    const fadeInStyle = {
        animation: 'fadeIn 1s ease-in-out'
    };

    const slideInStyle = {
        animation: 'slideIn 1s ease-in-out'
    };

    const bounceStyle = {
        animation: 'bounce 2s infinite'
    };

    const zoomInStyle = {
        animation: 'zoomIn 1s ease-in-out'
    };

    if (loading) {
        return <div style={fadeInStyle}>Loading...</div>;
    }

    if (!itemdis) {
        return <div style={slideInStyle}>Item not found</div>;
    }

    return (
        
        <div className="min-h-screen p-8 flex flex-col items-center" style={fadeInStyle}>
          <div className="bg-gray-200 py-8 px-4 md:px-6 h-[70vh] w-3/4 animate-fadeIn rounded-t-[20%]">
            <div className="w-2/3 flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-10">
                <div className="w-full lg:w-3/4" style={zoomInStyle}>
                    <img
                        className="rounded-xl w-full transition-transform duration-300 transform hover:scale-105"
                        src={itemdis?.image}
                        alt={itemdis?.ItemName}
                    />
                </div>
                <div className="w-full lg:w-1/2 space-y-6" style={slideInStyle}>
                    <h1 className="text-4xl font-semibold">{itemdis?.ItemName}</h1>
                    <p className="text-lg text-gray-600">{itemdis?.Description}</p>
                    <h2 className="text-2xl font-semibold">${itemdis?.SPrice}</h2>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleDecrease}
                            className="px-4 py-2 bg-gray-200 rounded-full"
                        >
                            -
                        </button>
                        <span className="text-xl">{quantity}</span>
                        <button
                            onClick={handleIncrease}
                            className="px-4 py-2 bg-gray-200 rounded-full"
                        >
                            +
                        </button>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition duration-300"
                        >
                            Add to Cart
                        </button>
                        {/* <button
                            onClick={handleBuyNow}
                            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                            style={bounceStyle}
                        >
                            Buy Now
                        </button> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-2/3 mt-16">
                <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
                <div className="overflow-x-hidden whitespace-nowrap mb-5">
                <div style={styles.inputGroup}>
                        <label style={styles.label}>Customer ID</label>
                        <input
                            type='text'
                            value={cussID}
                            onChange={(e) => setcussID(e.target.value)}
                            style={styles.input}
                        />
                    </div>
                    <div className="flex space-x-4">
                        {recommendedItems.length > 0 ? (
                            <div className="flex flex-wrap gap-8 justify-center">
                                {recommendedItems.map((item) => (
                                    <ItemCard
                                        key={item.ItemNo}
                                        ItemNo={item.ItemNo}
                                        image={item.image}
                                        ItemName={item.ItemName}
                                        SPrice={item.SPrice}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>No recommended items found</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemDis;
