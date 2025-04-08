import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  // Get the product data based on productId
  const fetchProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  // Load product data and scroll to top when productId or products change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 dark:border-none">
      {/* Product Display Section */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images Section */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Small product image thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer dark:border-gray-700"
                alt=""
              />
            ))}
          </div>

          {/* Large main product image */}
          <div className="w-full sm:w-[80%] relative">
            {/* 🔥 Bestseller Badge */}
            {productData.bestseller && (
              <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                🔥 Bestseller
              </span>
            )}
            <img
              className="w-full h-auto rounded-lg dark:border-gray-700"
              src={image}
              alt=""
            />
          </div>
        </div>

        {/* Product Information Section */}
        <div className="flex-1">
          {/* 🔥 Bestseller Badge (Above Product Name) */}
          {productData.bestseller && (
            <div className="mb-2 text-xs font-bold text-yellow-500 bg-yellow-100 px-3 py-1 rounded-md w-fit shadow">
              🔥 Bestseller
            </div>
          )}

          <h1 className="font-medium text-2xl mt-2 dark:text-gray-100">
            {productData.name}
          </h1>

          {/* Product Ratings */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5 dark:invert" />
            <img src={assets.star_icon} alt="" className="w-3.5 dark:invert" />
            <img src={assets.star_icon} alt="" className="w-3.5 dark:invert" />
            <img src={assets.star_icon} alt="" className="w-3.5 dark:invert" />
            <img
              src={assets.star_dull_icon}
              alt=""
              className="w-3.5 dark:invert"
            />
            <p className="pl-2">(122)</p>
          </div>

          {/* Product Price */}
          <p className="mt-5 text-3xl font-medium dark:text-gray-100">
            {currency}
            {productData.price}
          </p>

          {/* Product Description */}
          <p className="mt-5 text-gray-500 dark:text-gray-300 md:w-4/5">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 
                              bg-gray-100 dark:bg-gray-700 
                              dark:border-gray-600 dark:text-white 
                              ${
                                item === size
                                  ? "border-orange-500 bg-orange-500 text-white dark:bg-orange-600"
                                  : ""
                              }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              if (!size) {
                toast.error("⚠️ Please select a size before adding to cart!", {
                  position: "top-right",
                });
                return;
              }

              addToCart(productData._id, size);

              toast.success(
                <div className="text-center text-black">
                  🛒 Item has been added to your cart!
                  <br />
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => navigate("/cart")}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                    >
                      Go to Cart
                    </button>
                  </div>
                </div>,
                { position: "top-right", autoClose: 5000 }
              );
            }}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600 transition-all"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5 dark:border-gray-700" />

          {/* Extra Information */}
          <div className="text-sm text-gray-500 dark:text-gray-300 mt-5 flex flex-col gap-1">
            <p>✔️ High-end quality</p>
            <p>🚚 You can pay at the door</p>
            <p>🔄 Return and Refund Policy </p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className="mt-20">
        <div className="flex border-gray-300 dark:border-gray-700">
          <b className="border px-5 py-3 text-sm dark:text-white dark:border-gray-700">
            Description
          </b>
          <p className="border px-5 py-3 text-sm dark:text-white dark:border-gray-700">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500 dark:text-gray-300">
          <p>
            Hi, I’m Hans Kang, a web developer who loves building web
            applications, exploring new technologies, and continuously learning.
          </p>
          <p>
            I’m currently diving into frameworks like React, which I plan to
            implement here as I learn.
          </p>
        </div>
      </div>

      {/* Display Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
