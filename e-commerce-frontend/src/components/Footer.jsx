import React from "react";
import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary  pt-10 pb-6 mt-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-green-800 text-2xl font-bold mb-3">Ecart</h2>
          <p className="text-sm">
            Your one-stop destination for quality products at the best prices. Explore, shop, and enjoy!
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-green-700 font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-lg">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/products" className="hover:text-white">Products</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/login" className="hover:text-white">Login</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-green-700 font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">Email: support@ecart.com</p>
          <p className="text-sm">Phone: +91 9876543210</p>
          <p className="text-sm">Address: Delhi, India</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-green-700 font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-white"><Facebook /></a>
            <a href="#" className="hover:text-white"><Instagram /></a>
            <a href="#" className="hover:text-white"><Twitter /></a>
            <a href="mailto:support@ecart.com" className="hover:text-white"><Mail /></a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Ecart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
