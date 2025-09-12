import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="transition-all duration-300 transform bg-white border border-gray-100 shadow-lg cursor-pointer rounded-xl hover:shadow-xl hover:-translate-y-2"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-t-xl">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-48 transition-transform duration-300 hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center text-gray-400">
              <div className="mb-2 text-4xl">📦</div>
              <p className="text-sm">No Image</p>
            </div>
          </div>
        )}
        
        {/* Availability Badge */}
        <div className="absolute flex gap-2 top-3 right-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-lg ${
              product.available 
                ? "bg-green-500 text-white" 
                : "bg-red-500 text-white"
            }`}
          >
            {product.available ? "✅ Available" : "❌ Out of Stock"}
          </span>

          {/* On Offer Badge */}
          {product.onOffer && (
            <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-black bg-yellow-500 rounded-full shadow-lg">
              🏷️ On Offer
            </span>
          )}
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-6">
       <h3 className="mb-2 text-lg font-bold text-gray-900 line-clamp-1">
          {product.name}
        </h3>
        
        {product.description && (
            <p className="h-10 mb-3 text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
        
        {/* Price */}
        <div className="flex items-center justify-between mt-2">
          <span className="text-2xl font-bold text-indigo-600">
             {product.price ? `Rs. ${product.price}` : "Contact for price"}
          </span>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-medium text-indigo-600">
            Click to view details
          </span>
          <span className="text-2xl">→</span>
        </div>
      </div>
    </div>
  );
}
