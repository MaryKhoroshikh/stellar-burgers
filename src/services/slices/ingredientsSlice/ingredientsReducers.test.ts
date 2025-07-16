import { expect, test, describe } from '@jest/globals';
import { bunExampleIngredient, mainExampleIngredient, sauceExampleIngredient } from '../burgerSlice/burgerReducers.test'
import ingredientsSliceReducer, { ingredientsActions } from './index';

const mockIngredients  = [
    bunExampleIngredient,
    mainExampleIngredient,
    sauceExampleIngredient
];

describe('тест синхронных экшенов ingredientSlice', () => {
    const initialIngredientsState = {
        ingredients: [],
        isLoading: false,
        ingredientData: null
    };

    test('тест открытия ингредиентов', async () => {
        const expectedState = {
            ...initialIngredientsState,
            ingredients: mockIngredients,
            ingredientData: bunExampleIngredient
        };

        const newState = ingredientsSliceReducer(
            {
                ...initialIngredientsState,
                ingredients: mockIngredients
                
            },
            ingredientsActions.openIngredient(bunExampleIngredient._id)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки ингредиентов - pending', async () => {
        const expectedState = {
            ...initialIngredientsState,
            isLoading: true
        };

        const newState = ingredientsSliceReducer(
            {
                ...initialIngredientsState
            },
            ingredientsActions.fetchIngredients.pending('')
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки ингредиентов - fulfilled', async () => {
        const expectedState = {
            ...initialIngredientsState,
            ingredients: mockIngredients
        };

        const newState = ingredientsSliceReducer(
            {
                ...initialIngredientsState,
                isLoading: true
            },
            ingredientsActions.fetchIngredients.fulfilled(mockIngredients, '')
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки ингредиентов -  rejected', async () => {
        const rejectedError = new Error('rejected error');
        
        const expectedState = {
            ...initialIngredientsState,
        };

        const newState = ingredientsSliceReducer(
            {
                ...initialIngredientsState,
                isLoading: true
            },
            ingredientsActions.fetchIngredients.rejected(rejectedError, '')
        );

        expect(newState).toEqual(expectedState);
    });
});
 