import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../redux/slices/cartSlice';
import { checkout } from '../../redux/slices/orderSlice';

const CheckoutPage = () => {
  const [form, setForm] = useState({ fullName: '', address: '', card: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.orders);

  const submit = async (e) => {
    e.preventDefault();
    const result = await dispatch(checkout());
    if (!result.error) {
      dispatch(clearCart());
      alert('Payment simulated successfully. Order placed.');
      navigate('/orders');
    }
  };

  return (
    <section className="form-card">
      <h2>Checkout</h2>
      <p>Fake Stripe simulation for demo purposes.</p>
      <form onSubmit={submit}>
        <input
          required
          placeholder="Full Name"
          value={form.fullName}
          onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
        />
        <input
          required
          placeholder="Shipping Address"
          value={form.address}
          onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
        />
        <input
          required
          placeholder="Card Number"
          value={form.card}
          onChange={(e) => setForm((prev) => ({ ...prev, card: e.target.value }))}
        />
        {error ? <p className="error">{error}</p> : null}
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Pay & Place Order'}
        </button>
      </form>
    </section>
  );
};

export default CheckoutPage;
