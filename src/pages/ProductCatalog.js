import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAvailable, setFilterAvailable] = useState("all"); // all / available / unavailable
  const [filterOffer, setFilterOffer] = useState("all");         // all / onOffer / notOnOffer
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setError(null);
      const res = await API.get("/products");

      const normalizedProducts = res.data.map((p) => ({
        ...p,
        available: p.available === true || p.available === "true" || p.available === 1,
        onOffer: p.onOffer === true || p.onOffer === "true" || p.onOffer === 1,
      }));

      setProducts(normalizedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError(`Failed to load products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Filtering
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesAvailable = true;
    if (filterAvailable === "available") matchesAvailable = p.available === true;
    if (filterAvailable === "unavailable") matchesAvailable = p.available === false;

    let matchesOffer = true;
    if (filterOffer === "onOffer") matchesOffer = p.onOffer === true;
    if (filterOffer === "notOnOffer") matchesOffer = p.onOffer === false;

    return matchesSearch && matchesAvailable && matchesOffer;
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="p-8 text-center bg-white shadow-lg rounded-2xl">
        <h1 className="text-4xl font-bold">Welcome to Nadir Brothers</h1>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <div>📦 {products.length} Total Products</div>
          <div>✅ {products.filter(p => p.available).length} In Stock</div>
          <div>❌ {products.filter(p => !p.available).length} Out of Stock</div>
          <div>🏷️ {products.filter(p => p.onOffer).length} On Offer</div>
          <div>💰 {products.filter(p => !p.onOffer).length} Not on Offer</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col flex-wrap items-center justify-center gap-4 p-6 bg-white shadow-lg rounded-2xl md:flex-row">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-xl"
        />

        {/* Availability Filter */}
        <div className="relative">
          <select
            value={filterAvailable}
            onChange={(e) => setFilterAvailable(e.target.value)}
            className="px-4 py-3 pr-8 text-gray-900 bg-white border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">
              All Products ({products.length})
            </option>
            <option value="available">
              In Stock ({products.filter(p => p.available).length})
            </option>
            <option value="unavailable">
              Out of Stock ({products.filter(p => !p.available).length})
            </option>
          </select>
        </div>

        {/* Offer Filter */}
        <div className="relative">
          <select
            value={filterOffer}
            onChange={(e) => setFilterOffer(e.target.value)}
            className="px-4 py-3 pr-8 text-gray-900 bg-white border border-gray-300 appearance-none rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">
              All Offers ({products.length})
            </option>
            <option value="onOffer">
              On Offer ({products.filter(p => p.onOffer).length})
            </option>
            <option value="notOnOffer">
              Not on Offer ({products.filter(p => !p.onOffer).length})
            </option>
          </select>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
