import axios, { AxiosResponse } from "axios";
import { put, takeEvery } from "@redux-saga/core/effects";
import { API } from "../../config";
import { 
    setUserInfo,
    SIGNIN, 
    SigninAction, 
    signinSuccess, 
    SIGNUP, 
    SignupAction, 
    signupFail, 
    signupSuccess, 
    UserInfoPayload 
} from "../actions/auth.actions";
import { setStorage } from "../../utils";
interface SigninResult {
    token: string,
    user: UserInfoPayload
}

function* handleSignup(action: SignupAction) {
    try {
        yield axios.post(`${API}/signup`, action.payload)
        yield put(signupSuccess())
    } catch (error: any) {
        yield put(signupFail(error.response.data.error))
    }

}

function* handleSignin(action: SigninAction): any {
    try {
        const result:AxiosResponse<SigninResult>  = yield axios.post(`${API}/signin`, action.payload)
        setStorage('jwt',result.data)
        yield put(signinSuccess())
        yield put(setUserInfo(result.data.user))
    } catch (error: any) {
        yield put(signupFail(error.response.data.error))
    }

}

export default function* authSaga() {
    yield takeEvery(SIGNUP, handleSignup)
    yield takeEvery(SIGNIN, handleSignin)
}