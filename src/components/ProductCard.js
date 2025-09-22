"use client"

import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export default function ProductCard({ product, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault() // Prevent navigation when clicking delete
    e.stopPropagation()
    if (window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      onDelete(product._id, product.name)
    }
  }



  // ✅ Universal availability check
  const isInStock = product.available === true || product.isAvailable === true || product.disavailable === false

  // Format dates if available
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  const manufacturingDate = formatDate(product.manufacturingDate)
  const expiryDate = formatDate(product.expiryDate)
  const categoryName = product.category?.name || product.category || "Uncategorized"

  return (
    <Link
      to={`/product/${product._id}`}
      className="relative block overflow-hidden transition-all duration-500 bg-white border shadow-sm cursor-pointer group border-gray-200/60 rounded-2xl hover:shadow-xl hover:-translate-y-1"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        {product.image ? (
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="object-cover w-full h-48 transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-48 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
            <div className="text-center text-gray-400">
              <div className="mb-2 text-4xl opacity-60">📦</div>
              <p className="text-sm font-medium">No Image Available</p>
            </div>
          </div>
        )}

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm shadow-lg border ${
              isInStock
                ? "bg-emerald-500/90 text-white border-emerald-400/50"
                : "bg-red-500/90 text-white border-red-400/50"
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isInStock ? "bg-emerald-200" : "bg-red-200"}`} />
            {isInStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* Offer Badge */}
        {product.onOffer && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full backdrop-blur-sm shadow-lg border border-orange-400/50">
              <span className="mr-1">🔥</span>
              Special Offer
            </span>
          </div>
        )}

        <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/5 via-transparent to-transparent group-hover:opacity-100" />
      </div>

      {/* Product Info */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 line-clamp-1 group-hover:text-indigo-600">
            {product.name}
          </h3>

          {product.description && (
            <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">{product.description}</p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-2 p-3 border border-gray-100 bg-gray-50/50 rounded-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-500">Manufacturing:</span>
            <span className="font-medium text-gray-700">{manufacturingDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-500">Expiry:</span>
            <span className="font-medium text-gray-700">{expiryDate}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-gray-500">Category:</span>
            <span className="font-medium text-gray-700">{categoryName}</span>
          </div>
        </div>

        {/* Price */}
        {product.price && (
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-bold text-indigo-600">Rs. {Number(product.price).toLocaleString()}</span>
              {product.onOffer && (
                <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 border border-orange-200 rounded-md">
                  Special Price
                </span>
              )}
            </div>
          </div>
        )}

        

      
        <div className="pt-2">
          <div className="inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-xl hover:bg-indigo-100 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 group-hover:bg-indigo-600 group-hover:text-white">
            View Details
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    
    </Link>
  )
}
