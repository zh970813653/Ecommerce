import axios from "axios";
import { put, takeEvery } from "redux-saga/effects";
import { API } from "../../config";
import { Category } from "../../models/category";
import { CATEGORY, getCategorySuccess } from "../actions/category.actions";

function* handleGetCategory():any{
    let response = yield axios.get<Category[]>(`${API}/categories`)
    yield put(getCategorySuccess(response.data))
}

export default function* categorySaga () {
    yield takeEvery(CATEGORY,handleGetCategory)
}