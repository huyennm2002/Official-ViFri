import axios from "axios"
import { GET_USER_ITEM_LIST_API, ITEMS_API } from "../../constants/APIs"
import { call, put, takeLatest } from "redux-saga/effects"
import { Alert } from "react-native"
import { handleUpdateItemList } from "../features/itemSlice"

const handleFetchItems = () => {
    return axios({
        url: GET_USER_ITEM_LIST_API,
        method: 'GET',
        headers: { "Access-Control-Allow-Origin": "*"}
    })
}

function* itemListFlow() {
    try {
        const { data } = yield call(handleFetchItems);
        yield put(handleUpdateItemList(data));
    } catch(e) {
        Alert.alert('Unable to update item list');
    }
}

function *itemListWatcher() {
    yield takeLatest('ADD_ITEM', itemListFlow);
    yield takeLatest('DELETE_ITEM', itemListFlow);
}