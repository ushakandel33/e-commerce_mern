// src/pages/MyOrders.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserOrders } from "../lib/api";

const MyOrders = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["myOrders"],
    queryFn: getUserOrders,
  });

  const orders = data?.orders || [];

  if (isLoading) return <div className="p-8 text-center">Loading orders...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load orders.</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-primary">🧾 My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 shadow bg-white">
              <p className="font-semibold text-gray-700 mb-2">Order ID: {order._id}</p>
              <p className="text-sm text-gray-500 mb-2">Status: {order.orderStatus}</p>
              <div className="grid md:grid-cols-2 gap-4">
                {order.products.map(item => (
                  <div key={item.product._id} className="flex items-center gap-4 border p-2 rounded">
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-2 font-bold text-blue-600">Total: ₹{order.totalAmount}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
