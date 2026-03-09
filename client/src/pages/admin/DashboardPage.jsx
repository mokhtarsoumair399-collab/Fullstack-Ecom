import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from 'recharts';
import { fetchDashboardStats } from '../../redux/slices/adminSlice';
import AdminSidebar from '../../components/admin/AdminSidebar';

const colors = ['#1f7aec', '#47b881', '#f6a609', '#f43f5e', '#8b5cf6'];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchDashboardStats());
  }, [dispatch]);

  const monthData = (stats?.salesByMonth || []).map((value, index) => ({
    month: index + 1,
    sales: Number(value.toFixed(2))
  }));

  return (
    <section className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2>Analytics Dashboard</h2>
        <div className="kpi-grid">
          <article className="kpi-card"><p>Total Sales</p><h3>${stats?.summary?.totalSales?.toFixed(2) || 0}</h3></article>
          <article className="kpi-card"><p>Users</p><h3>{stats?.summary?.userCount || 0}</h3></article>
          <article className="kpi-card"><p>Orders</p><h3>{stats?.summary?.orderCount || 0}</h3></article>
          <article className="kpi-card"><p>Products</p><h3>{stats?.summary?.productCount || 0}</h3></article>
        </div>
        <div className="chart-grid">
          <article className="chart-card">
            <h4>Monthly Sales</h4>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={monthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#1f7aec" />
              </BarChart>
            </ResponsiveContainer>
          </article>
          <article className="chart-card">
            <h4>Products by Category</h4>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={stats?.categories || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
                  {(stats?.categories || []).map((entry, index) => (
                    <Cell key={`${entry.name}-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </article>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
