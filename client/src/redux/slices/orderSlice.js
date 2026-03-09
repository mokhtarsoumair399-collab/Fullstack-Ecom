import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const checkout = createAsyncThunk('orders/checkout', async (_, thunkAPI) => {
  try {
    const { data } = await api.post('/orders/checkout');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Checkout failed');
  }
});

export const fetchMyOrders = createAsyncThunk('orders/myOrders', async (_, thunkAPI) => {
  try {
    const { data } = await api.get('/orders/my-orders');
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
  }
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    latestOrder: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.latestOrder = action.payload;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  }
});

export default orderSlice.reducer;
