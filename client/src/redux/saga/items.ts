import axios from "axios"
import { call, put, select, takeLatest } from "redux-saga/effects"
import { Alert } from "react-native"
import { AUTHENTICATED_AXIOS_HEADER, GET_USER_ITEM_LIST_API } from "../../constants/APIs"
import { handleUpdateItemList } from "../features/itemSlice"

export const handleFetchItems = (token: string) => {
    return axios({
        url: GET_USER_ITEM_LIST_API,
        method: 'GET',
        headers: AUTHENTICATED_AXIOS_HEADER(token)
    })
}

export function* itemListFlow() {
    try {
        const state = yield select();
        const res = yield call(handleFetchItems, state.user.token);
        yield put(handleUpdateItemList(res.data));
    } catch(e) {
        Alert.alert('Unable to update item list');
    }
}

export default function *itemListWatcher() {
    yield takeLatest('ADD_ITEM', itemListFlow);
    yield takeLatest('UPDATE_ITEM', itemListFlow);
    yield takeLatest('DELETE_ITEM', itemListFlow);
}