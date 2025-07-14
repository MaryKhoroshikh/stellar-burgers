describe('проверка добавления ингредиентов из списка в конструктор', function() {
    beforeEach(function () {
    // перехват запроса ингредиентов
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.visit('http://localhost:4000');
    });

    it('добавление булки', () => {
        cy.get('[data-cy=indgedient-bun]').contains('Добавить').click();
        cy.get('[data-cy=burger-bun-top]').contains('ingredient 1').should('exist');
        cy.get('[data-cy=burger-bun-bottom]').contains('ingredient 1').should('exist');
    });

    it('добавление начинки', () => {
        cy.get('[data-cy=indgedient-main]').contains('Добавить').click();
        cy.get('[data-cy=indgedient-sause]').contains('Добавить').click();
        cy.get('[data-cy=burger-ingredients]').contains('ingredient 2').should('exist');
        cy.get('[data-cy=burger-ingredients]').contains('ingredient 4').should('exist');
    });
});

describe('работа модальных окон', function() {
    beforeEach(function () {
    // перехват запроса ингредиентов
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.visit('http://localhost:4000');
    });

    it('проверка открытия модального окна ингредиента', () => {
        cy.get('[data-cy=indgedient-bun]').contains('ingredient 1').click();
        cy.get('[data-cy=modal]').should('be.visible');
        cy.get('[data-cy=modal]').contains('ingredient 1').should('exist');
    });

    it('проверка закрытия модального окна по клику на крестик', () => {
        cy.get('[data-cy=indgedient-bun]').contains('ingredient 1').click();
        cy.get('[data-cy=modal]').find('button').click();
        cy.get('[data-cy=modal]').should('not.exist');
    });

    it('проверка закрытия модального окна по клику на оверлей (желательно)', () => {
        cy.get('[data-cy=indgedient-bun]').contains('ingredient 1').click();
        cy.get('body').click({ x: 10, y: 10 });
        cy.get('[data-cy=modal]').should('not.exist');
    });
});

describe('создание заказа', function() {
    beforeEach(function () {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
        window.localStorage.setItem('refreshToken', JSON.stringify('testRefreshToken'));
        cy.setCookie('accsessToken', 'testAccsessToken');
        cy.visit('http://localhost:4000');
        
    });

    after(function () {
        cy.clearLocalStorage();
        cy.clearCookies();
    });
    
    it('добавление булки', () => {
        cy.get('[data-cy=indgedient-bun]').contains('Добавить').click();
        cy.get('[data-cy=indgedient-main]').contains('Добавить').click();
        cy.get('[data-cy=order-button]').contains('Оформить заказ').click();
        cy.getCookie('accsessToken').should('exist');

        cy.get('[data-cy=modal]').should('be.visible');
        cy.get('[data-cy=modal]').contains('123123');
        cy.get('[data-cy=modal]').find('button').click();
        cy.get('[data-cy=modal]').should('not.exist');
        cy.get('[data-cy=burger-bun-bottom]').contains('ingredient 1').should('not.exist');
        cy.get('[data-cy=burger-ingredients]').contains('ingredient 2').should('not.exist');
    });
    // проверить: модальное окно открылось и номер заказа верный
    // закрыть модальное окно и проверить успешность закрытия
    // проверить, что конструктор пуст
});