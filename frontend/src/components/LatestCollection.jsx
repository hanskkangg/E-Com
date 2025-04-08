import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  // Using useContext() hook
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  // Get the first 10 products from all available products
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-10 ">
      {/* Section heading and description */}
      <div className="text-center text-2xl py-8 dark:text-white">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
          Nokia today announced that it has acq uired Rapid’s technology assets,
          including the world’s largest API marketplace, and its highly skilled
          team.
        </p>
      </div>

      {/* Rendering products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
