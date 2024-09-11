import { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CreateSuppliers = () => {
  // State variables for managing form data and loading state
  const [SupplierName, setSupplierName] = useState('');
  const [ItemNo, setItemNo] = useState('');
  const [ItemName, setItemName] = useState('');
  const [ContactNo, setContactNo] = useState('');
  const [Email, setEmail] = useState('');
  const [Address, setAddress] = useState('');
  const [items, setItems] = useState([]); // State to hold all items (with ItemNo and ItemName)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch items data from the server when the component loads
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8076/inventories') // Assuming this endpoint returns items with ItemNo and ItemName
      .then((response) => {
        const itemsData = response.data.data; 
        if (Array.isArray(itemsData)) {
          setItems(itemsData); // Set items data to state
        } else {
          console.error('Unexpected response format:', response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching items:', error);
        setLoading(false);
      });
  }, []);

  // Event handler for when ItemNo is selected
  const handleItemNoChange = (e) => {
    const selectedItemNo = e.target.value;
    setItemNo(selectedItemNo);

    // Find the item based on the selected ItemNo and update ItemName
    const selectedItem = items.find(item => item.ItemNo === selectedItemNo);
    setItemName(selectedItem ? selectedItem.ItemName : '');
  };

  // Event handler for saving the Supplier with validation
  const handleSaveSupplier = () => {
    if (!SupplierName.trim()) {
      Swal.fire('Error', 'Supplier Name is required!', 'error');
      return;
    }
    if (!ItemNo.trim()) {
      Swal.fire('Error', 'Item No is required!', 'error');
      return;
    }
    if (!ContactNo.trim()) {
      Swal.fire('Error', 'Contact No is required!', 'error');
      return;
    }
    if (!/^[0-9]{10}$/.test(ContactNo)) {
      Swal.fire('Error', 'Contact No must be a valid 10-digit number!', 'error');
      return;
    }
    if (!Email.trim()) {
      Swal.fire('Error', 'Email is required!', 'error');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(Email)) {
      Swal.fire('Error', 'Email must be a valid email address!', 'error');
      return;
    }
    if (!Address.trim()) {
      Swal.fire('Error', 'Address is required!', 'error');
      return;
    }

    const data = {
      SupplierName,
      ItemNo,
      ItemName,
      ContactNo,
      Email,
      Address,
    };

    setLoading(true);
    axios
      .post('http://localhost:8076/suppliers', data)
      .then(() => {
        setLoading(false);
        Swal.fire('Success', 'Supplier created successfully!', 'success')
          .then(() => {
            navigate('/suppliers/allSupplier');
          });
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire('Error', 'An error happened. Please check console', 'error');
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton destination='/suppliers/allSupplier' />
      <h1 className="text-3xl my-4">Create Supplier</h1>
      {loading && <Spinner />}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Supplier Name</label>
          <input
            type="text"
            value={SupplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Item No</label>
          <select
            value={ItemNo}
            onChange={handleItemNoChange}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          >
            <option value="" disabled>Select Item No</option>
            {items.map((item) => (
              <option key={item.ItemNo} value={item.ItemNo}>
                {item.ItemNo}
              </option>
            ))}
          </select>
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Item Name</label>
          <input
            type="text"
            value={ItemName}
            readOnly
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Contact No</label>
          <input
            type="text"
            value={ContactNo}
            onChange={(e) => setContactNo(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Email</label>
          <input
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Address</label>
          <input
            type="text"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>

        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveSupplier}>
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateSuppliers;
