import axios from "axios";
import { axiosInstance } from "./axios";

export const signUp = async(signupData) => {
    const res = await axiosInstance.post("/auth/signup",signupData)
    return res.data;
}

export const getAuthUser = async()=>{
    try {
        const res = await axiosInstance.get("/auth/me");
        return res.data
        
    } catch (error) {
        console.log(error);
        return null;
    }
}


export const login = async(loginData)=>{
    const res = await axiosInstance.post("/auth/login",loginData);
    return res.data
}

export const logout =async()=>{
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
}

  // Adjust if your backend URL is different

export const getAllProducts = async () => {
  const res = await axiosInstance.get(`/product`);
  if (!res.data?.products) {
    return { products: [] };  // ✅ Always return a consistent shape
  }
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axiosInstance.get(`/product/${id}`);
  return res.data.product;
};

export const createProduct = async (formData) => {
  const res = await axiosInstance.post(`/product/add`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,  // If you use cookies for auth
  });
  return res.data;
};

export const updateProduct = async ({ id, formData }) => {
  const res = await axiosInstance.put(`/product/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axiosInstance.delete(`/product/delete/${id}`, { withCredentials: true });
  return res.data;
};

export const getCart = async () => {
  const res = await axiosInstance.get("/cart");
  return res.data.cart;
};

export const removeCartItem = async (productId) => {
  await axiosInstance.delete(`/cart/remove/${productId}`);
};

export const clearCart = async () => {
  await axiosInstance.delete("/cart/clear");
};

export const addToCart = async ({ productId }) => {
  await axiosInstance.post("/cart/add", { productId, quantity: 1 });
};

export const createOrder = async (orderData) => {
  const res = await axiosInstance.post("/order/add", orderData);
  return res.data;
};

export const getUserOrders = async () => {
  const res = await axiosInstance.get("/order/my");
  return res.data;
};
