import { all } from "redux-saga/effects";
import authWatcher from "./auth";
import itemListWatcher from "./items";

export default function* RootSaga() {
    yield all([
      authWatcher(),
      itemListWatcher()
    ]);
}