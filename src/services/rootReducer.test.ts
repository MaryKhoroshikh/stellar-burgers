import { expect, test, describe } from '@jest/globals';
import store, { rootReducer } from './store';


const initialState = store.getState();

describe('тест rootReducer', () => {
    test('проверка начального состояния при вызове rootReducer с undefined состоянием и несуществующим экшеном', () => {
        // Создаем экшен, который не обрабатывается никаким редьюсером
        const unknownAction = {
            type: 'UNKNOWN_ACTION',
            payload: 'some payload'
        };

        // Вызываем rootReducer с undefined состоянием и неизвестным экшеном
        const resultState = rootReducer(undefined, unknownAction);

        // Проверяем, что результат совпадает с начальным состоянием
        expect(resultState).toEqual(initialState);
    });
});