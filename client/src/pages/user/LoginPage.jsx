import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/slices/authSlice';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { error, loading } = useSelector((state) => state.auth);

  const submit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (!result.error) {
      navigate(location.state?.from || '/');
    }
  };

  return (
    <section className="form-card">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
        />
        {error ? <p className="error">{error}</p> : null}
        <button className="btn" type="submit" disabled={loading}>Sign In</button>
      </form>
      <p>New customer? <Link to="/register">Create account</Link></p>
    </section>
  );
};

export default LoginPage;
