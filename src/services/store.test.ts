import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../services/store';
import { expect, test, describe } from '@jest/globals';

describe('Проверка стора', () => {
  const store = configureStore({
    reducer: rootReducer
  });

  test('Проверка инициализации стора', () => {
    const initialState = store.getState();

    expect(initialState).toEqual({
      app: {
        loading: false,
        error: null,
        data: []
      },
      feed: {
        loading: true,
        error: null,
        data: {
          orders: [],
          total: 0,
          totalToday: 0
        }
      },
      burderConstructor: {
        bun: null,
        ingredients: []
      },
      user: {
        loading: false,
        user: {
          name: '',
          email: ''
        },
        isAuthChecked: false,
        isAuthorized: false
      },
      order: {
        loading: true,
        error: null,
        data: [],
        orderModalData: null,
        orderRequest: false,
        loadingOrder: false
      }
    });
  });
});
