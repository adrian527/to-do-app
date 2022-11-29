import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from '../features/todo-list/todoSlice';
import {
  persistStore, persistReducer
} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = toDoReducer;

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],

});

export const persistor = persistStore(store);

// Typy dla typescripta żeby stworzyć dispatch i selector
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
