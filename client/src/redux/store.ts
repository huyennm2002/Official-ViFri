import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/lib/persistStore";
import userReducer from "./features/authSlice";
import authWatcher from "./saga/auth";

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
    user: userReducer
})
const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
})

const persistor = persistStore(store)
sagaMiddleware.run(authWatcher);

export type RootState = ReturnType<typeof store.getState>

export { store, persistor };