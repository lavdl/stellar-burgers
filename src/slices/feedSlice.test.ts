import { expect, test, describe } from '@jest/globals';
import { feedReducer, fetchFeed, initialState } from './feedSlice';

describe('Проверка слайса feedSlice', () => {
  test('Проверка редьюсера', () => {
    expect(feedReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('Проверка асинхронного fetchFeed.pending', () => {
    const action = { type: fetchFeed.pending.type };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };
    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка асинхронного fetchFeed.fulfilled', () => {
    const mockFeed = {
      orders: [
        {
          _id: '1',
          ingredients: ['111', '222', '333'],
          status: 'done',
          name: 'Space флюоресцентный люминесцентный бургер',
          createdAt: '2025-08-17T19:58:49.912Z',
          updatedAt: '2025-08-17T19:58:50.776Z',
          number: 123
        },
        {
          _id: '2',
          ingredients: ['111', '222', '333', '444'],
          status: 'done',
          name: 'Краторный метеоритный бургер',
          createdAt: '2025-08-17T18:47:04.005Z',
          updatedAt: '2025-08-17T18:47:04.840Z',
          number: 124
        }
      ]
    };

    const action = { type: fetchFeed.fulfilled.type, payload: mockFeed };
    const expectedState = {
      loading: false,
      error: null,
      data: mockFeed
    };
    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка асинхронного fetchFeed.rejected', () => {
    const mockError = { message: 'Ошибка' };
    const action = { type: fetchFeed.rejected.type, error: mockError };
    const expectedState = {
      loading: false,
      error: mockError,
      data: {
        orders: [],
        total: 0,
        totalToday: 0
      }
    };

    expect(feedReducer(initialState, action)).toEqual(expectedState);
  });
});
