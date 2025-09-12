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
        <div className="w-16 h-16 mb-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
        <p className="font-medium text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-8 text-center border border-red-200 bg-red-50 rounded-xl">
        <div className="mb-4 text-6xl">⚠️</div>
        <h2 className="mb-2 text-2xl font-bold text-red-800">Product Not Found</h2>
        <p className="mb-4 text-red-600">{error || "The product you're looking for doesn't exist."}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
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
        className="flex items-center space-x-2 font-medium text-indigo-600 transition-colors hover:text-indigo-800"
      >
        <span className="text-xl">←</span>
        <span>Back to Products</span>
      </button>

      {/* Product Details */}
      <div className="overflow-hidden bg-white shadow-lg rounded-2xl">
        <div className="md:flex">
          {/* Product Image */}
          <div className="md:w-1/2">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-full h-96 md:h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-96 md:h-full bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="text-center text-gray-400">
                  <div className="mb-4 text-8xl">📦</div>
                  <p className="text-xl">No Image Available</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="p-8 md:w-1/2">
            <div className="space-y-6">
              {/* Product Title & Status */}
              <div>
                <h1 className="mb-4 text-3xl font-bold text-gray-900">{product.name}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    product.available 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.available ? "✅ Available Now" : "❌ Currently Out of Stock"}
                  </span>
                  {product.onOffer && (
                    <span className="inline-flex items-center px-4 py-2 text-sm font-medium text-orange-800 bg-orange-100 rounded-full">
                      🔥 Special Offer
                    </span>
                  )}
                </div>
                
                {/* Price */}
                {product.price && (
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-indigo-600">
                      Rs. {Number(product.price).toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">Product Description</h3>
                  <p className="leading-relaxed text-gray-600">{product.description}</p>
                </div>
              )}

              {/* Product Details */}
              <div>
                <h3 className="mb-3 text-lg font-semibold text-gray-900">Product Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Product ID:</span>
                    <span className="font-mono text-sm text-gray-600">{product._id}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-700">Availability:</span>
                    <span className={product.available ? "text-green-600" : "text-red-600"}>
                      {product.available ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  {product.price && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Price:</span>
                      <span className="text-gray-600">
                        Rs. {Number(product.price).toLocaleString()}
                      </span>
                    </div>
                  )}
                  {product.onOffer && (
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Special Offer:</span>
                      <span className="text-orange-600">Yes</span>
                    </div>
                  )}
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

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
