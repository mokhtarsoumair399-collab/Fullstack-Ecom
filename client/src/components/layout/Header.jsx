import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(search)}`);
  };

  return (
    <header className="header">
      <div className="header-inner container">
        <Link to="/" className="logo">AMZ Panel</Link>
        <form className="search-box" onSubmit={handleSearch}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
          />
          <button type="submit">Search</button>
        </form>
        <nav className="header-nav">
          <Link to="/cart">Cart ({cart?.products?.length || 0})</Link>
          {user ? (
            <>
              <Link to="/orders">Orders</Link>
              {user.role === 'admin' && <Link to="/admin/dashboard">Admin</Link>}
              <button className="link-btn" onClick={() => dispatch(logout())}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
