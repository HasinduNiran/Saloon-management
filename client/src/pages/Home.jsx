import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authslices'; // Assuming this exists in your auth slice
import woman from './woman.jpg';
import API_CONFIG from '../config/apiConfig';
import Swal from 'sweetalert2';
function SalonHomepage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState({services: false, packages: false, reviews: false});
  const [error, setError] = useState({services: null, packages: null, reviews: null});

  useEffect(() => {
    fetchServices();
    fetchPackages();
    fetchReviews();
  }, []);
  
  // Fetch services data
  const fetchServices = async () => {
    try {
      setLoading(prev => ({...prev, services: true}));
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SERVICES}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to fetch services');
      setServices(data);
    } catch (err) {
      setError(prev => ({...prev, services: err.message}));
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
        confirmButtonColor: '#89198f',
      });
    } finally {
      setLoading(prev => ({...prev, services: false}));
    }
  };

  // Fetch packages data
  const fetchPackages = async () => {
    try {
      setLoading(prev => ({...prev, packages: true}));
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PACK}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to fetch packages');
      setPackages(data);
    } catch (err) {
      setError(prev => ({...prev, packages: err.message}));
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
        confirmButtonColor: '#89198f',
      });
    } finally {
      setLoading(prev => ({...prev, packages: false}));
    }
  };

  // Fetch reviews/feedback data
  const fetchReviews = async () => {
    try {
      setLoading(prev => ({...prev, reviews: true}));
      const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FEEDBACK}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Failed to fetch reviews');
      setReviews(data);
    } catch (err) {
      setError(prev => ({...prev, reviews: err.message}));
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.message,
        confirmButtonColor: '#89198f',
      });
    } finally {
      setLoading(prev => ({...prev, reviews: false}));
    }
  };

  // Handle logout function
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="bg-PrimaryColor min-h-screen">
      {/* Dynamic Navbar */}
      <nav className="bg-navcolor text-white p-4 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">Glamour Salon</div>

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
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a href="/signin" className="bg-SecondaryColor hover:bg-DarkColor text-white px-4 py-2 rounded-lg transition">
                  Login
                </a>
                <a href="/signup" className="bg-SecondaryColor hover:bg-DarkColor text-white px-4 py-2 rounded-lg transition">
                  Sign Up
                </a>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <div className="relative w-full h-screen">
        <img
          src={woman}
          alt="Salon interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {user ? `Welcome Back, ${user.name}!` : 'Discover Your Beauty at Glamour Salon'}
            </h1>
            <p className="text-xl mb-8">
              {user ? 'Your next appointment awaits' : 'Premium beauty services since 2010'}
            </p>
            <a
              href="./appointment/CreateAppontment"
              className="bg-navcolor hover:bg-DarkColor text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-DarkColor mb-12">Our Premium Services</h2>

          {loading.services && (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-10 w-10 text-DarkColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
              </svg>
            </div>
          )}

          {error.services && !loading.services && (
            <div className="text-center text-red-600 py-8">
              <p>{error.services}</p>
              <button
                onClick={fetchServices}
                className="mt-4 bg-DarkColor text-white py-2 px-4 rounded-lg hover:bg-ExtraDarkColor"
              >
                Retry
              </button>
            </div>
          )}

          {!loading.services && !error.services && (
            <div className="overflow-x-auto no-scrollbar">
              <div className="flex space-x-6 pb-4" style={{ minWidth: 'max-content' }}>
                {services.length > 0 ? (
                  services.map(service => (
                    <div
                      key={service._id || service.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition flex-shrink-0 w-[300px]"
                    >
                      <img
                        src={service.image ? `${API_CONFIG.BASE_URL}${service.image}` : '/images/default-service.jpg'}
                        alt={service.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-DarkColor">{service.name}</h3>
                        <p className="text-gray-600 mt-2">{service.description || 'Premium service'}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div>
                            <span className="text-DarkColor font-bold text-lg">${service.price}</span>
                            <span className="text-gray-500 text-sm ml-2">({service.duration})</span>
                          </div>
                          <button className="bg-SecondaryColor hover:bg-DarkColor text-white px-4 py-2 rounded-lg transition">
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">No services available at the moment.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>      {/* Packages Section */}
      <section id="packages" className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-DarkColor mb-12">Special Packages</h2>
          
          {loading.packages && (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-10 w-10 text-DarkColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
              </svg>
            </div>
          )}

          {error.packages && !loading.packages && (
            <div className="text-center text-red-600 py-8">
              <p>{error.packages}</p>
              <button
                onClick={fetchPackages}
                className="mt-4 bg-DarkColor text-white py-2 px-4 rounded-lg hover:bg-ExtraDarkColor"
              >
                Retry
              </button>
            </div>
          )}

          {!loading.packages && !error.packages && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {packages.length > 0 ? (
                packages.map(pkg => (
                  <div key={pkg._id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition">
             
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-DarkColor">{pkg.p_name}</h3>
                      <p className="text-gray-600 mt-2">{pkg.package_type}</p>
                      <div className="mt-4">
                        <p className="text-gray-700"><span className="font-semibold">Category:</span> {pkg.category}</p>
                        <p className="text-gray-700 mt-1"><span className="font-semibold">Duration:</span> {pkg.start_date && pkg.end_date ? 
                          `${new Date(pkg.start_date).toLocaleDateString()} - ${new Date(pkg.end_date).toLocaleDateString()}` : 
                          'Available now'}</p>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <div>
                          <span className="text-DarkColor font-bold text-xl">${pkg.final_price ? pkg.final_price.toFixed(2) : '0.00'}</span>
                          {pkg.discount_rate > 0 && (
                            <span className="text-gray-500 text-sm ml-2">({pkg.discount_rate}% off)</span>
                          )}
                        </div>
                        <button className="bg-SecondaryColor hover:bg-DarkColor text-white px-6 py-2 rounded-lg transition">
                          Book Package
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-3">No packages available at the moment.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-DarkColor mb-12">What Our Clients Say</h2>
          
          {loading.reviews && (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-10 w-10 text-DarkColor" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z" />
              </svg>
            </div>
          )}

          {error.reviews && !loading.reviews && (
            <div className="text-center text-red-600 py-8">
              <p>{error.reviews}</p>
              <button
                onClick={fetchReviews}
                className="mt-4 bg-DarkColor text-white py-2 px-4 rounded-lg hover:bg-ExtraDarkColor"
              >
                Retry
              </button>
            </div>
          )}

          {!loading.reviews && !error.reviews && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {reviews.length > 0 ? (
                reviews.map(review => (
                  <div key={review._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-SecondaryColor flex items-center justify-center text-white font-bold mr-4">
                        {review.Username ? review.Username.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-DarkColor">{review.Username}</h3>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`h-5 w-5 ${i < review.star_rating ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{review.message}</p>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>Service: {review.serviceID || 'General Feedback'}</p>
                      <p className="mt-1">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-4">No reviews available at the moment.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-DarkColor text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Glamour Salon</h3>
              <p className="mb-4">Award-winning salon since 2010, providing luxury beauty services.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-SecondaryColor transition">Home</a></li>
                <li><a href="#services" className="hover:text-SecondaryColor transition">Services</a></li>
                <li><a href="#packages" className="hover:text-SecondaryColor transition">Packages</a></li>
                <li><a href="#reviews" className="hover:text-SecondaryColor transition">Reviews</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Info</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  456 Glamour Ave, Beauty City
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  (555) 123-4567
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  info@glamoursalon.com
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Hours</h3>
              <ul className="space-y-2">
                <li>Mon-Fri: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 9:00 AM - 6:00 PM</li>
                <li>Sunday: 10:00 AM - 4:00 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p>© 2025 Glamour Salon. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SalonHomepage;