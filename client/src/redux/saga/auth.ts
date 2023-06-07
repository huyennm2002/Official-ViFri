import axios from 'axios';
import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects'
import { login, logout } from '../features/authSlice';
import { LOGIN_API, LOGOUT_API } from '../../apis/userAPIs';

const handleSignIn = (data) => {
    return axios({
        url: LOGIN_API,
        method: "POST",
        data,
        headers: { "Access-Control-Allow-Origin": "*"}
    })
}
function* signInFlow(action) {
    const {email, password} = action.payload;
    try {
        const res = yield call(handleSignIn, {email,password});
        yield put(login({token: res.data}));
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
        console.log("LOGGED OUT");
    } catch(error) {
        Alert.alert("Unable to logout!");
    }
}

function* authWatcher() {
    yield takeLatest('USER_SIGN_IN', signInFlow);
    yield takeLatest('USER_LOG_OUT', logOutFlow);
}

export default authWatcher;