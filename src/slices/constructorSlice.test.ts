import { expect, test, describe } from '@jest/globals';
import { ingredients } from '../slices/ingredients.json';
import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  moveIngredient,
  removeIngredient,
  setBun,
  initialState
} from './constructorSlice';

jest.mock('nanoid', () => ({
  nanoid: () => 'mocked-id'
}));

describe('Проверка слайса constructorSlice', () => {
  test('Проверка редьюсера', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('Проверка добавления ингредиента', () => {
    const igredientsMock = ingredients;
    const action = addIngredient(igredientsMock[1]);
    const expectedState = {
      bun: null,
      ingredients: [{ ...igredientsMock[1], id: 'mocked-id' }]
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка добавления булки', () => {
    const bun = ingredients[0];
    const action = setBun(bun);
    const expectedState = {
      bun: bun,
      ingredients: []
    };
    expect(constructorReducer(initialState, action)).toEqual(expectedState);
  });

  test('Проверка удаления ингредиента', () => {
    const ingredient1 = {
      ...ingredients[1],
      id: '1'
    };
    const ingredient2 = {
      ...ingredients[2],
      id: '2'
    };

    const initialStateData = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };
    const action = removeIngredient('1');
    const expectedState = {
      bun: null,
      ingredients: [ingredient2]
    };

    expect(constructorReducer(initialStateData, action)).toEqual(expectedState);
  });

  test('Проверка перемещения ингредиента', () => {
    const ingredient1 = {
      ...ingredients[1],
      id: '1'
    };
    const ingredient2 = {
      ...ingredients[2],
      id: '2'
    };

    const initialStateData = {
      bun: null,
      ingredients: [ingredient1, ingredient2]
    };

    const action = moveIngredient({ fromIndex: 0, toIndex: 1 });
    const expectedState = {
      bun: null,
      ingredients: [ingredient2, ingredient1]
    };

    expect(constructorReducer(initialStateData, action)).toEqual(expectedState);
  });

  test('Очистка конструктора', () => {
    const initialStateData = {
      bun: ingredients[0],
      ingredients: [{ id: 'mocked-id', ...ingredients[1] }]
    };
    const action = clearConstructor();
    const expectedState = {
      bun: null,
      ingredients: []
    };

    expect(constructorReducer(initialStateData, action)).toEqual(expectedState);
  });
});
