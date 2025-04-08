import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    
    // Link to the product details page
    <Link
      className="text-gray-700 cursor-pointer  dark:text-gray-100"
      to={`/product/${id}`}
    >
     {/* Product image with zoom effect on hover */}
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out  dark:text-gray-100"
          src={image[0]}
          alt=""
        />
      </div>

      {/* Product name */}
      <p className="pt-3 pb-1 text-md text-black dark:text-gray-50">{name}</p>
      
      {/* Product price */}
      <p className="text-sm font-medium dark:text-gray-300">
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
