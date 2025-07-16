import {expect, test, describe} from '@jest/globals';
import burgerSliceReducer, { burgerActions } from './index';

// игредиенты которые будем добавлять
    export const bunExampleIngredient = {
        "id": "a",
        "_id": "1",
        "name": "ingredient 1",
        "type": "bun",
        "proteins": 80,
        "fat": 24,
        "carbohydrates": 53,
        "calories": 420,
        "price": 1255,
        "image": "https://code.s3.yandex.net/react/code/bun-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
        "__v": 0
    };
    export const mainExampleIngredient = {
        "id": "b",
        "_id": "2",
        "name": "ingredient 2",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    };
    export const sauceExampleIngredient = {
        "id": "c",
        "_id": "4",
        "name": "ingredient 4",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0
    };
    const mainExampleSame = {
        "id": "d",
        "_id": "2",
        "name": "ingredient 2",
        "type": "main",
        "proteins": 420,
        "fat": 142,
        "carbohydrates": 242,
        "calories": 4242,
        "price": 424,
        "image": "https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v": 0
    };
    const sauceExampleSame = {
        "id": "e",
        "_id": "4",
        "name": "ingredient 4",
        "type": "sauce",
        "proteins": 30,
        "fat": 20,
        "carbohydrates": 40,
        "calories": 30,
        "price": 90,
        "image": "https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile": "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large": "https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v": 0
    };

describe('тесты синхронных экшенов burgerSlice', () => {
    // начальное состояние, которое будем менять в тестах
    const initialBurgerState = {
        bun: { price: 0, _id: '' },
        ingredients: []
    }

    test('добавить ингредиент - булка', () => {
        const newState = burgerSliceReducer(initialBurgerState, burgerActions.addIngredient(bunExampleIngredient));
        expect(newState.bun).toEqual(bunExampleIngredient);
    });

    test('добавить ингредиент - начинка', () => {
        const newState = burgerSliceReducer(initialBurgerState, burgerActions.addIngredient(mainExampleIngredient));
        expect(newState.ingredients).toEqual([mainExampleIngredient]);
    });

    test('добавить ингредиент - несколько', () => {
        // Добавляем первый ингредиент
        let state = burgerSliceReducer(initialBurgerState, burgerActions.addIngredient(mainExampleIngredient));
        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients).toEqual([mainExampleIngredient]);

        // Добавляем второй ингредиент
        state = burgerSliceReducer(state, burgerActions.addIngredient(sauceExampleIngredient));
        expect(state.ingredients).toHaveLength(2);
        expect(state.ingredients).toEqual([
            mainExampleIngredient,
            sauceExampleIngredient
        ]);

        // Добавляем булку
        state = burgerSliceReducer(state, burgerActions.addIngredient(bunExampleIngredient));
        expect(state.bun).toEqual(bunExampleIngredient);
    });

    test('добавить ингредиент - одинаковый', () => {
        // Добавляем первый ингредиент
        let state = burgerSliceReducer(initialBurgerState, burgerActions.addIngredient(mainExampleIngredient));
        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients).toEqual([mainExampleIngredient]);

        // Добавляем второй ингредиент
        state = burgerSliceReducer(state, burgerActions.addIngredient(mainExampleSame));
        expect(state.ingredients).toHaveLength(2);
        expect(state.ingredients).toEqual([
            mainExampleIngredient,
            mainExampleSame
        ]);
    });

    test('удалить ингредиент', () => {
        // добавляем два ингредиента
        let state = burgerSliceReducer(initialBurgerState, burgerActions.addIngredient(mainExampleIngredient));
        state = burgerSliceReducer(state, burgerActions.addIngredient(sauceExampleIngredient));
        expect(state.ingredients).toEqual([mainExampleIngredient, sauceExampleIngredient]);
        // удаляем первый
        state = burgerSliceReducer(state, burgerActions.deleteIngredient(sauceExampleIngredient.id));
        expect(state.ingredients).toEqual([mainExampleIngredient]);
        // удаляем второй
        state = burgerSliceReducer(state, burgerActions.deleteIngredient(mainExampleIngredient.id));
        expect(state.ingredients).toEqual([]);
    });

    test('изменение порядка ингредиентов в начинке', () => {
        // добавляем ингредиенты
        let state = burgerSliceReducer(initialBurgerState, burgerActions.addIngredient(mainExampleIngredient));
        state = burgerSliceReducer(state, burgerActions.addIngredient(sauceExampleIngredient));
        state = burgerSliceReducer(state, burgerActions.addIngredient(mainExampleSame));
        state = burgerSliceReducer(state, burgerActions.addIngredient(sauceExampleSame));
        expect(state.ingredients).toEqual([mainExampleIngredient, sauceExampleIngredient, mainExampleSame, sauceExampleSame]);
        // первый main вниз
        state = burgerSliceReducer(state, burgerActions.moveDown(mainExampleIngredient.id));
        expect(state.ingredients).toEqual([sauceExampleIngredient, mainExampleIngredient, mainExampleSame, sauceExampleSame]);
        // второй sauce вверх
        state = burgerSliceReducer(state, burgerActions.moveUp(sauceExampleSame.id));
        expect(state.ingredients).toEqual([sauceExampleIngredient, mainExampleIngredient, sauceExampleSame, mainExampleSame]);
    });
});