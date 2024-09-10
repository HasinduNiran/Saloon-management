import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Home Page</h1>
      <p style={styles.description}>
        This is a simple home page built with React. Explore more by navigating through the links!
      </p>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/appointments/allAppointment">Appointment</Link></li>
        <li style={styles.navItem}><Link to="/">Customer</Link></li>
        <li style={styles.navItem}><Link to="/employees/allEmployee">Employee</Link></li>
        <li style={styles.navItem}><Link to="/">Feedback</Link></li>
        <li style={styles.navItem}><Link to="/inventories/allInventory">Inventory</Link></li>
        <li style={styles.navItem}><Link to="/">Manager</Link></li>
        <li style={styles.navItem}><Link to="/pkg/allPkg">Package</Link></li>
        <li style={styles.navItem}><Link to="/">Payment</Link></li>
        <li style={styles.navItem}><Link to="/">ReadOneHome</Link></li>
        <li style={styles.navItem}><Link to="/services/allService">Service</Link></li>
        <li style={styles.navItem}><Link to="/suppliers/allSupplier">Supplier</Link></li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f8ff',
    color: '#333',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
    maxWidth: '600px',
  },
  navList: {
    listStyle: 'none',
    padding: 0,
    textAlign: 'left', // Aligns the list items to the left
  },
  navItem: {
    color: 'blue', // Sets the color to blue
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Home;
