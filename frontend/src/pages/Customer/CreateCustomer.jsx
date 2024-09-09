import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const CreateCustomer = () => {
    const [FirstName, setFirstName] = useState('');
    const [CusID, setCusID] = useState('');
    const [LastName, setLastName] = useState('');
    const [Age, setAge] = useState('');
    const [Gender, setGender] = useState('');
    const [ContactNo, setContactNo] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate Passwords Match
        if (Password !== reEnteredPassword) {
            setError('Passwords do not match.');
            return;
        }

        const data = {
            CusID,
            FirstName,
            LastName,
            Age,
            Gender,
            ContactNo,
            Email,
            UserName: CusID,  // Assuming UserName is set as CusID
            Password
        };

        console.log("Data being sent:", data);

        setLoading(true);
        try {
            await axios.post('http://localhost:8076/customers', data);
            setLoading(false);
            navigate('/customers');
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.response?.data || error.message);
            setError(error.response?.data || 'An error occurred. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        value={CusID}
                        onChange={(e) => setCusID(e.target.value)}
                        maxLength={10}
                        required
                    />
                </div>
                <div>
                    <label>First Name</label>
                    <input
                        type="text"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        value={ContactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        maxLength={10}
                        required
                    />
                </div>
                <div>
                    <label>Age</label>
                    <input
                        type="text"
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Gender</label>
                    <input
                        type="text"
                        value={Gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Re-enter Password</label>
                    <input
                        type="password"
                        value={reEnteredPassword}
                        onChange={(e) => setReEnteredPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default CreateCustomer;
