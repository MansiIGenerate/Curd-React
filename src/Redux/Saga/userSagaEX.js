import { put, takeLatest, all, call } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_USERS,
  SET_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  setLoading,
  setrowdata,
  deleteUser,
  updateUser,
  addUserSuccess,
} from "../Actions/userActionsData";

function* fetchUsersSaga() {
  // yield put(setLoading(true));
  try {
    const response = yield axios.get(
      "https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata"
    );
    const data = response.data.map((val, index) => {
      val.id = index + 1;
      return val;
    });
    // yield put({ type: SET_USERS, payload: response.data });
    yield put(setLoading(false));
    yield put(setrowdata(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    yield put(setLoading(false));
  }
}

function* addUserSaga(action) {
  try {
    const response = yield axios.post(
      "https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata",
      action.payload
    );
    console.log(" response.data", response.data);
    // yield put({ type: FETCH_USERS });
    yield put(addUserSuccess(response.data));
    // yield put({ type: SET_USERS, payload: response.data });
  } catch (error) {
    console.error("Error adding user:", error);
  }
}

function* updateUserSaga(action) {
  // alert(2);
  try {
    const { _id, ...userData } = action.payload;
    yield axios.put(
      `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${_id}`,
      userData
    );
    // yield put(updateUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

function* deleteUserSaga(action) {
  alert(1);
  console.log("action.payload", action.payload);
  try {
    yield axios.delete(
      `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${action.payload}`
    );
    yield put({ type: FETCH_USERS });
    // yield put(deleteUser(action.payload));
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

function* userSaga() {
  yield all([
    takeLatest(FETCH_USERS, fetchUsersSaga),
    takeLatest(ADD_USER, addUserSaga),
    takeLatest(UPDATE_USER, updateUserSaga),
    takeLatest(DELETE_USER, deleteUserSaga),
  ]);
}

export default userSaga;
