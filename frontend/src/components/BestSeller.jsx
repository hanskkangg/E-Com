import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  // Filter only bestseller products and limit to 5
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSellers(bestProduct.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10 bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* Section title and description */}
      <div className="text-center text-3xl py-8 dark:text-white">
        <Title text1="BEST" text2="SELLERS" />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
          Nokia today announced that it has acquired Rapid’s technology assets,
          including the world’s largest API marketplace, and its highly skilled
          team.
        </p>
      </div>

      {/* Rendering Best Sellers */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSellers.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            className="dark:border-gray-700 dark:text-white"
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
