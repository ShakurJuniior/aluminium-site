import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import supabase from "../utils/supabase";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("Fetching product with id:", id); // Debug
        const { data, error } = await supabase
          .from('products')
          .select(`
            id,
            name,
            description,
            specs,
            image_url,
            category:category_id ( name )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Product not found');

        setProduct({
          ...data,
          category: data.category.name,
          image: data.image_url
        });
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-blue-600 text-xl font-mono animate-pulse">Loading product...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-4">{error || "The product you're looking for doesn't exist."}</p>
          <Link to="/products" className="text-blue-600 hover:underline">Back to Products</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gradient-to-b from-white via-gray-50 to-gray-100 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-20">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-blue-600 text-white shadow-lg">
                  {product.category === "tiles" ? "Tiles" : "Aluminium"}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                <p className="text-lg text-gray-600 font-sans">
                  {product.description}
                </p>
              </div>

              {product.specs && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h2 className="font-heading text-xl font-semibold text-gray-800 mb-4">
                    Specifications
                  </h2>
                  <p className="font-sans text-gray-600 whitespace-pre-line">
                    {product.specs}
                  </p>
                </div>
              )}

              <div className="pt-4">
                <Link
                  to="/contact"
                  className="inline-block w-full md:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-all duration-300 font-semibold text-center shadow-md hover:shadow-lg"
                >
                  Request a Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;