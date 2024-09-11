import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { app } from "../../config/firebase";

const EditStore = () => {
    const [store, setStore] = useState({
        ItemNo: '',
        ItemName: '',
        Quantity: '',
        cost: '',
        SPrice: '',
        Description: '',
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const storage = getStorage(app);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:8076/store/${id}`)
            .then((response) => {
                const data = response.data;
                setStore(data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    text: 'An error occurred. Please try again later.',
                });
                console.log(error);
            });
    }, [id]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Check for errors before proceeding
    let errorMsg = "";

    if (store.SPrice <= 0 || isNaN(store.SPrice)) {
        errorMsg += "Selling Price must be a positive number.\n";
    }

    if (Object.values(errorMsg).some(err => err !== "")) {
        setLoading(false);
        Swal.fire({
            icon: 'error',
            text: 'Selling Price must be a positive number.',
        });
        return;
    }

    try {
        let imageUrl = store.image; // Default to the current image URL
        if (store.image && store.image instanceof File) {
            const storageRef = ref(storage, `store_images/${id}`);
            const uploadTask = uploadBytesResumable(storageRef, store.image);

            await uploadTask;

            imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
        }

        // Update store data with image URL
        const updatedStore = { ...store, image: imageUrl };
        axios.put(`http://localhost:8076/store/${id}`, updatedStore)
            .then((response) => {
                setLoading(false);
                if (response.status === 200) {
                    navigate(`/store/`);
                } else {
                    console.error('Unexpected response status:', response.status);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Unexpected response status. Please try again later.',
                    });
                }
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error updating store:', error);
                console.log('Response data:', error.response?.data);
                Swal.fire({
                    icon: 'error',
                    text: 'An error occurred while updating the store. Please try again later.',
                });
            });
    } catch (error) {
        setLoading(false);
        console.error('Error updating store:', error);
        Swal.fire({
            icon: 'error',
            text: 'An error occurred while updating the store. Please try again later.',
        });
    }
};

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        setStore(prevState => ({
            ...prevState,
            [name]: type === 'file' ? files[0] : value,
        }));
    };

    return (
        <div className="container">
            <style>{`
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #333;
                    text-align: center;
                    margin-bottom: 20px;
                }

                form {
                    display: flex;
                    flex-direction: column;
                }

                label {
                    margin-bottom: 5px;
                    color: #555;
                    font-weight: bold;
                }

                input[type="text"],
                input[type="number"],
                input[type="file"],
                input[type="email"],
                input[type="password"] {
                    padding: 10px;
                    margin-bottom: 15px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    font-size: 16px;
                    width: 100%;
                }

                button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    margin-top: 10px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                    font-size: 16px;
                }

                button:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                }

                button:hover {
                    background-color: #45a049;
                }

                @media screen and (max-width: 768px) {
                    .container {
                        padding: 10px;
                    }

                    input[type="text"],
                    input[type="number"],
                    input[type="file"],
                    input[type="email"],
                    input[type="password"] {
                        padding: 8px;
                        font-size: 14px;
                    }

                    button {
                        padding: 8px 16px;
                        font-size: 14px;
                    }
                }
            `}</style>
            {loading ? <Spinner /> : ""}
            <h1>Edit Items</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>ItemNo</label>
                    <input
                        type="text"
                        name="ItemNo"
                        value={store.ItemNo}
                        onChange={handleChange}
                        maxLength={10}
                        required
                        readOnly
                    />
                </div>
                <div>
                    <label>Item Name</label>
                    <input
                        type="text"
                        name="ItemName"
                        value={store.ItemName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        name="Description"
                        value={store.Description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Quantity</label>
                    <input
                        type="text"
                        name="Quantity"
                        value={store.Quantity}
                        onChange={handleChange}
                        maxLength={3}
                        required
                        readOnly
                    />
                </div>
                <div>
                    <label>Cost</label>
                    <input
                        type="number"
                        name="cost"
                        value={store.cost}
                        onChange={handleChange}
                        required
                        readOnly
                    />
                </div>
                <div>
                    <label>Selling Price</label>
                    <input
                        type="text"
                        name="SPrice"
                        value={store.SPrice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Item Updated"}
                </button>
            </form>
        </div>
    );
};

export default EditStore;
