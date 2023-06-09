import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/lib/persistStore";
import userReducer from "./features/authSlice";
import itemReducer from "./features/itemSlice";
import RootSaga from "./saga";

//middleware
const sagaMiddleware = createSagaMiddleware();

//redux persist
// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
// }
// const userPersistConfig = {
//     key: 'user',
//     storage: sessionStorage
// }

// const reducer = combineReducers({
//     user: persistReducer(userPersistConfig, userReducer)
// })
// const persistedReducer = persistReducer(persistConfig, reducer)

//create store
const reducer = combineReducers({
    user: userReducer,
    items: itemReducer
})
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware);
    },
})

// const persistor = persistStore(store)
sagaMiddleware.run(RootSaga);

export type RootState = ReturnType<typeof store.getState>

export { store };