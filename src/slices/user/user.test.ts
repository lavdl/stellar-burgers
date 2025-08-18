import { expect, test, describe } from '@jest/globals';
import { clearUser, setUser, userReducer, initialState } from './userSlice';
import {
  getUserInfo,
  login,
  logout,
  refreshTokenUser,
  register
} from './userActions';

describe('Проверка слайса user', () => {
  test('Проверка редьюсера', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('Проверка setUser', () => {
    const user = {
      name: 'test',
      email: 'test@test.ru'
    };
    expect(userReducer(initialState, setUser(user))).toEqual({
      ...initialState,
      user
    });
  });

  test('Проверка очистки clearUser', () => {
    const user = {
      ...initialState,
      user: {
        name: 'test',
        email: 'test@test.ru'
      },
      isAuthChecked: false
    };
    expect(userReducer(user, clearUser())).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  test('Проверка асинхронного login.pending', () => {
    const action = { type: login.pending.type };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('Проверка асинхронного login.fulfilled', () => {
    const user = {
      name: 'test',
      email: 'test@test.ru'
    };
    const action = { type: login.fulfilled.type, payload: user };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: user,
      isAuthChecked: true,
      isAuthorized: true,
      loading: false
    });
  });

  test('Проверка асинхронного login.rejected', () => {
    const action = { type: login.rejected.type };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthChecked: true,
      loading: false,
      isAuthorized: false
    });
  });

  test('Проверка асинхронного register.pending', () => {
    const action = { type: register.pending.type };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('Проверка асинхронного register.fulfilled', () => {
    const user = {
      name: 'test',
      email: 'test@test.ru'
    };
    const action = { type: register.fulfilled.type, payload: user };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: user,
      isAuthChecked: true,
      isAuthorized: true,
      loading: false
    });
  });

  test('Проверка асинхронного getUserInfo.fulfilled', () => {
    const user = {
      name: 'test',
      email: 'test@test.ru'
    };
    const action = { type: getUserInfo.fulfilled.type, payload: user };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      user: user,
      isAuthChecked: true,
      isAuthorized: true
    });
  });

  test('Проверка асинхронного getUserInfo.rejected', () => {
    const action = { type: getUserInfo.rejected.type };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  test('Проверка асинхронного logout.pending', () => {
    const action = { type: logout.pending.type };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      loading: true
    });
  });

  test('Проверка асинхронного logout.fulfilled', () => {
    const user = {
      ...initialState,
      isAuthorized: true,
      loading: false
    };
    const action = { type: logout.fulfilled.type };
    expect(userReducer(user, action)).toEqual({
      ...user,
      isAuthorized: false,
      loading: false
    });
  });

  test('Проверка асинхронного refreshTokenUser.fulfilled', () => {
    const action = { type: refreshTokenUser.fulfilled.type };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  test('Проверка асинхронного refreshTokenUser.rejected', () => {
    const action = { type: refreshTokenUser.rejected.type };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthChecked: true
    });
  });

  test('Проверка асинхронного refreshTokenUser.pending', () => {
    const action = { type: refreshTokenUser.pending.type };
    expect(userReducer(initialState, action)).toEqual({
      ...initialState,
      isAuthChecked: false,
      loading: true
    });
  });
});
