import axios from "axios"
import { call, put, select, takeLatest } from "redux-saga/effects"
import { Alert } from "react-native"
import { AUTHENTICATED_AXIOS_HEADER, GET_USER_ITEM_LIST_API, ITEMS_API } from "../../constants/APIs"
import { handleUpdateItemList } from "../features/itemSlice"

export const handleFetchItems = (token: string) => {
    return axios({
        url: GET_USER_ITEM_LIST_API,
        method: 'GET',
        headers: AUTHENTICATED_AXIOS_HEADER(token)
    })
}

const updateItem = (token: string, data) => {
    return axios({
        url: ITEMS_API,
        method: 'PUT',
        data,
        headers: AUTHENTICATED_AXIOS_HEADER(token)
    })
}

const deleteItem = (token: string, id) => {
    return axios({
        url: ITEMS_API,
        method: 'DELETE',
        params: { id },
        headers: AUTHENTICATED_AXIOS_HEADER(token)
    })
}

function *updateItemFlow(action) {
    try {
        const { payload } = action;
        yield updateItem(payload.token, payload.data);
        yield itemListFlow();
    } catch(e) {
        Alert.alert('Unable to update item');
    }
}

function* deleteItemFlow(action) {
    try {
        const { payload } = action;
        yield deleteItem(payload.token, payload.id);
        yield itemListFlow();
        Alert.alert('Item deleted');
    } catch(e) {
        Alert.alert('Unable to delete item');
    }
}

function* itemListFlow() {
    try {
        const state = yield select()
        const res = yield call(handleFetchItems, state.user.token);
        yield put(handleUpdateItemList(res.data));
    } catch(e) {
        Alert.alert('Unable to update item list');
    }
}

export default function *itemListWatcher() {
    yield takeLatest('ADD_ITEM', itemListFlow);
    yield takeLatest('UPDATE_ITEM', updateItemFlow);
    yield takeLatest('DELETE_ITEM', deleteItemFlow);
}