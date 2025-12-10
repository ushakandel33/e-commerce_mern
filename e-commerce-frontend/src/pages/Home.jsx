import React from 'react';
import Navbar from '../components/Navbar';
import {Link} from 'react-router';
import Product from '../components/Product';
import Footer from '../components/Footer';
// import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {getAllProducts } from '../lib/api';

const Home = () => {
// const [product , setProduct] = 

const {data } = useQuery({
  queryKey:['products'],
  queryFn:getAllProducts
})
 const latestProducts = data?.products?.slice(-4).reverse() || [];
  return (
    <div className="min-h-screen bg-base-100">
    
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 py-12 max-w-7xl mx-auto">
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary">Welcome to Ecart</h1>
          <p className="text-gray-600 font-serif">
            Discover amazing products at unbeatable prices.
          </p>
          <Link
            to="/products"
            className="inline-block mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
          >
            Browse Products
          </Link>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0">
          <img
            src="/home-page.png"
            alt="E-commerce Hero"
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Product Showcase */}
      <section className="bg-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-primary">Latest Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {latestProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-10 px-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Check out our full product list!</h2>
        <Link
          to="/products"
          className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all"
        >
          View Products
        </Link>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

