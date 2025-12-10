import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"; // assuming you use axiosInstance with baseURL set
import { useNavigate } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { clearCart, getCart, removeCartItem } from "../lib/api";

const Cart = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!authUser,
  });
  const cart = data?.cart || { items: [] }

  const removeMutation = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  const clearMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries(["cart"]),
  });

  if (!authUser) return <div>Please log in to view your cart.</div>;
  if (isLoading) return <div>Loading cart...</div>;
  if (isError) return <div>Failed to load cart.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Your Cart</h2>

      {cart?.items?.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.items.map(({ product, quantity }) => (
              <div
                key={product._id}
                className="flex items-center justify-between border rounded p-4 shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">Qty: {quantity}</p>
                    <p className="text-blue-700 font-semibold">
                      ₹{product.price * quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeMutation.mutate(product._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={() => clearMutation.mutate()}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
