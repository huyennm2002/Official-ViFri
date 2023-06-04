import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects'
import { login } from '../features/authSlice';

const handleSignIn = (data) => {
    return axios({
        url: `http://192.168.1.9:3005/login`,
        method: "POST",
        data,
        headers: { "Access-Control-Allow-Origin": "*"}
    })
}

function* signInFlow(action) {
    const {email, password} = action.payload;
    const res = yield call(handleSignIn, {email, password});
    if (res.status === 200) {
        const token = res.data;
        console.log(res);
        yield put(login({token}));
    } else {
        yield call(() => {
            Alert.alert(res.message);
        })
    }
}

function* signInWatcher() {
    yield takeLatest('USER_SIGN_IN', signInFlow);
}

export default signInWatcher;