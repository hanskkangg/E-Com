import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//function to add product
const addProduct = async(req,res) =>{
    try {

        // Extract product details from request body    
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body


        // Extract uploaded images from request
        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]


        // Filter out undefined images
        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)


        // Upload images to Cloudinary and get URLs
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )


        // Prepare product data for saving
        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);



        // Create and save the new product in the database
        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// function for list product
const listProducts = async (req, res) => {
    try {
        
        // Retrieve all products from the database
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        // Delete product from database by ID
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { name, description, price, category, subCategory, bestseller, sizes } = req.body;

        let product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        //Log received files for debugging
        console.log("Received Files:", req.files);

        // Update text fields
        product.name = name;
        product.description = description;
        product.price = Number(price);
        product.category = category;
        product.subCategory = subCategory;
        product.bestseller = bestseller === "true";
        product.sizes = JSON.parse(sizes); 

        // Handle Image Uploads to Cloudinary
        const imageFields = ["image1", "image2", "image3", "image4"];
        let newImages = [];

        for (let field of imageFields) {
            if (req.files[field]) {
                const result = await cloudinary.uploader.upload(req.files[field][0].path, {
                    folder: "products"
                });
                newImages.push(result.secure_url);
            } else {
                newImages.push(product.image[imageFields.indexOf(field)]);
            }
        }

        // Ensure images are updated correctly
        product.image = newImages;

        await product.save();

        res.json({ success: true, message: "Product updated successfully!", updatedProduct: product });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const singleProduct = async (req, res) => {
    try {
        // Extract product ID from URL parameters
        const { productId } = req.params;

        // Find product by ID in the database
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, product });

    } catch (error) {
        console.error("Error fetching single product:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


export { listProducts, addProduct, removeProduct, singleProduct, updateProduct };
