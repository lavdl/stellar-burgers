import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../utils/burger-api';
import {
  createAsyncThunk,
  createSlice,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrderSlice {
  loading: boolean;
  loadingOrder: boolean;
  error: SerializedError | null;
  data: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
}

export const initialState: IOrderSlice = {
  loading: true,
  error: null,
  data: [],
  orderModalData: null,
  orderRequest: false,
  loadingOrder: false
};

export const fetchGetOrders = createAsyncThunk(
  'app/orders',
  async () => await getOrdersApi()
);

export const fetchGetOrderByNumber = createAsyncThunk<TOrder, number>(
  'app/orderNumber',
  async (data) => {
    const response = await getOrderByNumberApi(data);
    return response.orders[0];
  }
);

export const createOrder = createAsyncThunk<TOrder, string[]>(
  'app/order',
  async (data) => {
    const response = await orderBurgerApi(data);
    return response.order;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetOrderByNumber.pending, (state) => {
        state.loadingOrder = true;
      })
      .addCase(fetchGetOrderByNumber.fulfilled, (state, action) => {
        state.loadingOrder = false;
        state.orderModalData = action.payload;
      })
      .addCase(fetchGetOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      });
  }
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
export const orderReducer = orderSlice.reducer;
