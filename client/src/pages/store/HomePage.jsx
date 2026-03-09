import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/store/ProductCard';
import { fetchProducts } from '../../redux/slices/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const [params, setParams] = useSearchParams();
  const { items, loading } = useSelector((state) => state.products);

  const [category, setCategory] = useState(params.get('category') || '');
  const search = params.get('search') || '';

  useEffect(() => {
    dispatch(fetchProducts({ search, category }));
  }, [dispatch, search, category]);

  const categories = useMemo(() => [...new Set(items.map((item) => item.category))], [items]);

  return (
    <section>
      <div className="hero">
        <div>
          <p className="eyebrow">Ecommerce Dashboard UI</p>
          <h1>Find products inspired by Amazon-style shopping</h1>
        </div>
        <select
          value={category}
          onChange={(e) => {
            const next = e.target.value;
            setCategory(next);
            setParams((prev) => {
              const updated = new URLSearchParams(prev);
              if (next) updated.set('category', next);
              else updated.delete('category');
              return updated;
            });
          }}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading ? <p>Loading products...</p> : null}
      <div className="product-grid">
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default HomePage;
