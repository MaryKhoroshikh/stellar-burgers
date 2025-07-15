import {expect, test, describe, jest} from '@jest/globals';
import {configureStore } from '@reduxjs/toolkit';
import { bunExampleIngredient, mainExampleIngredient, sauceExampleIngredient } from '../burgerSlice/burgerReducers.test'
import ingredientsSliceReducer, { ingredientsSelectors, ingredientsActions } from './index';
import { SLICE_NAME } from '../slicesName'

const mockIngredients  = [
    bunExampleIngredient,
    mainExampleIngredient,
    sauceExampleIngredient
];

describe('тест асинхронных экшенов', () => {
    let fetchSpy: any;
    
    let store = configureStore({
        reducer: { [SLICE_NAME.INGREDIENTS]: ingredientsSliceReducer }
    });

    beforeEach(() => {
        fetchSpy = jest.spyOn(global, 'fetch');
    });

    afterEach(() => {
        fetchSpy.mockRestore();
        jest.resetAllMocks();
    });

    test('проверка сброса состояния', () => {
        // Проверяем начальное состояние
        expect(ingredientsSelectors.selectIsLoading(store.getState())).toBe(false);
        expect(ingredientsSelectors.selectIngredients(store.getState())).toEqual([]);
        expect(ingredientsSelectors.selectIngredientData(store.getState())).toBeNull();
    });

    test('тест загрузки ингредиентов - pending', async () => {
        fetchSpy.mockImplementation(() => {
            return new Promise((resolve) => setTimeout(resolve, 100));
        });

        store.dispatch(ingredientsActions.fetchIngredients());

        expect(ingredientsSelectors.selectIsLoading(store.getState())).toBe(true);
        expect(ingredientsSelectors.selectIngredients(store.getState())).toEqual([]);
        expect(ingredientsSelectors.selectIngredientData(store.getState())).toBeNull();
    });

    test('тест загрузки ингредиентов - fulfilled', async () => {
        fetchSpy.mockImplementation(async () => {
            return {
                json: () => Promise.resolve(mockIngredients),
                ok: true,
                status: 200
            };
        });

        const result = await store.dispatch(ingredientsActions.fetchIngredients());
        console.log('Полученные данные:', result.payload);

        expect(ingredientsSelectors.selectIsLoading(store.getState())).toBe(false);
        expect(ingredientsSelectors.selectIngredients(store.getState())).toEqual(mockIngredients);
        expect(ingredientsSelectors.selectIngredientData(store.getState())).toBeNull();
    });

    test('тест загрузки ингредиентов -  rejected', async () => {
        fetchSpy.mockRejectedValue(new Error('Ошибка сети'));

        try {
            await store.dispatch(ingredientsActions.fetchIngredients());
        } catch (error) {
            // Проверяем состояние после ошибки
            expect(ingredientsSelectors.selectIsLoading(store.getState())).toBe(false);
            expect(ingredientsSelectors.selectIngredients(store.getState())).toEqual([]);
            expect(ingredientsSelectors.selectIngredientData(store.getState())).toBeNull();
        }
    });
});
 