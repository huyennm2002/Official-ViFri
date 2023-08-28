import axios from 'axios';
import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects'
import { login, logout, updateUserInfo } from '../features/authSlice';
import { AUTHENTICATED_AXIOS_HEADER, LOGIN_API, LOGOUT_API, USERS_API } from '../../constants/APIs';
import { getItemSummary, handleFetchItems } from './items';
import { handleUpdateItemReport } from '../features/itemSlice';
import { ItemReport } from '../../../types';

const handleSignIn = (data) => (
	axios({
		url: LOGIN_API,
		method: 'POST',
		data,
		headers: { 'Access-Control-Allow-Origin': '*'}
	})
)

const getUserInfo = (token) => {
	return axios({
		url: USERS_API,
		method: 'GET',
		headers: AUTHENTICATED_AXIOS_HEADER(token)
	})
}
function* signInFlow(action) {
	const {email, password} = action.payload;
	try {
		const res = yield call(handleSignIn, {email,password});
		const token = res.data;
		const { data } = yield call(getUserInfo, token);
		yield put(login({user: data, token}));
		const summary = yield call(getItemSummary, token);
		const items = yield call(handleFetchItems, token);

		const report : ItemReport = {
			summary: summary.data,
			itemList: items.data
		}
		yield put(handleUpdateItemReport(report));
	} catch(error) {
		Alert.alert('Unable to login!\nPlease try again.');
	}
}

const handleLogOut = () => (
	axios({
		url: LOGOUT_API,
		method: 'POST',
		headers: { 'Access-Control-Allow-Origin': '*'}
	})
)

function* logOutFlow() {
	try {
		yield call(handleLogOut);
		yield put(logout());
	} catch(error) {
		Alert.alert('Unable to logout!');
	}
}

const handleUpdateUser = (token, data) => (
	axios({
		url: USERS_API,
		method: 'PUT',
		data,
		headers: AUTHENTICATED_AXIOS_HEADER(token)
	})
)
function* updateUserFlow(action) {
	const {token, data} = action.payload;
	try {
		yield call(handleUpdateUser, token, data);
		const res = yield call(getUserInfo, token);
		yield put(updateUserInfo(res.data));
		Alert.alert('Updated!');
	} catch(error) {
		Alert.alert('Unable to save!');
	}
}

function* authWatcher() {
	yield takeLatest('USER_SIGN_IN', signInFlow);
	yield takeLatest('USER_LOG_OUT', logOutFlow);
	yield takeLatest('UPDATE_USER', updateUserFlow);
}

export default authWatcher;