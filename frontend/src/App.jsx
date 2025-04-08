import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';
import Cart from './pages/Cart';
import Login from './pages/Login';
import PlaceOrders from './pages/PlaceOrders';
import Orders from './pages/Orders';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';

const App = () => {
  
  // Check local storage for saved theme preference (dark mode)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Update the HTML class and localStorage when dark mode changes
   useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? "dark bg-[#FFF9F2] text-white" : "bg-[#FFF9F2] text-black"} px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`}>
      <ToastContainer />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <SearchBar />
      <Routes>

        {/* Set the default route "/" to show the Home component */}
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/product/:productId' element={<Product />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/place-order' element={<PlaceOrders />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/verify' element={<Verify />} />
        </Routes>
        <Footer isDarkMode={isDarkMode} />
    </div>

  )
}

export default App