import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { fetchAllOrders, updateOrderStatus } from '../../redux/slices/adminSlice';

const AdminOrdersPage = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <section className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2>Orders Management</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6).toUpperCase()}</td>
                  <td>{order.userId?.name || 'N/A'}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td><span className={`tag ${order.status}`}>{order.status}</span></td>
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) =>
                        dispatch(updateOrderStatus({ id: order._id, status: e.target.value }))
                      }
                    >
                      <option value="pending">pending</option>
                      <option value="shipped">shipped</option>
                      <option value="delivered">delivered</option>
                    </select>
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

export default AdminOrdersPage;
