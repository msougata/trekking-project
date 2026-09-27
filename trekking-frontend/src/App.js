// src/App.js
import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './Home';
import TrekPreferenceSelector from './TrekPreferenceSelector';
import TrekDifficultyList from './TrekDifficultyList';
import TrekPage from './Trekpage';
import TrekPage1 from './Trekpage1';
import TrekPage2 from './Trekpage2';
import TrekPage3 from './Trekpage3';
import TrekPage4 from './TrekPage4';
import TrekPage5 from './TrekPage5';
import TrekPage6 from './TrekPage6';
import TrekPage7 from './TrekPage7';
import TrekPage8 from './TrekPage8';
import TrekPage9 from './TrekPage9';
import TrekPage10 from './TrekPage10';
import CardGallery from './CardGallery';

import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import ChecklistChatbot from './ChecklistChatbot';
import SignUpPage from "./SignUpPage";
import OtpVerifyPage from "./OtpVerifyPage";
import LoginPage from "./LoginPage";
import ProfilePage from "./ProfilePage";
import ForgotPasswordRequestPage from "./ForgotPasswordRequestPage";
import ResetPasswordPage from "./ResetPasswordPage";
import Panel from './Panel';
import Cart from './cart';
import Admin from './admin';

// Import Buy-related components
import BuyPanel from './BuyPanel';
import BuyCart from './BuyCart';
import BuyAdmin from './BuyAdmin';
import Buy from './Buy';

// Import Review components


// Import the new review components
import ReviewList from './components/ReviewList';
import AddReview from './components/AddReview';

import './App.css';
import AuthStatusChecker from './components/AuthStatusChecker';
import { AuthContext } from './contexts/AuthContext';

function Navbar() {
  const { isAuthenticated, isLoading, handleLogout, userProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">MyTrek</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/trek/CardGallery">Trek</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/trek/AboutUs">AboutUs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/trek/ContactUs">ContactUs</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/trek/ChecklistChatBot">ChecklistChatBot</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/buy-panel">Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/buy-cart">Cart</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/reviews">Reviews</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/add-review">Write Review</Link>
            </li>
            
            {isLoading ? (
              <li className="nav-item">
                <span className="nav-link">
                  <small>Loading...</small>
                </span>
              </li>
            ) : isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    <span className="d-flex align-items-center">
                      <span className="profile-icon me-1">👤</span>
                      <span>{userProfile?.name || 'Profile'}</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/signup">SignUp</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer mt-auto py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 className="text-white mb-3">MyTrek</h5>
            <p className="text-white-50">
              Discover breathtaking treks, connect with nature, and embark on unforgettable adventures with MyTrek - your premier trekking partner.
            </p>
            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-sm text-white-50 hover-effect p-0 border-0 bg-transparent">
                <span className="fs-6 fw-bold">FB</span>
              </button>
              <button className="btn btn-sm text-white-50 hover-effect p-0 border-0 bg-transparent">
                <span className="fs-6 fw-bold">TW</span>
              </button>
              <button className="btn btn-sm text-white-50 hover-effect p-0 border-0 bg-transparent">
                <span className="fs-6 fw-bold">IG</span>
              </button>
              <button className="btn btn-sm text-white-50 hover-effect p-0 border-0 bg-transparent">
                <span className="fs-6 fw-bold">YT</span>
              </button>
            </div>
          </div>
          
          <div className="col-md-2 mb-4">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-white-50 text-decoration-none hover-effect">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/trek/CardGallery" className="text-white-50 text-decoration-none hover-effect">Treks</Link>
              </li>
              <li className="mb-2">
                <Link to="/trek/AboutUs" className="text-white-50 text-decoration-none hover-effect">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/trek/ContactUs" className="text-white-50 text-decoration-none hover-effect">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h5 className="text-white mb-3">Popular Treks</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/trek/everest" className="text-white-50 text-decoration-none hover-effect">Everest Base Camp</Link>
              </li>
              <li className="mb-2">
                <Link to="/trek/kedernath" className="text-white-50 text-decoration-none hover-effect">Kedarnath</Link>
              </li>
              <li className="mb-2">
                <Link to="/trek/sandakphu" className="text-white-50 text-decoration-none hover-effect">Sandakphu</Link>
              </li>
              <li className="mb-2">
                <Link to="/trek/ladakh" className="text-white-50 text-decoration-none hover-effect">Ladakh</Link>
              </li>
            </ul>
          </div>
          
          <div className="col-md-3 mb-4">
            <h5 className="text-white mb-3">Contact Us</h5>
            <ul className="list-unstyled text-white-50">
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2">📍</span>
                <span>123 Adventure St, Trekking City</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2">📞</span>
                <span>+1 (123) 456-7890</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <span className="me-2">✉️</span>
                <span>info@mytrek.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-secondary my-4" />
        
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
            <p className="text-white-50 mb-0">© 2023 MyTrek. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link to="/privacy-policy" className="text-white-50 text-decoration-none hover-effect">Privacy Policy</Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/terms-of-service" className="text-white-50 text-decoration-none hover-effect">Terms of Service</Link>
              </li>
              <li className="list-inline-item ms-3">
                <Link to="/cookie-policy" className="text-white-50 text-decoration-none hover-effect">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function App() {
  // State for buy-related components
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [buyItem, setBuyItem] = useState([]);

  // Fetch products from backend
  useEffect(() => {
    axios.get('http://localhost:8080/api/products')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("API response is not an array:", res.data);
          // Set fallback products
          setProducts([
            {
              id: 1,
              name: "Trekking Boots",
              price: 4500,
              description: "Waterproof hiking boots with excellent grip",
              imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlraW5nJTIwYm9vdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
            },
            {
              id: 2,
              name: "Trekking Pole",
              price: 1200,
              description: "Adjustable aluminum trekking pole",
              imageUrl: "https://m.media-amazon.com/images/I/61cVyMEbKoL._AC_UF1000,1000_QL80_.jpg"
            },
            {
              id: 3,
              name: "Backpack",
              price: 2800,
              description: "60L waterproof backpack for multi-day treks",
              imageUrl: "https://www.switchbacktravel.com/sites/default/files/image_fields/Best%20Of%20Gear%20Articles/Hiking%20and%20Backpacking/Daypacks/Osprey%20Talon%2022%20daypack%20%28hiking%20in%20Patagonia%29.jpg"
            }
          ]);
        }
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        // Set mock products for demo purposes if backend is not available
        setProducts([
          {
            id: 1,
            name: "Trekking Boots",
            price: 4500,
            description: "Waterproof hiking boots with excellent grip",
            imageUrl: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aGlraW5nJTIwYm9vdHN8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          },
          {
            id: 2,
            name: "Trekking Pole",
            price: 1200,
            description: "Adjustable aluminum trekking pole",
            imageUrl: "https://m.media-amazon.com/images/I/61cVyMEbKoL._AC_UF1000,1000_QL80_.jpg"
          },
          {
            id: 3,
            name: "Backpack",
            price: 2800,
            description: "60L waterproof backpack for multi-day treks",
            imageUrl: "https://www.switchbacktravel.com/sites/default/files/image_fields/Best%20Of%20Gear%20Articles/Hiking%20and%20Backpacking/Daypacks/Osprey%20Talon%2022%20daypack%20%28hiking%20in%20Patagonia%29.jpg"
          }
        ]);
      });
  }, []);

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navbar />
      <AuthStatusChecker />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trek/TrekPreferenceSelector" element={<TrekPreferenceSelector />} />
          <Route path="/trek/TrekDifficultylist" element={<TrekDifficultyList />} />
          <Route path="/trek/everest" element={<TrekPage />} />
          <Route path="/trek/kedernath" element={<TrekPage1 />} />
          <Route path="/trek/sandakphu" element={<TrekPage2 />} />
          <Route path="/trek/ladakh" element={<TrekPage3 />} />
          <Route path="/trek/trekpage4" element={<TrekPage4 />} />
          <Route path="/trek/trekpage5" element={<TrekPage5 />} />
          <Route path="/trek/trekpage6" element={<TrekPage6 />} />
          <Route path="/trek/trekpage7" element={<TrekPage7 />} />
          <Route path="/trek/trekpage8" element={<TrekPage8 />} />
          <Route path="/trek/trekpage9" element={<TrekPage9 />} />
          <Route path="/trek/trekpage10" element={<TrekPage10 />} />
          <Route path="/trek/CardGallery" element={<CardGallery />} />
      
          <Route path="/trek/AboutUs" element={<AboutUs />} />
          <Route path="/trek/ContactUs" element={<ContactUs />} />
          <Route path="/trek/ChecklistChatBot" element={<ChecklistChatbot />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify" element={<OtpVerifyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/forgot-password" element={<ForgotPasswordRequestPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* Gear Rental Routes */}
          <Route path="/trek/panel" element={<Panel />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />} />
          
          {/* Buy-related Routes */}
          <Route path="/buy-panel" element={<BuyPanel products={products} cart={cart} setCart={setCart} setBuyItem={setBuyItem} />} />
          <Route path="/buy-cart" element={<BuyCart cart={cart} setBuyItem={setBuyItem} setCart={setCart} />} />
          <Route path="/buy-admin" element={<BuyAdmin setProducts={setProducts} />} />
          <Route path="/buy" element={<Buy item={buyItem} setCart={setCart} />} />
          
          {/* New Review Routes */}
          <Route path="/reviews" element={<ReviewList />} />
          <Route path="/add-review" element={<AddReview />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
