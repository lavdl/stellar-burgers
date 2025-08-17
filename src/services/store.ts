import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import appReducer from '../slices/appSlice';
import { feedReducer } from '../slices/feedSlice';
import { constructorReducer } from '../slices/constructorSlice';
import { userReducer } from '../slices/user/userSlice';
import { orderReducer } from '../slices/order';

export const rootReducer = combineReducers({
  app: appReducer,
  feed: feedReducer,
  burderConstructor: constructorReducer,
  user: userReducer,
  order: orderReducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
