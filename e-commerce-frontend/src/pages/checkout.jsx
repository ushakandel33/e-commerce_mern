// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createOrder} from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";

const Checkout = () => {
  const { authUser } = useAuthUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    postalCode: "",
  });

  const { mutate: placeOrder, isPending } = useMutation({
    mutationFn: async () => {
      const res = await createOrder({
        userId: authUser._id,
        shippingAddress: address,
      });
    //   await clearCart();
    console.log(res.order)
      return res;
      
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(["cart"]);
      navigate(`/order-success/${res.order._id}`);
    },
    onError: () => {
      console.log("error checkout page")
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    placeOrder();
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">🚚 Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input
          type="text"
          placeholder="Full Name"
          value={address.name}
          onChange={(e) => setAddress({ ...address, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={address.phone}
          onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Street Address"
          value={address.street}
          onChange={(e) => setAddress({ ...address, street: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="City"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Postal Code"
            value={address.postalCode}
            onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold"
        >
          {isPending ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
