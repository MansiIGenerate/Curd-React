import { put, takeLatest, all, call } from "redux-saga/effects";
import axios from "axios";
import {
  setLoading,
  setrowdata,
  addUserSuccess,
  FETCH_USERS_REQUEST,
  ADD_USER_REQUEST,
  UPDATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  fetchUsersSuccess,
  updateUserSuccess,
  addUserfailure,
  updateUserfailure,
  deleteUserfailure,
  deleteUserSuccess,
  fetchUsersRequest,
} from "../Actions/userActionsData";
import toastr from "toastr";

function* fetchUsersSaga() {
  try {
    const response = yield axios.get(
      "https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata"
    );
    const data = response.data.map((val, index) => {
      return val;
    });
    yield put(fetchUsersSuccess(data));
    yield put(setrowdata(data));
    yield put(setLoading(false));
  } catch (error) {
    console.error("Error fetching data:", error);
    yield put(setLoading(false));
  }
}

function* addUserSaga(actions) {
  try {
    const response = yield axios.post(
      "https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata",
      actions.payload
    );
    yield put(addUserSuccess(response.data));
    toastr.success("add data successful");
    yield put(setLoading(false));
  } catch (error) {
    yield put(addUserfailure(actions.payload));
    console.error("Error adding user:", error);
    toastr.error(error.message, "not add data");
    yield put(setLoading(false));
  }
}

function* updateUserSaga(actions) {
  try {
    const { _id, ...userData } = actions.payload;
    const response = yield axios.put(
      `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${_id}`,
      userData
    );
    console.log("response::::::", response);
    yield put(updateUserSuccess(response.data));
    // yield put(fetchUsersRequest());
    yield put(setLoading(false));
    toastr.success("update data successful");
  } catch (error) {
    yield put(updateUserfailure());
    console.error("Error updating user:", error);
    toastr.error(error.message, "not upadte data");
    yield put(setLoading(false));
  }
}

function* deleteUserSaga(actions) {
  try {
    const response = yield axios.delete(
      `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${actions.payload}`
    );
    yield put(deleteUserSuccess(response.data));
    yield put(fetchUsersRequest());
    yield put(setLoading(false));
    toastr.success("delete data successful");
  } catch (error) {
    yield put(deleteUserfailure());
    console.error("Error deleting user:", error);
    toastr.error(error.message, "Failed to delete data");
    yield put(setLoading(false));
  }
}

function* userSaga() {
  yield all([
    takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga),
    takeLatest(ADD_USER_REQUEST, addUserSaga),
    takeLatest(UPDATE_USER_REQUEST, updateUserSaga),
    takeLatest(DELETE_USER_REQUEST, deleteUserSaga),
  ]);
}

export default userSaga;
