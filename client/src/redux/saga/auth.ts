import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Alert } from 'react-native';
import { call, put, takeLatest } from 'redux-saga/effects'
import { login } from '../features/authSlice';

const handleSignIn = (data) => {
    return axios({
        url: `http://${LOCAL_IP}:3005/login`,
        method: "POST",
        data,
        headers: { "Access-Control-Allow-Origin": "*"}
    })
}

function* signInFlow(action) {
    const {email, password} = action;
    const res = yield call(handleSignIn, {email, password});
    if (res.ok) {
        const navigation = useNavigation();
        const {token} = res.data;
        yield put(login({token}));
        // navigation.navigate("Main", {});
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