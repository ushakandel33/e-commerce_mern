import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../lib/api";
import Footer from "../components/Footer";
import { useNavigate } from "react-router"; // ✅ Fix for navigation

const Products = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Electronics", "Clothing", "Books", "Accessories"]; // Customize

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  const products = data?.products || [];

  // ✅ Filtering products by search + category
  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (query.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    return filtered;
  }, [products, query, category]);

  return (
    <>

      <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-6 text-primary">🛍️ Browse Products</h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/2 border p-2 rounded shadow-md focus:outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded shadow-md"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load products.</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/product/${product._id}`)} // ✅ Fixed navigation
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded mb-3"
                />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-blue-600 font-semibold mt-1">₹{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Products;
