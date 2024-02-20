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
} from "../Actions/userActionsData";
import toastr from "toastr";
import Swal from "sweetalert2";

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
    yield put(fetchUsersSuccess(data));
    yield put(setrowdata(data));
    yield put(setLoading(false));
  } catch (error) {
    console.error("Error fetching data:", error);
    yield put(setLoading(false));
  }
}

function* addUserSaga(actions) {
  // console.log("action.payload????????????????", actions);
  // yield put(setLoading(true));
  try {
    const response = yield axios.post(
      "https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata",
      actions.payload
    );
    console.log(" response.data", response.data);
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

function* updateUserSaga(action) {
  try {
    const { _id, ...userData } = action.payload;
    yield axios.put(
      `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${_id}`,
      userData
    );
    // yield put(updateUserSuccess());
    yield put({ type: FETCH_USERS_REQUEST });
    yield put(setLoading(false));
    toastr.success("update data successful");
  } catch (error) {
    yield put(updateUserfailure());
    console.error("Error updating user:", error);
    toastr.error(error.message, "not upadte data");
    yield put(setLoading(false));
  }
}

function* deleteUserSaga(action) {
  try {
    // yield call(Swal.fire, {
    //   title: "Do you want to Delete?",
    //   showCancelButton: true,
    //   confirmButtonText: "Delete",
    // });
    yield axios.delete(
      `https://65c7118fe7c384aada6e2870.mockapi.io/mydata/mydata/${action.payload}`
    );
    yield put({ type: FETCH_USERS_REQUEST });
    yield put(setLoading(false));
    toastr.success("delete data successful");
  } catch (error) {
    yield put(deleteUserfailure);
    yield put(setLoading(false));
    console.error("Error deleting user:", error);
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
