import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/lib/persistStore";
import { reducer } from "./reducer";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: [sagaMiddleware],
})

const persistor = persistStore(store)
// sagaMiddleware.run();

export { store, persistor };