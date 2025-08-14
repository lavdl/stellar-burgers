import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi,
  refreshToken
} from '@api';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const login = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data) => {
    const response = await loginUserApi(data);
    const { accessToken, refreshToken } = response;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return response.user;
  }
);

export const register = createAsyncThunk<TUser, TRegisterData>(
  'user/register',
  async (data) => {
    const response = await registerUserApi(data);
    const { accessToken, refreshToken } = response;
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return response.user;
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (data) => {
    const response = await updateUserApi(data);
    return response.user;
  }
);

export const getUserInfo = createAsyncThunk('user/getUserInfo', async () => {
  const response = await getUserApi();
  return response.user;
});

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

export const refreshTokenUser = createAsyncThunk(
  'user/refreshToken',
  async () => {
    const response = await refreshToken();
    return response;
  }
);
