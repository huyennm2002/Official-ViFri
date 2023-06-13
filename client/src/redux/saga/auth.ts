import axios from 'axios';
import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects'
import { login, logout } from '../features/authSlice';
import { GET_USER_INFO_API, LOGIN_API, LOGOUT_API } from '../../constants/APIs';

const handleSignIn = (data) => {
    return axios({
        url: LOGIN_API,
        method: "POST",
        data,
        headers: { "Access-Control-Allow-Origin": "*"}
    })
}

const getUserInfo = (token) => {
    return axios({
        url: GET_USER_INFO_API,
        method: "GET",
        headers: {
            "Access-Control-Allow-Origin": "*",
            token
        }
    })
}

function* signInFlow(action) {
    const {email, password} = action.payload;
    try {
        const res = yield call(handleSignIn, {email,password});
        const token = res.data;
        const { data } = yield call(getUserInfo, token);
        yield put(login({user: data, token}));
    } catch(error) {
        Alert.alert("Unable to login!\nPlease try again.");
    }
}

const handleLogOut = () => {
    return axios({
        url: LOGOUT_API,
        method: "POST",
        headers: { "Access-Control-Allow-Origin": "*"}
    })
}

function* logOutFlow() {
    try {
        const res = yield call(handleLogOut);
        yield put(logout());
    } catch(error) {
        Alert.alert("Unable to logout!");
    }
}

function* authWatcher() {
    yield takeLatest('USER_SIGN_IN', signInFlow);
    yield takeLatest('USER_LOG_OUT', logOutFlow);
}

export default authWatcher;