import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const EditProduct = ({ token }) => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // State for product fields
  const [product, setProduct] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  
  // Load product details on page load
  const fetchProductDetails = async () => {
    try {
      console.log(`Fetching: ${backendUrl}/api/product/single/${productId}`);
      const response = await axios.get(
        `${backendUrl}/api/product/single/${productId}`
      );

      if (response.data.success) {
        const prod = response.data.product;
        setProduct(prod);
        setName(prod.name);
        setDescription(prod.description);
        setPrice(prod.price);
        setCategory(prod.category);
        setSubCategory(prod.subCategory);
        setBestseller(prod.bestseller);
        setSizes(prod.sizes || []);

        if (prod.image && prod.image.length > 0) {
          setImage1(prod.image[0] || null);
          setImage2(prod.image[1] || null);
          setImage3(prod.image[2] || null);
          setImage4(prod.image[3] || null);
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch product details.");
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  // Toggle size selection
  const handleSizeSelection = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Submit updated product data
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", Number(price));
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller ? "true" : "false");
      formData.append("sizes", JSON.stringify(sizes));

      //Ensure only new images are sent
      if (image1 && typeof image1 === "object")
        formData.append("image1", image1);
      if (image2 && typeof image2 === "object")
        formData.append("image2", image2);
      if (image3 && typeof image3 === "object")
        formData.append("image3", image3);
      if (image4 && typeof image4 === "object")
        formData.append("image4", image4);

      const response = await axios.put(
        `${backendUrl}/api/product/update/${productId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data", token },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  return product ? (
    <div className="p-6 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <h2 className="text-xl font-semibold mb-4 cursor-pointer">
        Edit Product
      </h2>
      <form onSubmit={handleUpdateProduct} className="flex flex-col gap-4">
        {/* Upload Image Section */}
        <div className="flex gap-2">
          {[image1, image2, image3, image4].map((img, index) => (
            <label
              key={index}
              htmlFor={`image${index + 1}`}
              className="cursor-pointer"
            >
              <img
                className="w-20 h-20 object-cover border dark:border-gray-600"
                src={
                  img && typeof img === "object"
                    ? URL.createObjectURL(img)
                    : img || assets.upload_area
                }
                alt={`Upload Preview ${index + 1}`}
              />
              <input
                type="file"
                id={`image${index + 1}`}
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const setter = [setImage1, setImage2, setImage3, setImage4][
                      index
                    ];
                    setter(file);
                  }
                }}
              />
            </label>
          ))}
        </div>

        {/* Product Name */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border dark:bg-gray-800 dark:text-white"
          required
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border dark:bg-gray-800 dark:text-white"
          required
        />

        {/* Price */}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full px-3 py-2 border dark:bg-gray-800 dark:text-white"
          required
        />

        {/* Category & Subcategory */}
        <div className="flex gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 border dark:bg-gray-800 dark:text-white"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="px-3 py-2 border dark:bg-gray-800 dark:text-white"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        {/* Bestseller Checkbox */}
        <div className="flex gap-2 mt-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
          />
          <label>Bestseller</label>
        </div>

        {/* Sizes Selection */}

        <div>
          <p className="mb-2">Product Sizes</p>
          <div className="flex gap-3">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <div key={size} onClick={() => handleSizeSelection(size)}>
                <p
                  className={`${
                    sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"
                  } px-3 py-1 cursor-pointer`}
                >
                  {size}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-28 py-3 bg-black text-white dark:bg-gray-700"
        >
          Update
        </button>
      </form>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default EditProduct;
