import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  
  // Show search bar only on "collection" page
  useEffect(() => {
    setShowSearch(true);
    setVisible(location.pathname.includes("collection"));
  }, [location, setShowSearch]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 dark:bg-gray-800 text-center transition-all duration-300">
      {/* Search Input Box */}
      <div className="inline-flex items-center justify-center border border-gray-400 dark:border-gray-600 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white dark:bg-gray-700">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-2"
          type="text"
          placeholder="Search"
        />
        <img
          className="w-4 dark:invert"
          src={assets.search_icon}
          alt="Search Icon"
        />
      </div>

      {/* Button to close search bar */}
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer dark:invert"
        src={assets.cross_icon}
        alt="Close Icon"
      />
    </div>
  ) : null;
};

export default SearchBar;
