import React, { useState } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../config/firebase";

const CreateStore = () => {
  const [ItemNo, setItemNo] = useState('');
  const [ItemName, setItemName] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [cost, setCost] = useState('');
  const [SPrice, setSPrice] = useState('');
  const [image, setImage] = useState(null);
  const [Description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const storage = getStorage(app);

  const validateFields = () => {
    let valid = true;
    let errorMsg = "";
  
    if (!ItemNo || ItemNo.length > 10) {
      errorMsg += "ItemNo must be a non-empty string with a maximum length of 10.\n";
      valid = false;
    }
    if (!ItemName) {
      errorMsg += "Item Name is required.\n";
      valid = false;
    }
    if (!Description) {
      errorMsg += "Description is required.\n";
      valid = false;
    }
    if (!Quantity || !/^[1-9]\d{0,2}$/.test(Quantity)) {
      errorMsg += "Quantity must be a positive integer greater than zero and with a maximum length of 3.\n";
      valid = false;
    }
    if (!cost || isNaN(cost) || cost <= 0) {
      errorMsg += "Cost must be a positive number.\n";
      valid = false;
    }
    if (!SPrice || isNaN(SPrice) || SPrice <= 0) {
      errorMsg += "Selling Price must be a positive number.\n";
      valid = false;
    }
  
    if (!valid) {
      setError(errorMsg);
    }
  
    return valid;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateFields()) return;

    const storageRef = ref(storage, `store_images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const data = {
            ItemNo,
            ItemName,
            Quantity,
            cost,
            SPrice,
            Description,
            image: downloadURL,
          };

          axios.post("http://localhost:8076/store", data)
            .then((response) => {
              if (response.status === 201) {
                Swal.fire({
                  title: "Item added successfully!",
                  icon: "success",
                  confirmButtonText: "Go to Stores",
                }).then(() => {
                  navigate("/store");
                });
              }
            })
            .catch((error) => {
              setError(error.message);
              setLoading(false);
            });
        });
      }
    );
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
        input[type="file"] {
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
          input[type="file"] {
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
      <h1>Add Items</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        <div>
          <label>ItemNo</label>
          <input
            type="text"
            value={ItemNo}
            onChange={(e) => setItemNo(e.target.value)}
            maxLength={10}
            required
          />
        </div>
        <div>
          <label>Item Name</label>
          <input
            type="text"
            value={ItemName}
            onChange={(e) => setItemName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <input
            type="text"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Quantity</label>
          <input
            type="text"
            value={Quantity}
            onChange={(e) => setQuantity(e.target.value)}
            maxLength={3}
            required
          />
        </div>
        <div>
          <label>Cost</label>
          <input
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <div>
          <label>Selling Price</label>
          <input
            type="number"
            value={SPrice}
            onChange={(e) => setSPrice(e.target.value)}
            min="0.01"
            step="0.01"
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Add Item"}
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
