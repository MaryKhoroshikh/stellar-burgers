import { expect, test, describe } from '@jest/globals';
import feedSliceReducer, { feedActions } from './index';

export const mockIngredientsForOrderToday = [
    "643d69a5c3f7b9001cfa093c",
    "643d69a5c3f7b9001cfa093e",
    "643d69a5c3f7b9001cfa0940",
    "643d69a5c3f7b9001cfa093c"
];

export const orderToday = {
    "_id": "1",
    "ingredients": mockIngredientsForOrderToday,
    "status": "done",
    "name": "Краторный люминесцентный метеоритный бургер",
    "createdAt": "2025-07-16T07:47:40.484Z",
    "updatedAt": "2025-07-16T07:47:41.286Z",
    "number": 84508
};

export const orderPreviously = {
    "_id": "2",
    "ingredients": [
        "643d69a5c3f7b9001cfa093c",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa093c"
    ],
    "status": "done",
    "name": "Краторный spicy бургер",
    "createdAt": "2025-07-15T18:06:13.136Z",
    "updatedAt": "2025-07-15T18:06:13.976Z",
    "number": 84463
}

export const mockOrders =[
    orderToday,
    orderPreviously
];

const mockFeed = {
    total: 2,
    totalToday: 1
};

describe('тест синхронных экшенов feedSlice', () => {
    const initialFeedState = {
        orders: [],
        feed: {},
        orderModalData: null
    };

    test('тест открытия заказа', () => {
        const expectedState = {
            ...initialFeedState,
            orders: mockOrders,
            orderModalData: orderToday
        };

        const newState = feedSliceReducer(
            {
                ...initialFeedState,
                orders: mockOrders,  
            },
            feedActions.openOrder(orderToday)
        );

        expect(newState).toEqual(expectedState);
    });

    test('тест загрузки ленты заказов - fulfilled', () => {
        const expectedState = {
            ...initialFeedState,
            orders: mockOrders,
            feed: mockFeed
        };

        const newState = feedSliceReducer(
            {
                ...initialFeedState,
            },
            feedActions.fetchFeed.fulfilled({orders: mockOrders, total: 2, totalToday: 1, success: true}, '')
        );

        expect(newState).toEqual(expectedState);
    });
});