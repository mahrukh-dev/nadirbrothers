export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Brand Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                <span className="text-indigo-600 font-bold text-xl">NB</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white tracking-wide">
                  Nadir Brothers
                </h1>
                <p className="text-indigo-200 text-sm">Product Catalog</p>
              </div>
            </div>
          </div>
          
          {/* Navigation Info */}
          <div className="flex items-center space-x-2 text-white">
            <span className="text-lg">🛍️</span>
            <span className="font-medium">Shop Our Products</span>
          </div>
        </div>
      </div>
    </header>
  );
}
