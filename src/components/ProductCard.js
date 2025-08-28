export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        {product.image ? (
          <img
            src={`http://localhost:5000/uploads/${product.image}`}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <div className="text-4xl mb-2">📦</div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
            product.isAvailable 
              ? 'bg-green-500 text-white' 
              : 'bg-red-500 text-white'
          }`}>
            {product.isAvailable ? "✅ Available" : "❌ Out of Stock"}
          </span>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
          {product.name}
        </h3>
        
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 h-10">
            {product.description}
          </p>
        )}
        
      </div>
    </div>
  );
}
