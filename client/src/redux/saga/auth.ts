import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects'
import { login } from '../features/authSlice';
import { LOGIN_API } from '../../apis/userAPIs';

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
        Alert.alert("Unable to login! Please try again.");
    }
}

function* signInWatcher() {
    yield takeLatest('USER_SIGN_IN', signInFlow);
}

export default signInWatcher;