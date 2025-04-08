import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");
  const [bestseller, setBestseller] = useState(false); 

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update selected categories
  const toggleCategory = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  // Update selected subcategories
  const toggleSubCategory = (e) => {
    setSubCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((item) => item !== e.target.value)
        : [...prev, e.target.value]
    );
  };

  // Apply all selected filters
  const applyFilter = () => {
    let productsCopy = products.slice();

    // Filter by search keyword
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter by main category
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // Filter by subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // Filter by bestseller tag
    if (bestseller) {
      productsCopy = productsCopy.filter((item) => item.bestseller === true);
    }

    setFilterProducts(productsCopy);
  };

  // Sort filtered products by price or default
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Re-apply filters when inputs change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, bestseller, search, showSearch, products]);

  // Re-sort when sort type changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-all duration-300">

      {/* Filter Options Section */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2 dark:text-gray-200"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Dropdown Icon"
          />
        </p>

        {/* Bestseller Filter */}
        <div
          className={`border border-gray-300 dark:border-gray-600 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium dark:text-gray-300">
            BESTSELLER
          </p>
          <div className="flex gap-2 text-sm font-light text-gray-700 dark:text-gray-400">
            <input
              className="w-3"
              type="checkbox"
              checked={bestseller}
              onChange={() => setBestseller(!bestseller)}
            />
            <p>Show Bestseller</p>
          </div>
        </div>

        {/* Category Filter Section */}
        <div
          className={`border border-gray-300 dark:border-gray-600 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium dark:text-gray-300">
            CATEGORIES
          </p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-gray-400">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Men"
                onChange={toggleCategory}
              />{" "}
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Women"
                onChange={toggleCategory}
              />{" "}
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Kids"
                onChange={toggleCategory}
              />{" "}
              Kids
            </p>
          </div>
        </div>

        {/* SubCategory Filter Section */}
        <div
          className={`border border-gray-300 dark:border-gray-600 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium dark:text-gray-300">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700 dark:text-gray-400">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Topwear"
                onChange={toggleSubCategory}
              />{" "}
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Bottomwear"
                onChange={toggleSubCategory}
              />{" "}
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value="Winterwear"
                onChange={toggleSubCategory}
              />{" "}
              Winterwear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Product Listing Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sorting Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 dark:border-gray-600 text-sm px-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded"
          >
            <option value="relavent">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Display Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <div key={index} className="relative">
              {/* 🔥 Bestseller Badge */}
              {item.bestseller && (
                <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                  🔥 Bestseller
                </span>
              )}

              <ProductItem
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
