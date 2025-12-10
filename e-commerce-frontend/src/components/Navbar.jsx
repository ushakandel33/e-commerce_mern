import React from "react";
import { Link, useNavigate } from "react-router";  // ✅ Fix import
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser";
import { logout } from "../lib/api";
import PageLoader from "./PageLoader";

const Navbar = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { authUser,isLoading} = useAuthUser();

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/login");
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  const isAdmin = authUser?.role==='admin';
if (isLoading)return <PageLoader/>
  return (
    <div className="bg-primary h-14 p-1 text-white w-full shadow-md top-0 left-0 z-50">
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          E-Cart
        </Link>

        <ul className="hidden md:flex gap-6 text-xl">
          { authUser?(
            <>
            <li><Link to="/" className="hover:text-gray-100 hover:underline font-semibold">Home</Link></li>
          <li><Link to="/products" className="hover:text-gray-100 hover:underline font-semibold">Products</Link></li>
          <li><Link to="/cart" className="hover:text-gray-100 hover:underline font-semibold">Cart</Link></li>
          <li><Link to="/orders" className="hover:text-gray-100 hover:underline font-semibold">My Order</Link></li>
            </>
          ):(
          <div></div>
          )}
          {isAdmin && (
            <li><Link to="/admin" className="hover:text-yellow-300 font-semibold">Admin Dashboard</Link></li>
          )}
        </ul>

        <div className="flex items-center gap-4">
          {authUser ? (
            <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white font-medium">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white font-medium">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
