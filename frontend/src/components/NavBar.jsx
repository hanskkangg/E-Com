import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  
  // Switch between dark and light mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    localStorage.setItem("theme", !isDarkMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  // Clear user session on logout
  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="font-mono text-gray-700 flex items-center justify-between py-5 font-medium bg-[#FFF9F2] dark:bg-gray-900 dark:text-white transition-colors duration-300 xl:text-5xl">
      <Link to="/">
        <p>ONPAPIER.</p>
      </Link>

      {/* Navigation links for desktop */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 dark:text-gray-300">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 dark:bg-gray-300 hidden" />
        </NavLink>
      </ul>

      {/* Icon section: dark mode, search, profile, cart */}
      <div className="flex items-center gap-6">
        
        {/* Dark mode button */}
        <button onClick={toggleDarkMode}>
          <img
            src={isDarkMode ? assets.sun_icon : assets.moon_icon}
            alt="Toggle Dark Mode"
            className="w-6 cursor-pointer"
          />
        </button>

        {/* Search button navigates to collection */}
        <img
          onClick={() => {
            setShowSearch(true);
            navigate("/collection");
          }}
          src={assets.search_icon}
          className="w-5 cursor-pointer dark:invert"
          alt="Search"
        />


        {/* Profile icon with dropdown on login */}
        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            className="w-5 cursor-pointer dark:invert"
            src={assets.profile_icon}
            alt="Profile"
          />
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300 rounded">
                <p className="cursor-pointer hover:text-black dark:hover:text-white">
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/orders")}
                  className="cursor-pointer hover:text-black dark:hover:text-white"
                >
                  Orders
                </p>
                <p
                  onClick={logout}
                  className="cursor-pointer hover:text-black dark:hover:text-white"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

      
        {/* Cart icon with item count */}
        <Link to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 min-w-5 dark:invert"
            alt="Cart"
          />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white dark:bg-white dark:text-black aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
