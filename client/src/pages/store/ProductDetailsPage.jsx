import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import { fetchProductById } from '../../redux/slices/productSlice';
import { resolveImageUrl } from '../../utils/routeHelpers';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const { selected: product } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <section className="details-layout">
      <img src={resolveImageUrl(product.imageUrl)} alt={product.name} />
      <div className="details-card">
        <p className="eyebrow">{product.category}</p>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <h3>${product.price}</h3>
        <p>Stock: {product.stock}</p>
        <div className="inline-actions">
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          />
          <button
            className="btn"
            onClick={async () => {
              if (!user?.token) {
                navigate('/login');
                return;
              }
              await dispatch(addToCart({ productId: product._id, quantity: qty }));
              navigate('/cart');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
