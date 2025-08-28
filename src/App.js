import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCatalog from "./pages/ProductCatalog";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full py-8 px-4 sm:px-6 lg:px-8">
        <ProductCatalog />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
     