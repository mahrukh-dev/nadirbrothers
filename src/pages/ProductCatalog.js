import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setError(null);
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please check if the server is running.");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesAvailability = !showAvailableOnly || product.isAvailable;
    return matchesSearch && matchesAvailability;
  });

  const availableCount = products.filter(p => p.isAvailable).length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
        <p className="text-gray-600 font-medium">Loading our amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-red-800 mb-2">Connection Error</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchProducts}
          className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Nadir Brothers
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Discover our amazing collection of quality products
        </p>
        <div className="flex justify-center space-x-8 text-sm font-medium">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-600">📦 {products.length} Total Products</span>
          </div>
          <div className="bg-green-50 px-4 py-2 rounded-lg">
            <span className="text-green-600">✅ {availableCount} Available Now</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xl">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="availableOnly"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="availableOnly" className="text-sm font-medium text-gray-700">
              Show available only
            </label>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-8xl mb-6 opacity-50">
            {products.length === 0 ? "📦" : "🔍"}
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            {products.length === 0 ? "No products available" : "No products found"}
          </h3>
          <p className="text-gray-600 text-lg">
            {products.length === 0 
              ? "Check back later for new products" 
              : "Try adjusting your search criteria"}
          </p>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setShowAvailableOnly(false);
              }}
              className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}

      
    </div>
  );
}
