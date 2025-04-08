import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext'; 
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {

    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    // Find related products that match both category and subcategory
    useEffect(() => {
        if (products.length > 0) {
            // Create a copy of the products array
            let productsCopy = products.slice();
            
            // Filter products that match the same category
            productsCopy = productsCopy.filter((item) => category === item.category);
            
            // Filter products that match the same subcategory
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

            // Take the first 5 related products and set them in state
            setRelated(productsCopy.slice(0, 5));
        }
        
    }, [products]);

    return (
        <div className='my-24'>
            {/* Title for the related products section */}
            <div className='text-center text-3xl py-2'>
                <Title text1={'RELATED'} text2={"PRODUCTS"} />
            </div>

            {/* Display related products in a grid layout */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {related.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))}
            </div>
        </div>
    );
}

export default RelatedProducts;
