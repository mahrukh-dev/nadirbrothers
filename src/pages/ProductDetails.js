import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setError(null);
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (error) {
      console.error("Error fetching product:", error);
      setError("Failed to load product details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Product Not Found</h2>
        <p className="text-red-600 mb-4">{error || "The product you're looking for doesn't exist."}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Back to Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
      >
        <span className="text-xl">←</span>
        <span>Back to Products</span>
      </button>

      {/* Product Details */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 md:h-full object-cover"
              />
            ) : (
              <div className="w-full h-96 md:h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <div className="text-8xl mb-4">📦</div>
                  <p className="text-xl">No Image Available</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="md:w-1/2 p-8">
            <div className="space-y-6">
              {/* Product Title & Status */}
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                  product.isAvailable 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.isAvailable ? "✅ Available Now" : "❌ Currently Out of Stock"}
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Product Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Product ID:</span>
                    <span className="text-gray-600 font-mono text-sm">{product._id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Availability:</span>
                    <span className={product.isAvailable ? "text-green-600" : "text-red-600"}>
                      {product.isAvailable ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Added:</span>
                    <span className="text-gray-600">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-medium text-gray-700">Last Updated:</span>
                    <span className="text-gray-600">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Interested in this product?</h3>
                <p className="text-gray-600 mb-4">
                  Contact us for more information, pricing, or to place an order.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+1234567890"
                    className="flex-1 bg-indigo-600 text-white text-center py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-medium"
                  >
                    📞 Call Us
                  </a>
                  <a
                    href="mailto:info@nadirbrothers.com"
                    className="flex-1 bg-white text-indigo-600 border-2 border-indigo-600 text-center py-3 px-4 rounded-lg hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors font-medium"
                  >
                    📧 Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
