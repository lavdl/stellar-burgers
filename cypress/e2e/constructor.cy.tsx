import Cypress from 'cypress';
import * as order from '../fixtures/orders.json';

describe('Проверка добавления ингредиента', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.visit('http://localhost:4000/');
  });

  it('Добавление булки', () => {
    cy.get('[data-ingredient="bun"] button').first().click();
  });

  it('Добавление котлеты', () => {
    cy.get('[data-ingredient="main"] button').first().click();
  });

  it('Добавление соуса', () => {
    cy.get('[data-ingredient="sauce"] button').first().click();
  });
});

describe('Проверка модальных окон', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.visit('http://localhost:4000/');
  });

  it('Открытие модального окна ингредиента', () => {
    cy.get('[data-ingredient="main"]').first().click();
  });

  it('Закрытие модального окна ингредиента кликом по крестику', () => {
    cy.get('[data-ingredient="main"]').first().click();
    cy.get('#modals button').first().click();
  });
});

describe('Проверка создания заказа', function () {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('POST', 'api/orders', { fixture: 'orders' });
    cy.setCookie('accessToken', 'token');
    localStorage.setItem('refreshToken', 'token');
    cy.visit('http://localhost:4000/');
  });
  
  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Оформление заказа', () => {
    cy.get('[data-ingredient="bun"] button').first().click();
    cy.get('[data-ingredient="main"] button').first().click();
    cy.get('[data-button="order_button"]').first().click();
    cy.wait(1000);
    cy.get('#modals button').should('be.visible');
    cy.get('#modals').should('contain.text', order.order.number);
    cy.get('#modals button').first().click();
    cy.get('[data-cy="total_price"]').should('contain.text', '0');
  });
});
