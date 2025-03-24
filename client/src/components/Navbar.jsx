import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-navcolor text-white p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Glamour Salon</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <a href="#" className="hover:text-SecondaryColor transition">Home</a>
          <a href="#services" className="hover:text-SecondaryColor transition">Services</a>
          <a href="#packages" className="hover:text-SecondaryColor transition">Packages</a>
          <a href="#reviews" className="hover:text-SecondaryColor transition">Reviews</a>
          <a href="#contact" className="hover:text-SecondaryColor transition">Contact</a>

          {user ? (
            <>
              <span className="text-SecondaryColor font-medium">Hello, {user.name}!</span>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/signin" className="bg-SecondaryColor hover:bg-DarkColor text-white px-4 py-2 rounded-lg transition">
                Login
              </Link>
              <Link to="/signup" className="bg-SecondaryColor hover:bg-DarkColor text-white px-4 py-2 rounded-lg transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-DarkColor mt-4 rounded-lg p-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <a href="#" className="hover:text-SecondaryColor transition">Home</a>
            <a href="#services" className="hover:text-SecondaryColor transition">Services</a>
            <a href="#packages" className="hover:text-SecondaryColor transition">Packages</a>
            <a href="#reviews" className="hover:text-SecondaryColor transition">Reviews</a>
            <a href="#contact" className="hover:text-SecondaryColor transition">Contact</a>
            
            {user ? (
              <>
                <span className="text-SecondaryColor font-medium">Hello, {user.name}!</span>
                <button
                  onClick={onLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/signin" className="bg-SecondaryColor hover:bg-DarkColor text-white px-4 py-2 rounded-lg transition text-center">
                  Login
                </Link>
                <Link to="/signup" className="bg-SecondaryColor hover:bg-DarkColor text-white px-4 py-2 rounded-lg transition text-center">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
