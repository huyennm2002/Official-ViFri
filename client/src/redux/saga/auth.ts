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