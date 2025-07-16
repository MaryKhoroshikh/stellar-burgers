import { expect, test, describe } from '@jest/globals';
import { orderToday, mockIngredientsForOrderToday } from '../feedSlice/feedReducers.test'
import orderSliceReducer, { orderAction } from './index';

describe('тест синхронных экшенов orderSlice', () => {
    const initialIngredientsState = {
        newOrderRequest: false,
        newOrderModalData: null,
        orderByNumber: null,
        isOrderByNumberLoading: false
    };

    test('тест закрытия модального окна', () => {
        const expectedState = {
            ...initialIngredientsState,
            newOrderModalData: null
        };

        const newState = orderSliceReducer(
            {
                ...initialIngredientsState,
                newOrderModalData: orderToday
                
            },
            orderAction.closeModal()
        );

        expect(newState).toEqual(expectedState);
    });

    // оформление нового заказа

    test('тест загрузки нового заказа - pending', () => {
        const expectedState = {
            ...initialIngredientsState,
            newOrderRequest: true,
        };

        const newState = orderSliceReducer(
            {
                ...initialIngredientsState
            },
            orderAction.fetchOrder.pending('', mockIngredientsForOrderToday)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки нового заказа - fulfilled', () => {
        const expectedState = {
            ...initialIngredientsState,
            newOrderRequest: false,
            newOrderModalData: orderToday
        };

        const newState = orderSliceReducer(
            {
                ...initialIngredientsState,
                newOrderRequest: true
            },
            orderAction.fetchOrder.fulfilled({success: true, order: orderToday, name: orderToday.name}, '', mockIngredientsForOrderToday)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки нового заказа -  rejected', () => {
        const rejectedError = new Error('rejected error');
        
        const expectedState = {
            ...initialIngredientsState,
            newOrderRequest: false
        };

        const newState = orderSliceReducer(
            {
                ...initialIngredientsState,
                newOrderRequest: true
            },
            orderAction.fetchOrder.rejected(rejectedError, '', mockIngredientsForOrderToday)
        );

        expect(newState).toEqual(expectedState);
    });

    // загрузка заказа по его номеру

    test('тест загрузки заказа по номеру - pending', () => {
        const expectedState = {
            ...initialIngredientsState,
            isOrderByNumberLoading: true
        };

        const newState = orderSliceReducer(
            {
                ...initialIngredientsState
            },
            orderAction.fetchOrderByNumber.pending('', orderToday.number)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки заказа по номеру - fulfilled', () => {
        const expectedState = {
            ...initialIngredientsState,
            orderByNumber: orderToday,
            isOrderByNumberLoading: false
        };

        const newState = orderSliceReducer(
            {
                ...initialIngredientsState,
                isOrderByNumberLoading: true
            },
            orderAction.fetchOrderByNumber.fulfilled({success: true, orders: [orderToday]}, '', orderToday.number)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки заказа по номеру -  rejected', () => {
        const rejectedError = new Error('rejected error');
        
        const expectedState = {
            ...initialIngredientsState,
            isOrderByNumberLoading: false
        };

        const newState = orderSliceReducer(
            {
                ...initialIngredientsState,
                isOrderByNumberLoading: true
            },
            orderAction.fetchOrderByNumber.rejected(rejectedError, '', orderToday.number)
        );

        expect(newState).toEqual(expectedState);
    });
});
 