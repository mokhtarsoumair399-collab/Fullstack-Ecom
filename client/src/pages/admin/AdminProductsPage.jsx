import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../components/admin/AdminSidebar';
import {
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct
} from '../../redux/slices/productSlice';

const initialForm = {
  name: '',
  description: '',
  price: '',
  category: '',
  stock: '',
  image: null
};

const AdminProductsPage = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.products);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== '') formData.append(key === 'image' ? 'image' : key, value);
    });

    if (editingId) {
      await dispatch(updateProduct({ id: editingId, formData }));
    } else {
      await dispatch(createProduct(formData));
    }

    setForm(initialForm);
    setEditingId('');
  };

  return (
    <section className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2>Manage Products</h2>
        <form className="product-form" onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} required />
          <input placeholder="Category" value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} required />
          <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} required />
          <input type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))} required />
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} required />
          <input type="file" accept="image/*" onChange={(e) => setForm((p) => ({ ...p, image: e.target.files?.[0] || null }))} />
          <button className="btn" type="submit">{editingId ? 'Update Product' : 'Create Product'}</button>
        </form>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td className="inline-actions">
                    <button
                      onClick={() => {
                        setEditingId(product._id);
                        setForm({
                          name: product.name,
                          description: product.description,
                          price: product.price,
                          category: product.category,
                          stock: product.stock,
                          image: null
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button className="danger" onClick={() => dispatch(deleteProduct(product._id))}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminProductsPage;
