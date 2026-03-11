import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, Ruler, Layers, CheckCircle2, Send } from "lucide-react";
import supabase from "../utils/supabase";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Memoize parsed specs to avoid recalculation on each render
  const parsedSpecs = useMemo(() => {
    if (!product?.specs) return [];
    
    // Split by common delimiters and clean up
    return product.specs
      .split(/[,;\n]/)
      .map(spec => spec.trim())
      .filter(spec => spec.length > 0)
      .map(spec => {
        const parts = spec.split(/[:=]/);
        return parts.length === 2 
          ? { label: parts[0].trim(), value: parts[1].trim() }
          : { label: spec, value: null };
      });
  }, [product?.specs]);

  // Loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          .loading-spinner {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-slate-200 border-t-blue-600 rounded-full loading-spinner mx-auto mb-4"></div>
          <div className="text-slate-600 text-lg font-medium" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Loading product...
          </div>
        </div>
      </div>
    );
  }

  // Error / Not Found
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        `}</style>
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Product Not Found
          </h1>
          <p className="text-slate-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }
        
        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }
        
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-scale-in {
          animation: scaleIn 0.5s ease-out forwards;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        
        .image-shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .gradient-border {
          position: relative;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 2px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.5;
        }

        /* Mobile optimizations */
        @media (max-width: 1023px) {
          .sticky-mobile\:static {
            position: static;
          }
          .prose-mobile\:text-base {
            font-size: 1rem;
          }
          .grid-mobile\:gap-6 {
            gap: 1.5rem;
          }
        }
      `}</style>

      <main className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 min-h-screen py-6 md:py-16 noise-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 md:mb-12 transition-all duration-300 group opacity-0 animate-fade-in"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Products</span>
          </Link>

          {/* Main content grid */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Image section - sticky only on desktop */}
            <div className="opacity-0 animate-scale-in stagger-1 lg:sticky lg:top-8 self-start">
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50 gradient-border">
                {/* Image container */}
                <div className="relative aspect-square bg-gradient-to-br from-slate-100 to-slate-200">
                  {!imageLoaded && (
                    <div className="absolute inset-0 image-shimmer"></div>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                    <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-blue-600/95 backdrop-blur-sm text-white font-semibold text-xs sm:text-sm shadow-lg border border-white/20">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </div>
                  </div>
                </div>
                
                {/* Product meta info */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-white border-t border-slate-100">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                        <Package className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Product ID</p>
                        <p className="text-xs sm:text-sm font-mono font-semibold text-slate-700">#{product.id}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-100 rounded-full">
                      <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-700">In Stock</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content section */}
            <div className="space-y-6 md:space-y-8 opacity-0 animate-fade-in-up stagger-2">
              {/* Title and description */}
              <div className="space-y-4 md:space-y-6">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-3 md:mb-4 leading-tight">
                    {product.name}
                  </h1>
                  <div className="h-1 w-20 sm:w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 md:mb-6"></div>
                </div>
                
                {/* Description - fixed for proper line breaks and wrapping */}
                <div className="prose prose-sm sm:prose-base max-w-none w-full overflow-hidden">
                  <p className="text-slate-600 leading-relaxed text-base sm:text-lg whitespace-pre-wrap break-words hyphens-auto">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Specifications */}
              {parsedSpecs.length > 0 && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden opacity-0 animate-fade-in-up stagger-3">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                        <Ruler className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <h2 className="text-lg sm:text-2xl font-bold text-slate-900">
                        Specifications
                      </h2>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {parsedSpecs.map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-colors"
                        >
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-600 mt-1.5 sm:mt-2 flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            {spec.value ? (
                              <>
                                <p className="text-xs sm:text-sm font-semibold text-slate-900 mb-0.5 sm:mb-1">
                                  {spec.label}
                                </p>
                                <p className="text-xs sm:text-sm text-slate-600 font-mono break-words">
                                  {spec.value}
                                </p>
                              </>
                            ) : (
                              <p className="text-xs sm:text-sm text-slate-700 break-words">
                                {spec.label}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Features/Benefits */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-5 sm:p-8 shadow-2xl text-white opacity-0 animate-fade-in-up stagger-4">
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Layers className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                  <h2 className="text-lg sm:text-2xl font-bold">
                    Why Choose This Product?
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { title: 'Premium Quality', desc: 'Durable materials built to last' },
                    { title: 'Expert Installation', desc: 'Professional support available' },
                    { title: 'Weather Resistant', desc: 'Designed for all conditions' },
                    { title: 'Fast Delivery', desc: 'Quick turnaround times' }
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2 sm:gap-3">
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm sm:text-base mb-0.5 sm:mb-1">{feature.title}</p>
                        <p className="text-xs sm:text-sm text-blue-100">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 animate-fade-in-up stagger-5">
                <Link
                  to="/contact"
                  className="group relative overflow-hidden px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 font-semibold text-center shadow-lg flex-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-2">
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base">Request a Quote</span>
                  </div>
                </Link>
                
                <Link
                  to="/products"
                  className="px-6 py-4 sm:px-8 sm:py-5 bg-white border-2 border-slate-200 text-slate-700 rounded-xl hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 font-semibold text-center shadow-md hover:shadow-lg"
                >
                  <span className="text-sm sm:text-base">Browse More Products</span>
                </Link>
              </div>

              {/* Additional info */}
              <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4 sm:p-6 opacity-0 animate-fade-in-up stagger-5">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg sm:text-xl">💡</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-900 text-sm sm:text-base mb-1 sm:mb-2">
                      Need Help Choosing?
                    </h3>
                    <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                      Our expert team is here to help you select the perfect product for your project. Contact us for personalized recommendations and technical support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetails;