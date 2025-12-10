import React from 'react';
import { Link } from 'react-router'; 
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addToCart } from '../lib/api';

const Product = ({ product, authUser }) => {
const queryClient = useQueryClient()
  const { mutate: addToCartMutate } = useMutation({
  mutationFn: addToCart,
  onSuccess: () => {
    alert("Added to cart");
    queryClient.invalidateQueries(["cart"]);
  },
  onError: () => {
    alert("Failed to add to cart");
  },
});

  return (<>
  <div  className="block border rounded-xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden bg-white">
  
    
    <Link
      to={`/product/${product._id}`}
      >
      <div>
        <img
          src={product.imageUrl || '/placeholder.png'}
          alt={product.name}
          className="w-full h-52 object-cover rounded-t-xl"
          />
      </div>

        <div className='p-4'>
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
        <p className="text-blue-700 font-semibold text-base mt-2">₹{product.price}</p>
        </div>
          </Link>
      <div >
        <button
          onClick={() => addToCartMutate({ productId: product._id })}
          className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold"
          >
          Add to Cart
        </button>
      </div>
          </div>
      </>
  );
};

export default Product;
