import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/slices/authSlice';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.auth);

  const submit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (!result.error) navigate('/');
  };

  return (
    <section className="form-card">
      <h2>Create Account</h2>
      <form onSubmit={submit}>
        <input
          placeholder="Full Name"
          required
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          required
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        />
        {error ? <p className="error">{error}</p> : null}
        <button className="btn" type="submit" disabled={loading}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Sign in</Link></p>
    </section>
  );
};

export default RegisterPage;
