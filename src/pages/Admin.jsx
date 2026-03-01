import { useState } from "react";
import { Plus, Edit, Trash2, X, Check } from "lucide-react";

const AdminDashboard = () => {
  // Mock product data for design preview
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Curtain Wall Systems",
      category: "Facade",
      description: "Structural glazing systems for modern high-rise buildings.",
      specs: "Max span: 3m | U-value 1.2",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=200&auto=format",
    },
    {
      id: 2,
      name: "Minimal Sliding Doors",
      category: "Doors",
      description: "Ultra-slim profile sliding doors.",
      specs: "Max width: 6m | Height up to 3m",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&auto=format",
    },
  ]);

  const categories = ["Facade", "Doors", "Windows", "Ventilation", "Railings", "Renewable"];
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form state (just for design)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    specs: "",
    image: "",
  });

  const resetForm = () => {
    setFormData({ name: "", category: "", description: "", specs: "", image: "" });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData(product);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-heading text-3xl font-semibold text-gray-800">
            Product Dashboard
          </h1>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition shadow-md"
          >
            {showForm ? <X size={18} /> : <Plus size={18} />}
            {showForm ? "Cancel" : "Add Product"}
          </button>
        </div>

        {/* Add/Edit Form (visible when showForm is true) */}
        {showForm && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-md mb-10">
            <h2 className="font-heading text-xl font-semibold text-gray-800 mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Form submitted (demo)");
                resetForm();
              }}
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-sans text-sm text-gray-600 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <div>
                  <label className="block font-sans text-sm text-gray-600 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-sans text-sm text-gray-600 mb-1">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-gray-600 mb-1">
                  Specifications (e.g., "Max span: 3m | U-value: 1.2")
                </label>
                <input
                  type="text"
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block font-sans text-sm text-gray-600 mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <p className="text-xs text-gray-400 mt-1">
                  Use a publicly accessible image URL
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                  <Check size={18} />
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Product List */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200 p-6 shadow-md">
          <h2 className="font-heading text-xl font-semibold text-gray-800 mb-4">
            All Products ({products.length})
          </h2>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <h3 className="font-heading font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="font-sans text-sm text-gray-500">
                      {product.category} – {product.description.substring(0, 60)}...
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Delete this product?")) {
                        setProducts(products.filter((p) => p.id !== product.id));
                      }
                    }}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;