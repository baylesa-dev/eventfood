import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { reducer as cart } from 'services/cart';
import { reducer as orders } from 'services/orders';

const reducers = combineReducers({
    cart,
    orders
});

const persistedReducer = persistReducer(
    {
        key: 'eventfood',
        storage,
        whitelist: ['cart', 'orders'],
    },
    reducers
);

const makeStore = (preloadedState = {}) =>
    configureStore({
        reducer: persistedReducer,
        preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
    });

let store: ReturnType<typeof makeStore>;

export const initializeStore = (
    preloadedState: RootState
): ReturnType<typeof makeStore> => {
    let resolvedStore = store ?? makeStore(preloadedState);

    if (preloadedState && store) {
        resolvedStore = makeStore({
            ...store.getState(),
            ...preloadedState,
        });
        (store as typeof store | null) = null;
    }

    if (typeof window === 'undefined') return resolvedStore;
    if (!store) store = resolvedStore;

    return resolvedStore;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
