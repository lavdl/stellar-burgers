import Cypress from 'cypress';
import * as order from '../fixtures/orders.json';
import * as ingredients from '../fixtures/ingredients.json';

const ingredientMain = '[data-ingredient="main"]';
const ingredientBun = '[data-ingredient="bun"]';
const ingredientSauce = '[data-ingredient="sauce"]';
const modals = '#modals';
const orderButton = '[data-button="order_button"]';
const odderTotalPrice = '[data-cy="total_price"]';
const burgerConstructor = '[data-cy="burger_constructor"]';
const ingredientName = ingredients.data[1].name;
const bunName = ingredients.data[0].name;
const sauceName = ingredients.data[3].name;

describe('Проверка добавления ингредиента', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.visit('/');
  });

  it('Добавление булки', () => {
    cy.get(`${ingredientBun} button`).first().click();
    cy.get(burgerConstructor).should('contain.text', bunName); //проверка наличия булки
  });

  it('Добавление котлеты', () => {
    cy.get(`${ingredientMain} button`).first().click();
    cy.get(burgerConstructor).should('contain.text', ingredientName); //проверка наличия ингредиента
  });

  it('Добавление соуса', () => {
    cy.get(`${ingredientSauce} button`).first().click();
    cy.get(burgerConstructor).should('contain.text', sauceName); //проверка наличия соуса
  });
});

describe('Проверка модальных окон', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.visit('/');
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get(ingredientMain).first().click();
    cy.get(modals).should('contain.text', ingredientName); //проверка наличия ингредиента
  });

  it('Закрытие модального окна ингредиента кликом по крестику', () => {
    cy.get(ingredientMain).first().click();
    cy.get(`${modals} button`).first().click();
  });
});

describe('Проверка создания заказа', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('POST', 'api/orders', { fixture: 'orders' });
    cy.setCookie('accessToken', 'token');
    localStorage.setItem('refreshToken', 'token');
    cy.visit('/');
  });
  
  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Оформление заказа', () => {
    cy.get(`${ingredientBun} button`).first().click();
    cy.get(`${ingredientMain} button`).first().click();
    cy.get(orderButton).first().click();
    cy.wait(1000);
    cy.get(`${modals} button`).should('be.visible');
    cy.get(modals).should('contain.text', order.order.number);
    cy.get(`${modals} button`).first().click();
    cy.get(odderTotalPrice).should('contain.text', '0');
  });
});
