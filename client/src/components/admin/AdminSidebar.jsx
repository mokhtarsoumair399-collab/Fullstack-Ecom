import { NavLink } from 'react-router-dom';

const AdminSidebar = () => (
  <aside className="admin-sidebar">
    <h3>Admin Panel</h3>
    <NavLink to="/admin/dashboard">Dashboard</NavLink>
    <NavLink to="/admin/products">Products</NavLink>
    <NavLink to="/admin/orders">Orders</NavLink>
    <NavLink to="/admin/users">Users</NavLink>
  </aside>
);

export default AdminSidebar;
