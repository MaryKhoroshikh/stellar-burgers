import { expect, test, describe } from '@jest/globals';
import { mockOrders } from '../feedSlice/feedReducers.test'
import profileSliceReducer, { profileActions } from './index';

const mockUser = {
    name: 'testUserName',
    email: 'testUserEmail.mail.com'
};

const mockResetPassword = {
    password: 'testPassword',
    token: '12345'
}

const mockUserData = {
    ...mockUser,
    password: 'testPassword'
}

const mockResponse = {
    success: true,
    refreshToken: 'testrefreshToken',
    accessToken: 'testaccessToken',
    user: mockUser
}

describe('тест синхронных экшенов profileSlice', () => {
    const initialProfileState = {
        user: {
            name: '',
            email: ''
        },
        orders: [],
        profileCheck: false,
        isLoading: false
    };

    test('пользователь проверен', () => {
        const expectedState = {
            ...initialProfileState,
            profileCheck: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.setProfileCheck()
        );

        expect(newState).toEqual(expectedState);
    });

    // pending

    test('fetchUser - pending', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.fetchUser.pending('')
        );

        expect(newState).toEqual(expectedState);
    });
    test('registerUser - pending', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.registerUser.pending('', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('loginUser - pending', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.loginUser.pending('', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('logoutUser - pending', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.logoutUser.pending('')
        );

        expect(newState).toEqual(expectedState);
    });
    test('updateUser - pending', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.updateUser.pending('', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('forgotPassword - pending', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.forgotPassword.pending('', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('resetPassword - pending', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.resetPassword.pending('', mockResetPassword)
        );

        expect(newState).toEqual(expectedState);
    });
    test('fetchUserOrders - pending', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: true
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState
            },
            profileActions.fetchUserOrders.pending('')
        );

        expect(newState).toEqual(expectedState);
    });

    // rejected

    test('fetchUser - rejected', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.fetchUser.rejected(new Error('rejected error'), '')
        );

        expect(newState).toEqual(expectedState);
    });
    test('registerUser - rejected', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.registerUser.rejected(new Error('rejected error'), '', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('loginUser - rejected', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.loginUser.rejected(new Error('rejected error'), '', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('logoutUser - rejected', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.logoutUser.rejected(new Error('rejected error'), '')
        );

        expect(newState).toEqual(expectedState);
    });
    test('updateUser - rejected', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.updateUser.rejected(new Error('rejected error'), '', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('forgotPassword - rejected', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.forgotPassword.rejected(new Error('rejected error'), '', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('resetPassword - rejected', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.resetPassword.rejected(new Error('rejected error'), '', mockResetPassword)
        );

        expect(newState).toEqual(expectedState);
    });
    test('fetchUserOrders - rejected', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.fetchUserOrders.rejected(new Error('rejected error'), '')
        );

        expect(newState).toEqual(expectedState);
    });

    // fulfilled

    test('fetchUser - fulfilled', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false,
            user: mockUser
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.fetchUser.fulfilled({user: mockUser, success: true }, '')
        );

        expect(newState).toEqual(expectedState);
    });
    test('registerUser - fulfilled', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false,
            user: mockUser
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.registerUser.fulfilled(mockResponse, '', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('loginUser - fulfilled', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false,
            user: mockUser
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.loginUser.fulfilled(mockResponse, '', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('logoutUser - fulfilled', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.logoutUser.fulfilled(undefined, '')
        );

        expect(newState).toEqual(expectedState);
    });
    test('updateUser - fulfilled', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false,
            user: mockUser
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.updateUser.fulfilled(mockResponse, '', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('forgotPassword - fulfilled', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.forgotPassword.fulfilled(mockResponse, '', mockUserData)
        );

        expect(newState).toEqual(expectedState);
    });
    test('resetPassword - fulfilled', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.resetPassword.fulfilled(mockResponse, '', mockResetPassword)
        );

        expect(newState).toEqual(expectedState);
    });
    test('fetchUserOrders - fulfilled', () => {
        const expectedState = {
            ...initialProfileState,
            isLoading: false,
            orders: mockOrders
        };

        const newState = profileSliceReducer(
            {
                ...initialProfileState,
                isLoading: true
            },
            profileActions.fetchUserOrders.fulfilled(mockOrders, '')
        );

        expect(newState).toEqual(expectedState);
    });
});
 