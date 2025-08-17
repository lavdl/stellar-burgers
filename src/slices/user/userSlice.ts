import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { TOrdersData, TUser } from '@utils-types';
import {
  login,
  register,
  getUserInfo,
  logout,
  refreshTokenUser
} from './userActions';

interface IUserSlice {
  loading: boolean;
  user: TUser;
  isAuthChecked: boolean;
  isAuthorized: boolean;
}

const initialState: IUserSlice = {
  loading: false,
  user: {
    name: '',
    email: ''
  },
  isAuthChecked: false,
  isAuthorized: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {
        name: '',
        email: ''
      };
      state.isAuthChecked = true;
    },
    checkToken: (state) => {}
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthorized = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loading = false;
        state.isAuthorized = false;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthorized = true;
        state.loading = false;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
        state.isAuthorized = true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isAuthChecked = true;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthorized = false;
        state.loading = false;
      })
      .addCase(refreshTokenUser.fulfilled, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(refreshTokenUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(refreshTokenUser.pending, (state) => {
        state.isAuthChecked = false;
        state.loading = true;
      });
  }
});

export const { setUser, clearUser } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;
export default userSlice.reducer;
export const userReducer = userSlice.reducer;
