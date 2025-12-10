import React from "react";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addToCart, getProductById } from "../lib/api";

const ProductDetail = () => {
  const { id } = useParams();

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
  });

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

  if (isLoading) {
    return <div className="p-8 text-center text-gray-600 text-lg">Loading product...</div>;
  }

  if (isError || !product) {
    return <div className="p-8 text-center text-red-500 text-lg">❌ Product not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-10 items-start bg-white rounded-2xl shadow-lg p-6">
        
        <div className="md:w-1/2 w-full overflow-hidden rounded-xl shadow-md">
          <img
            src={product.imageUrl || "/placeholder.png"}
            alt={product.name || "Product"}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>

        <div className="md:w-1/2 w-full space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800">{product.name}</h2>
          <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
          
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
            {product.category && (
              <span className="bg-green-100 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
                {product.category}
              </span>
            )}
          </div>

          <button  onClick={() => addToCartMutate({ productId: product._id })} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow-md transition-all">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
