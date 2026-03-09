import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchDashboardStats = createAsyncThunk('admin/stats', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/admin/stats');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
  }
});

export const fetchAllOrders = createAsyncThunk('admin/orders', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/orders');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch all orders');
  }
});

export const updateOrderStatus = createAsyncThunk('admin/orderStatus', async ({ id, status }, thunkAPI) => {
  try {
    const { data } = await api.put(`/orders/${id}/status`, { status });
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to update order');
  }
});

export const fetchUsers = createAsyncThunk('admin/users', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/users');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch users');
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: null,
    orders: [],
    users: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order._id === action.payload._id ? action.payload : order
        );
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  }
});

export default adminSlice.reducer;
