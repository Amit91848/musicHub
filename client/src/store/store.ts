import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import library from './reducers/library';
import player from './reducers/player';
import user from './reducers/user';

const persistConfig = {
    key: 'library',
    storage: storage,
    expire: 1000 * 30
}

const combinedReducer = combineReducers({
    player,
    library,
    user,
})

const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST'],
            },
        }),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch()
export type RootState = ReturnType<typeof combinedReducer>
export type AppState = ReturnType<typeof store.getState>

export const persistor = persistStore(store)