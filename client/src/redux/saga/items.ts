import axios from "axios"
import { call, put, select, takeLatest } from "redux-saga/effects"
import { Alert } from "react-native"
import { AUTHENTICATED_AXIOS_HEADER, GET_USER_ITEM_LIST_API, ITEMS_API, ITEMS_SUMMARY_API } from "../../constants/APIs"
import { handleUpdateItemReport } from "../features/itemSlice"
import { ItemReport } from "../../../types"

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

export const getItemSummary = (token: string) => {
    return axios({
        url: ITEMS_SUMMARY_API,
        method: 'POST',
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
        const state = yield select();
        const userToken = state.user.token;
        const summary = yield call(getItemSummary, userToken)
        const itemList = yield call(handleFetchItems, userToken);

        const itemReport: ItemReport = {
            summary: summary.data,
            itemList: itemList.data
        }
        yield put(handleUpdateItemReport(itemReport));
    } catch(e) {
        Alert.alert('Unable to update item list');
    }
}

export default function *itemListWatcher() {
    yield takeLatest('ADD_ITEM', itemListFlow);
    yield takeLatest('UPDATE_ITEM', updateItemFlow);
    yield takeLatest('DELETE_ITEM', deleteItemFlow);
}