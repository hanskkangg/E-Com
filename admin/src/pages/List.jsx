import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  // Get product list from backend
  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Delete product by ID
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Load product list on component mount
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">📦 Product List</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((item, index) => (
          <div
            key={index}
            className="relative bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col items-center text-center hover:shadow-lg transition duration-300"
          >
            {/* Bestseller Badge */}
            {item.bestseller && (
              <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                🔥 Bestseller
              </span>
            )}

            {/* Product Image */}
            <img
              className="w-24 h-24 object-cover rounded-md border"
              src={item.image[0]}
              alt={item.name}
            />

            {/* Product Details */}
            <h3 className="text-lg font-semibold mt-2 text-gray-700">
              {item.name}
            </h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="text-md font-semibold text-gray-800 mt-1">
              {currency}
              {item.price}
            </p>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-3">
              <button
                onClick={() => navigate(`/edit/${item._id}`)}
                className="px-4 py-1 text-sm bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300"
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => removeProduct(item._id)}
                className="px-4 py-1 text-sm bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300"
              >
                ❌ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
