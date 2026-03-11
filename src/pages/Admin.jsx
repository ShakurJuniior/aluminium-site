import { useState, useRef, useEffect } from "react";
import  supabase  from '../utils/supabase';
import { useAuth } from '../contexts/AuthContext';

import {
  Plus, Edit, Trash2, X, Save, ChevronLeft, ChevronRight,
  Package, Layers, Image as ImageIcon, XCircle,
  Menu, LayoutDashboard, LogOut, Search, Filter,
  CheckCircle2, AlertCircle
} from "lucide-react";

// ---------- Constants ----------
const CATEGORIES = ["tiles", "aluminium"];
const ITEMS_PER_PAGE = 6;

// ---------- Subcomponents (Toast & DeleteModal unchanged) ----------
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="fixed top-4 right-4 z-[100] animate-in slide-in-from-right-5 fade-in duration-300">
      <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-xl ${type === 'success' ? 'bg-emerald-500/95 text-white' : 'bg-red-500/95 text-white'}`}>
        {type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
        <span className="font-medium text-sm">{message}</span>
        <button onClick={onClose} className="ml-2 hover:bg-white/20 rounded-lg p-1">
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

const DeleteModal = ({ isOpen, productName, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in" onClick={onCancel} />
      <div className="relative bg-slate-800 rounded-3xl border border-slate-700 shadow-2xl max-w-md w-full animate-in zoom-in-95 fade-in">
        <div className="p-6">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <AlertCircle size={24} className="text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Delete Product?</h3>
          <p className="text-slate-400 mb-6">
            Are you sure you want to delete <span className="text-white font-semibold">"{productName}"</span>? This action cannot be undone.
          </p>
          <div className="flex gap-3">
            <button onClick={onConfirm} className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-red-500/50">
              Yes, Delete
            </button>
            <button onClick={onCancel} className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all border border-slate-600">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Image compression function (unchanged)
const compressImage = async (file, maxWidth = 800, maxHeight = 800, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

// ---------- Main Component ----------
const AdminDashboard = () => {
  const { logout } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", category: "", description: "", specs: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [toast, setToast] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, productId: null, productName: "" });
  const [showProducts, setShowProducts] = useState(true);
  const productListRef = useRef(null);

  // Helpers
  const showToast = (msg, type = 'success') => setToast({ message: msg, type });
  const resetForm = () => {
    setFormData({ name: "", category: "", description: "", specs: "", image: "" });
    setEditingId(null);
    setShowForm(false);
  };

  // Scroll on page change
  useEffect(() => {
    productListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage]);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    setLoading(true);
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
      .order('name');

    if (error) {
      console.error('Error fetching products:', error);
      showToast('Failed to load products', 'error');
    } else {
      // Transform data: category is returned as { name: 'tiles' }
      setProducts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handlers
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // 1. Compress image
      const compressedDataUrl = await compressImage(file);
      
      // 2. Convert data URL to Blob for upload
      const response = await fetch(compressedDataUrl);
      const blob = await response.blob();
      
      // 3. Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // 4. Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, blob);

      if (uploadError) throw uploadError;

      // 5. Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      // 6. Update formData with the public URL
      setFormData({ ...formData, image: publicUrlData.publicUrl });
    } catch (error) {
      console.error('Upload failed:', error);
      showToast('Failed to upload image', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get category ID from category name
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('id')
        .eq('name', formData.category)
        .single();

      if (categoryError) throw categoryError;

      const productData = {
        name: formData.name,
        category_id: categoryData.id,
        description: formData.description,
        specs: formData.specs,
        image_url: formData.image,
      };

      if (editingId) {
        // Update
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingId);
        if (error) throw error;
        showToast('Product updated successfully!');
      } else {
        // Insert
        const { error } = await supabase
          .from('products')
          .insert([productData]);
        if (error) throw error;
        showToast('Product added successfully!');
      }

      resetForm();
      fetchProducts(); // refresh list
    } catch (error) {
      console.error('Save error:', error);
      showToast('Failed to save product', 'error');
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category.name, // extract from joined object
      description: product.description,
      specs: product.specs || '',
      image: product.image_url,
    });
    setEditingId(product.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id, name) => {
    setDeleteModal({ isOpen: true, productId: id, productName: name });
  };

  const confirmDelete = async () => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', deleteModal.productId);
      if (error) throw error;
      showToast('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Delete error:', error);
      showToast('Failed to delete product', 'error');
    } finally {
      setDeleteModal({ isOpen: false, productId: null, productName: "" });
    }
  };

  const cancelDelete = () => setDeleteModal({ isOpen: false, productId: null, productName: "" });

  // Filtering & Pagination
  const filteredProducts = products.filter(p =>
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     p.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterCategory === "all" || p.category.name === filterCategory)
  );
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const goToPage = (page) => setCurrentPage(Math.min(Math.max(page, 1), totalPages));

  // Stats
  const tilesCount = products.filter(p => p.category?.name === 'tiles').length;
  const aluminiumCount = products.filter(p => p.category?.name === 'aluminium').length;

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, color: "blue" },
    { label: "Categories", value: CATEGORIES.length, icon: Layers, color: "purple" },
    { label: "Tiles", value: tilesCount, icon: ImageIcon, color: "amber" },
    { label: "Aluminium", value: aluminiumCount, icon: Package, color: "emerald" },
  ];

  // Navigation items (unchanged)
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, soon: false },
    { id: "products", label: "Products", icon: Package, soon: false },
    { id: "categories", label: "Categories", icon: Layers, soon: true },
  ];

  // Styling shortcuts
  const gradientText = "bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent";
  const buttonGradient = "bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg hover:shadow-amber-500/50 transition-all duration-300 font-semibold shadow-lg";
  const inputClass = "w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition placeholder-slate-500";

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <div className="text-amber-400 text-xl font-mono animate-pulse">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        * { font-family: 'DM Sans', sans-serif; }
        .font-mono { font-family: 'Space Mono', monospace; }
        .noise-bg { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E"); }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.5s ease-out forwards; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
      `}</style>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <DeleteModal isOpen={deleteModal.isOpen} productName={deleteModal.productName} onConfirm={confirmDelete} onCancel={cancelDelete} />

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-xl border-b border-amber-500/20 px-4 py-4 flex items-center justify-between shadow-lg">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-xl hover:bg-amber-500/10">
          <Menu size={24} className="text-amber-400" />
        </button>
        <h1 className={`font-bold text-lg ${gradientText}`}>AGNES ADMIN</h1>
        <div className="w-10" />
      </div>

      {/* Sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Mobile sidebar */}
      <aside className={`lg:hidden fixed top-0 left-0 z-[70] h-full w-72 bg-slate-900/95 backdrop-blur-xl border-r border-amber-500/20 shadow-2xl noise-bg transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`font-bold text-2xl ${gradientText} mb-1`}>AGNES</h2>
              <p className="text-slate-400 text-xs font-mono">ADMIN PANEL</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 hover:bg-amber-500/10">
              <X size={20} className="text-amber-400" />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            {navItems.map(item => {
              const active = (item.id === 'products' && showProducts) || (item.id === 'dashboard' && !showProducts);
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.soon) return;
                    setShowProducts(item.id === 'products');
                    setSidebarOpen(false);
                  }}
                  disabled={item.soon}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all ${
                    item.soon
                      ? 'text-slate-500 bg-slate-800/30 cursor-not-allowed opacity-60'
                      : active
                        ? 'text-white bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 shadow-lg shadow-amber-500/10'
                        : 'text-slate-300 hover:bg-amber-500/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className={active ? 'text-amber-400' : 'text-slate-400'} />
                    <span className={active ? 'font-semibold' : 'font-medium'}>{item.label}</span>
                  </div>
                  {item.soon && <span className="text-xs bg-slate-700/50 px-2 py-0.5 rounded-full">Soon</span>}
                </button>
              );
            })}
          </nav>

          {/* Sidebar stats */}
          <div className="mt-auto pt-6 border-t border-slate-700/50">
            <div className="space-y-3 mb-6">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{s.label}</span>
                  <span className={`font-mono font-bold text-${s.color}-400`}>{s.value}</span>
                </div>
              ))}
            </div>
            <button onClick={logout} className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-red-500/10 rounded-xl w-full border border-transparent hover:border-red-500/30">
              <LogOut size={20} className="text-slate-400 group-hover:text-red-400" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="pt-20 lg:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Desktop header */}
          <div className="hidden lg:block mb-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className={`font-bold text-3xl ${gradientText}`}>AGNES</h1>
                <p className="text-slate-500 text-xs font-mono">ADMIN PANEL</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-6 px-6 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  {stats.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{s.label}</span>
                      <span className={`font-mono font-bold text-${s.color}-400`}>{s.value}</span>
                    </div>
                  ))}
                </div>
                <button onClick={logout} className="p-2.5 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-700/50 text-slate-400 hover:text-red-400">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-slate-800/50 p-1.5 rounded-xl border border-slate-700/50">
                {navItems.map(item => {
                  const active = (item.id === 'products' && showProducts) || (item.id === 'dashboard' && !showProducts);
                  return (
                    <button
                      key={item.id}
                      onClick={() => !item.soon && setShowProducts(item.id === 'products')}
                      disabled={item.soon}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                        item.soon
                          ? 'text-slate-500 cursor-not-allowed opacity-60'
                          : active
                            ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-white border border-amber-500/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      <item.icon size={18} className={active ? 'text-amber-400' : ''} />
                      {item.label}
                      {item.soon && <span className="text-xs bg-slate-700/50 px-2 py-0.5 rounded-full ml-1">Soon</span>}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { resetForm(); setShowForm(!showForm); }} className={`inline-flex items-center gap-2 px-6 py-3 ${buttonGradient}`}>
                {showForm ? <X size={18} /> : <Plus size={18} />}
                {showForm ? "Cancel" : "Add Product"}
              </button>
            </div>
          </div>

          {/* Mobile header */}
          <div className="lg:hidden mb-8">
            <h1 className="font-bold text-3xl text-white mb-2">{showProducts ? 'Product Management' : 'Dashboard Overview'}</h1>
            <p className="text-slate-400 text-sm">{showProducts ? 'Manage your tiles and aluminium inventory' : 'View your stats and metrics'}</p>
          </div>

          {/* Mobile stats */}
          <div className="grid grid-cols-2 gap-3 mb-8 lg:hidden">
            {stats.map((s, i) => (
              <div key={i} className={`bg-gradient-to-br from-${s.color}-500/10 to-${s.color}-600/5 backdrop-blur-sm rounded-2xl border border-${s.color}-500/20 p-4 shadow-lg`}>
                <div className="flex flex-col gap-2">
                  <div className={`p-2 bg-${s.color}-500/20 rounded-xl w-fit`}>
                    <s.icon className={`w-5 h-5 text-${s.color}-400`} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                    <p className="text-2xl font-mono font-bold text-white">{s.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Form */}
          {showForm && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 lg:p-8 shadow-2xl mb-8 noise-bg">
              <h2 className="font-bold text-xl lg:text-2xl text-white flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                {editingId ? "Edit Product" : "Add New Product"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Product Name *</label>
                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} required placeholder="e.g., Premium Ceramic Tile" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">Category *</label>
                    <select id="category" value={formData.category} onChange={handleInputChange} required className={inputClass}>
                      <option value="">Select category</option>
                      {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Description *</label>
                  <textarea id="description" value={formData.description} onChange={handleInputChange} required rows="3" placeholder="Describe the product features and benefits..." className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Specifications</label>
                  <input type="text" id="specs" value={formData.specs} onChange={handleInputChange} placeholder="e.g., Size: 60x60cm, Thickness: 10mm" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Product Image *</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <input type="file" accept="image/*" onChange={handleFileChange} required={!editingId} className="flex-1 w-full bg-slate-900/50 border border-slate-700 text-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30 transition file:transition" />
                    {formData.image && (
                      <div className="relative group">
                        <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover rounded-xl border-2 border-amber-500/30 shadow-lg" />
                        <button type="button" onClick={() => setFormData({ ...formData, image: "" })} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition shadow-lg hover:bg-red-600">
                          <XCircle size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Image will be compressed and uploaded to cloud storage.</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button type="submit" className={`flex items-center justify-center gap-2 px-6 py-3 ${buttonGradient}`}>
                    <Save size={18} /> {editingId ? "Update Product" : "Save Product"}
                  </button>
                  <button type="button" onClick={resetForm} className="px-6 py-3 bg-slate-700/50 border border-slate-600 text-slate-300 rounded-xl hover:bg-slate-700 transition font-medium">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Search & Filter (only in products view) */}
          {showProducts && (
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition placeholder-slate-500" />
              </div>
              <div className="relative sm:w-48">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full bg-slate-800/50 border border-slate-700 text-white rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition appearance-none">
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Dashboard placeholder (when !showProducts) */}
          {!showProducts && (
            <div className="bg-slate-800/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-12 lg:p-16 shadow-xl text-center">
              <div className="inline-flex p-6 bg-slate-700/30 rounded-3xl mb-6">
                <LayoutDashboard className="w-16 h-16 text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Dashboard Overview</h3>
              <p className="text-slate-400 mb-6 max-w-md mx-auto">
                You're viewing the stats-only dashboard. Switch to "Products" tab to manage your inventory.
              </p>
              <button onClick={() => setShowProducts(true)} className={`inline-flex items-center gap-2 px-6 py-3 ${buttonGradient}`}>
                <Package size={18} /> View Products
              </button>
            </div>
          )}

          {/* Product Grid */}
          {showProducts && (
            <div ref={productListRef} className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-6 lg:p-8 shadow-2xl noise-bg">
              <h2 className="font-bold text-xl lg:text-2xl text-white mb-6 flex items-center gap-3">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                All Products <span className="font-mono text-slate-400 text-lg">({filteredProducts.length})</span>
              </h2>
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <div className="inline-flex p-6 bg-slate-700/30 rounded-3xl mb-4">
                    <Package className="w-16 h-16 text-slate-600" />
                  </div>
                  <p className="text-slate-400 text-lg mb-2">{searchQuery || filterCategory !== "all" ? "No products found" : "No products yet"}</p>
                  <p className="text-slate-500 text-sm">{searchQuery || filterCategory !== "all" ? "Try adjusting your search or filter" : "Add your first product to get started"}</p>
                </div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                    {paginatedProducts.map((product, idx) => (
                      <div key={product.id} className="group bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-amber-500/30 transition-all overflow-hidden hover:shadow-xl hover:shadow-amber-500/10">
                        <div className="relative aspect-square overflow-hidden">
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60" />
                          <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${product.category.name === 'tiles' ? 'bg-blue-500/80' : 'bg-emerald-500/80'} text-white`}>
                              {product.category.name.charAt(0).toUpperCase() + product.category.name.slice(1)}
                            </span>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-slate-400 mb-3 line-clamp-2">{product.description}</p>
                          {product.specs && (
                            <p className="text-xs font-mono text-slate-500 mb-4 flex items-center gap-2">
                              <span className="inline-block w-1 h-1 bg-amber-500 rounded-full" />
                              {product.specs}
                            </p>
                          )}
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(product)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 rounded-xl border border-amber-500/20">
                              <Edit size={16} /> Edit
                            </button>
                            <button onClick={() => handleDelete(product.id, product.name)} className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-xl border border-red-500/20">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 pt-6 border-t border-slate-700/50">
                      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="p-3 bg-slate-700/50 border border-slate-600 rounded-xl disabled:opacity-40 hover:bg-slate-700 text-white">
                        <ChevronLeft size={20} />
                      </button>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                          <button key={page} onClick={() => goToPage(page)} className={`w-10 h-10 rounded-xl font-mono font-semibold text-sm transition-all ${currentPage === page ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/50' : 'bg-slate-700/50 text-slate-400 hover:bg-slate-700 border border-slate-600'}`}>
                            {page}
                          </button>
                        ))}
                      </div>
                      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="p-3 bg-slate-700/50 border border-slate-600 rounded-xl disabled:opacity-40 hover:bg-slate-700 text-white">
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Mobile FAB */}
      <button onClick={() => { resetForm(); setShowForm(!showForm); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className={`lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center hover:shadow-amber-500/50 transition-all duration-300 ${showForm ? 'rotate-45' : 'rotate-0'}`}>
        <Plus size={24} className="text-white" />
      </button>
    </div>
  );
};

export default AdminDashboard;