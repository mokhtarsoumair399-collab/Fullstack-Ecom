import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { fetchUsers } from '../../redux/slices/adminSlice';

const AdminUsersPage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <section className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <h2>User Management</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className={`tag ${user.role === 'admin' ? 'shipped' : 'pending'}`}>{user.role}</span></td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminUsersPage;
