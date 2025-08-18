import { expect, test, describe } from '@jest/globals';
import { appReducer, fetchIngredients, initialState } from './appSlice';
import { ingredients } from '../slices/ingredients.json';

describe('Проверка слайса appSlice', () => {
  test('Проверка редьюсера', () => {
    expect(appReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('Проверка асинхронного fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };
    const expectedState = {
      ...initialState,
      loading: true,
      error: null
    };
    expect(appReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка асинхронного fetchIngredients.fulfilled', () => {
    const ingredientsMock = ingredients;
    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredientsMock
    };
    const expectedState = {
      loading: false,
      error: null,
      data: ingredientsMock
    };
    expect(appReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка асинхронного fetchIngredients.rejected', () => {
    const error = new Error('тест ошибки');
    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: error.message }
    };
    const expectedState = {
      loading: false,
      error: action.error,
      data: []
    };
    expect(appReducer(initialState, action)).toEqual(expectedState);
  });
});
