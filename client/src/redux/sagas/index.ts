import { all, takeLatest, select } from "redux-saga/effects";

//save state to local storage for every action
function* saveStoreState() {
  const state = yield select();
  yield localStorage.setItem("store", JSON.stringify(state));
}

// export default function* rootSaga() {
//   yield all([takeLatest("*", saveStoreState)]);
// }
