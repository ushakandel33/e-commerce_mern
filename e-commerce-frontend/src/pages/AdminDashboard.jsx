import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";  // ✅ Fixed
// import { jwtDecode } from "jwt-decode";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, getAllProducts } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";

export default function AdminDashboard() {
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");

  // ✅ Check Token and Role
  const { authUser, isLoading } = useAuthUser();
  console.log(authUser.role)
  useEffect(() => {
     // ✅ Expecting actual token string
    if (!authUser) {
      navigate("/login");
      return;
    }
    try {
      if (authUser?.role !== "admin") {
        navigate("/login");
        return;
      }
      setAuthChecked(true);
    } catch (err) {
      console.error("Token invalid:", err);
      navigate("/login");
    }
  }, [authUser,navigate]);

  // ✅ Get Products
  const { data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    enabled: authChecked,  // Only run if verified
  });

  const products = data?.products || [];

  // ✅ Create Product
  const { mutate: createProductMutate, isPending: isCreating } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      resetForm();
      alert("✅ Product created");
    },
    onError: () => {
      alert("❌ Failed to create product");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price || !description || !image || !category) return alert("Fill all fields");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);
    createProductMutate(formData);
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setDescription("");
    setImage(null);
    setCategory("");
  };

  // ✅ Delete Product
  const { mutate: deleteProductMutate } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Product deleted");
    },
    onError: () => {
      console.log('product creation failed')
    },
  });

  const handleDelete = (id) => {
    if (window.confirm("Delete this product?")) {
      deleteProductMutate(id);
    }
  };

  if (!authChecked) return <div className="p-6 text-center text-gray-600">Checking admin access...</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto bg-gradient-to-b from-slate-100 to-white min-h-screen">
      <h1 className="text-3xl font-extrabold text-center text-primary mb-6">Admin Dashboard</h1>

      {/* Create Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-xl p-6 space-y-4 mb-10 border">
        <h2 className="text-xl font-bold mb-2 text-green-700">Create New Product</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded shadow-sm" required />
          <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="border p-2 rounded shadow-sm" required />
        </div>
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 rounded w-full shadow-sm" required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="border p-2 rounded shadow-sm" required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="border p-2 rounded shadow-sm text-green-600" required />
        <button type="submit" disabled={isCreating} className="w-full bg-green-500 text-white py-2 rounded hover:bg-primary transition font-semibold">
          {isCreating ? "Uploading..." : "Create Product"}
        </button>
      </form>

      {/* Product List */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Product List</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading products...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load products</p>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-lg bg-white overflow-hidden">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-xl text-gray-800">{product.name}</h3>
                <p className="text-blue-600 font-semibold">₹{product.price}</p>
                <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                <button onClick={() => handleDelete(product._id)} className="mt-4 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition text-sm">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
