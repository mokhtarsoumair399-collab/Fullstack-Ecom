import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchCart, removeCartItem, updateCartItem } from '../../redux/slices/cartSlice';
import { resolveImageUrl } from '../../utils/routeHelpers';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  useEffect(() => {
    if (user?.token) dispatch(fetchCart());
  }, [dispatch, user]);

  const total = (cart?.products || []).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  if (!user?.token) {
    return <p>Please <Link to="/login">login</Link> to view your cart.</p>;
  }

  return (
    <section>
      <h2>Your Cart</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {(cart?.products || []).map((item) => (
              <tr key={item.product._id}>
                <td className="product-cell">
                  <img src={resolveImageUrl(item.product.imageUrl)} alt={item.product.name} />
                  {item.product.name}
                </td>
                <td>${item.product.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(updateCartItem({ productId: item.product._id, quantity: Number(e.target.value) }))
                    }
                  />
                </td>
                <td>${item.quantity * item.product.price}</td>
                <td>
                  <button className="danger" onClick={() => dispatch(removeCartItem(item.product._id))}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="checkout-bar">
        <h3>Subtotal: ${total.toFixed(2)}</h3>
        <button className="btn" onClick={() => navigate('/checkout')} disabled={!cart?.products?.length}>
          Proceed to Checkout
        </button>
      </div>
    </section>
  );
};

export default CartPage;
