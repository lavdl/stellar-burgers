import { expect, test, describe } from '@jest/globals';
import {
  createOrder,
  fetchGetOrderByNumber,
  fetchGetOrders,
  orderReducer,
  resetOrder
} from './order';

describe('Проверка слайса orderSlice', () => {
  const initialState = {
    loading: true,
    error: null,
    data: [],
    orderModalData: null,
    orderRequest: false,
    loadingOrder: false
  };

  test('Проверка редьюсера', () => {
    expect(orderReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('Проверка асинхронного fetchOrder.pending', () => {
    const action = { type: fetchGetOrders.pending.type };
    const expectedState = {
      ...initialState,
      loading: true
    };
  });

  test('Проверка асинхронного fetchOrder.fulfilled', () => {
    const mockOrders = [
      {
        _id: '123',
        ingredients: ['123', '123'],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-08-17T21:10:25.101Z',
        updatedAt: '2025-08-17T21:10:26.016Z',
        number: 123
      },
      {
        _id: '1234',
        ingredients: ['1234', '1234'],
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-08-17T21:10:25.101Z',
        updatedAt: '2025-08-17T21:10:26.016Z',
        number: 1234
      }
    ];
    const action = { type: fetchGetOrders.fulfilled.type, payload: mockOrders };
    const expectedState = {
      loading: false,
      error: null,
      data: mockOrders,
      orderModalData: null,
      orderRequest: false,
      loadingOrder: false
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка асинхронного fetchGetOrderByNumber.pending', () => {
    const action = { type: fetchGetOrderByNumber.pending.type };
    const expectedState = {
      ...initialState,
      loadingOrder: true
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка асинхронного fetchGetOrderByNumber.fulfilled', () => {
    const mockOrder = [
      {
        _id: '123',
        ingredients: ['123', '123'],
        owner: '68a22011673086001ba83507',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-08-17T21:10:25.101Z',
        updatedAt: '2025-08-17T21:10:26.016Z',
        number: 123,
        __v: 0
      },
      {
        _id: '1234',
        ingredients: ['1234', '1234'],
        owner: '68a22011673086001ba83507',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-08-17T21:10:25.101Z',
        updatedAt: '2025-08-17T21:10:26.016Z',
        number: 1234,
        __v: 0
      }
    ];

    const action = {
      type: fetchGetOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const expectedState = {
      ...initialState,
      orderModalData: mockOrder,
      loadingOrder: false
    };
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка асинхронного createOrder.pending', () => {
    const action = { type: createOrder.pending.type };

    const expectedState = {
      ...initialState,
      orderRequest: true
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка асинхронного createOrder.fulfilled', () => {
    const mockOrder = {
      ingredients: ['1234', '1234']
    };

    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const expectedState = {
      ...initialState,
      orderModalData: mockOrder,
      orderRequest: false
    };

    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка действия resetOrder', () => {
    const action = resetOrder();
    const initialStateData = {
      ...initialState,
      orderModalData: {
        _id: '123',
        ingredients: ['123', '123'],
        owner: '123',
        status: 'done',
        name: 'Флюоресцентный люминесцентный бургер',
        createdAt: '2025-08-17T21:19:12.435Z',
        updatedAt: '2025-08-17T21:19:13.314Z',
        number: 123,
        __v: 0
      }
    }

    const expectedState = {
      ...initialState,
      orderModalData: null
    }
    expect(orderReducer(initialStateData, action)).toEqual(expectedState);
  });
});
