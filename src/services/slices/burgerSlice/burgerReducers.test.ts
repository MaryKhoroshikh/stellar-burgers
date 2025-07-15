import {expect, test, describe} from '@jest/globals';
import burgerSliceReducer, { burgerActions } from './index';

describe('тесты синхронных экшенов', () => {
    // начальное состояние, которое будем менять в тестах
        const initialBurgerState = {
            bun: { price: 0, _id: '' },
            ingredients: []
        }
    // игредиенты которые будем добавлять
    const bunExampleIngredient = {
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
    const mainExampleIngredient = {
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
    const sauceExampleIngredient = {
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

    test('добавить ингредиент', () => {
        const newState = burgerSliceReducer(initialBurgerState, burgerActions.addIngredient(bunExampleIngredient))
        const { bun } = newState;

        // сравниваем то что получилось с ожидаемым результатом
        expect(bun).toEqual(
            { price: 1255, _id: 'a' }
        )
    })

    // test('снять лайк у трека', () => {
    //     // снимаем лайк с помощью экшена toggleLike
    //     const newState = tracksSliceReducer(initialTracksState, toggleLike({ id: 2 }))

    //     const { tracks } = newState;

    //     expect(tracks).toEqual([
    //         {
    //             id: 1,
    //             title: 'Space Oddity',
    //             duration: '5:15',
    //             isLiked: false,
    //         },
    //         {
    //             id: 2,
    //             title: 'The Man Who Sold The World',
    //             duration: '3:59',
    //             isLiked: false,
    //         }
    //     ])
    // })
})