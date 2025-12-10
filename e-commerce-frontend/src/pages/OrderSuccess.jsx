// src/pages/OrderSuccess.jsx
import React from "react";
import { useParams, Link } from "react-router";

const OrderSuccess = () => {
  const { id } = useParams();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Placed Successfully!</h2>
      <p className="text-gray-700 mb-2">Your order ID is:</p>
      <p className="font-mono text-lg bg-gray-100 px-4 py-2 rounded mb-6">{id}</p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default OrderSuccess;
