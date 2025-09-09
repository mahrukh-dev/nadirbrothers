import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  useEffect(() => {
    console.log("🚀 ProductCatalog component mounted, fetching products...");
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setError(null);
      console.log("📡 Fetching products from API...");
      const res = await API.get("/products");
      console.log("📦 Products received:", res.data);
      console.log("📦 Number of products:", res.data?.length || 0);
      setProducts(res.data || []);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setError(`Failed to load products: ${error.message}`);
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

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const availableCount = products.filter(p => p.isAvailable).length;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, showAvailableOnly]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-16 h-16 mb-4 border-b-4 border-indigo-600 rounded-full animate-spin"></div>
        <p className="font-medium text-gray-600">Loading our amazing products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center border border-red-200 bg-red-50 rounded-xl">
        <div className="mb-4 text-6xl">⚠️</div>
        <h2 className="mb-2 text-2xl font-bold text-red-800">Connection Error</h2>
        <p className="mb-4 text-red-600">{error}</p>
        <div className="mb-4 space-y-2 text-sm text-red-600">
          <p>Possible solutions:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Make sure backend is running on http://localhost:5000</li>
            <li>Check if MongoDB Atlas is connected</li>
            <li>Verify CORS settings in backend</li>
          </ul>
        </div>
        <button
          onClick={fetchProducts}
          className="px-6 py-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  console.log("🎨 Rendering ProductCatalog with", products.length, "products");

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="p-8 text-center bg-white shadow-lg rounded-2xl">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">
          Welcome to Nadir Brothers
        </h1>
        <p className="mb-6 text-xl text-gray-600">
          Discover our amazing collection of quality products
        </p>
        <div className="flex justify-center space-x-8 text-sm font-medium">
          <div className="px-4 py-2 rounded-lg bg-blue-50">
            <span className="text-blue-600">📦 {products.length} Total Products</span>
          </div>
          <div className="px-4 py-2 rounded-lg bg-green-50">
            <span className="text-green-600">✅ {availableCount} Available Now</span>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="p-6 bg-white shadow-lg rounded-2xl">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-xl text-gray-400">🔍</span>
            </div>
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-3 pl-10 pr-4 text-gray-900 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="availableOnly"
              checked={showAvailableOnly}
              onChange={(e) => setShowAvailableOnly(e.target.checked)}
              className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="availableOnly" className="text-sm font-medium text-gray-700">
              Show available only
            </label>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Showing {currentProducts.length} of {filteredProducts.length} products
          {totalPages > 1 && (
            <span className="ml-2 text-indigo-600">
              (Page {currentPage} of {totalPages})
            </span>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-white shadow-lg rounded-2xl">
          <div className="mb-6 opacity-50 text-8xl">
            {products.length === 0 ? "📦" : "🔍"}
          </div>
          <h3 className="mb-3 text-2xl font-bold text-gray-900">
            {products.length === 0 ? "No products available" : "No products found"}
          </h3>
          <p className="mb-4 text-lg text-gray-600">
            {products.length === 0 
              ? "Products added in admin panel will appear here" 
              : "Try adjusting your search criteria"}
          </p>
          <div className="text-sm text-gray-500">
            <p>Debug info: Total products in database: {products.length}</p>
            <p>Backend URL: {process.env.REACT_APP_API_URL || "http://localhost:5000/api"}</p>
          </div>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setShowAvailableOnly(false);
              }}
              className="mt-4 font-medium text-indigo-600 hover:text-indigo-800"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="p-6 mt-8 bg-white shadow-lg rounded-2xl">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
                </div>
                
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ← Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      const isCurrentPage = pageNumber === currentPage;
                      
                      // Show first page, last page, current page, and pages around current page
                      const showPage = 
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        Math.abs(pageNumber - currentPage) <= 1;

                      if (!showPage) {
                        // Show ellipsis for gaps
                        if (pageNumber === 2 && currentPage > 4) {
                          return <span key={pageNumber} className="px-2 text-gray-500">...</span>;
                        }
                        if (pageNumber === totalPages - 1 && currentPage < totalPages - 3) {
                          return <span key={pageNumber} className="px-2 text-gray-500">...</span>;
                        }
                        return null;
                      }

                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentPage(pageNumber)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            isCurrentPage
                              ? 'bg-indigo-600 text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNumber}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      
    </div>
  );
}
