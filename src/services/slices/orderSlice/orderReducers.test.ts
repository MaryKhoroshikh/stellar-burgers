import { expect, test, describe } from '@jest/globals';
import { orderToday, mockIngredientsForOrderToday } from '../feedSlice/feedReducers.test'
import orderSliceReducer, { orderAction } from './index';

describe('тест синхронных экшенов orderSlice', () => {
    const initialOrderState = {
        newOrderRequest: false,
        newOrderModalData: null,
        orderByNumber: null,
        isOrderByNumberLoading: false
    };

    test('тест закрытия модального окна', () => {
        const expectedState = {
            ...initialOrderState,
            newOrderModalData: null
        };

        const newState = orderSliceReducer(
            {
                ...initialOrderState,
                newOrderModalData: orderToday
                
            },
            orderAction.closeModal()
        );

        expect(newState).toEqual(expectedState);
    });

    // оформление нового заказа

    test('тест загрузки нового заказа - pending', () => {
        const expectedState = {
            ...initialOrderState,
            newOrderRequest: true,
        };

        const newState = orderSliceReducer(
            {
                ...initialOrderState
            },
            orderAction.fetchOrder.pending('', mockIngredientsForOrderToday)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки нового заказа - fulfilled', () => {
        const expectedState = {
            ...initialOrderState,
            newOrderRequest: false,
            newOrderModalData: orderToday
        };

        const newState = orderSliceReducer(
            {
                ...initialOrderState,
                newOrderRequest: true
            },
            orderAction.fetchOrder.fulfilled({success: true, order: orderToday, name: orderToday.name}, '', mockIngredientsForOrderToday)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки нового заказа -  rejected', () => {
        const rejectedError = new Error('rejected error');
        
        const expectedState = {
            ...initialOrderState,
            newOrderRequest: false
        };

        const newState = orderSliceReducer(
            {
                ...initialOrderState,
                newOrderRequest: true
            },
            orderAction.fetchOrder.rejected(rejectedError, '', mockIngredientsForOrderToday)
        );

        expect(newState).toEqual(expectedState);
    });

    // загрузка заказа по его номеру

    test('тест загрузки заказа по номеру - pending', () => {
        const expectedState = {
            ...initialOrderState,
            isOrderByNumberLoading: true
        };

        const newState = orderSliceReducer(
            {
                ...initialOrderState
            },
            orderAction.fetchOrderByNumber.pending('', orderToday.number)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки заказа по номеру - fulfilled', () => {
        const expectedState = {
            ...initialOrderState,
            orderByNumber: orderToday,
            isOrderByNumberLoading: false
        };

        const newState = orderSliceReducer(
            {
                ...initialOrderState,
                isOrderByNumberLoading: true
            },
            orderAction.fetchOrderByNumber.fulfilled({success: true, orders: [orderToday]}, '', orderToday.number)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки заказа по номеру -  rejected', () => {
        const rejectedError = new Error('rejected error');
        
        const expectedState = {
            ...initialOrderState,
            isOrderByNumberLoading: false
        };

        const newState = orderSliceReducer(
            {
                ...initialOrderState,
                isOrderByNumberLoading: true
            },
            orderAction.fetchOrderByNumber.rejected(rejectedError, '', orderToday.number)
        );

        expect(newState).toEqual(expectedState);
    });
});
 