export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const ADD_USER_REQUEST = "ADD_USER_REQUEST,";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";
export const ADD_USER_FAILURE = " ADD_USER_FAILURE";
export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = " UPDATE_USER_FAILURE,";
export const DELETE_USER_REQUEST = "DELETE_USER_REQUEST";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";
export const SET_LOADING = "SET_LOADING";
export const SET_ROWDATA = "SET_ROWDATA";
export const SET_EDIT_ROW = "SET_EDIT_ROW";
export const CLEAR_EDIT_ROW = "CLEAR_EDIT_ROW";

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const fetchUsersfailure = () => ({
  type: FETCH_USERS_FAILURE,
});

export const addUserRequest = (user) => ({
  type: ADD_USER_REQUEST,
  payload: user,
});

export const addUserSuccess = (userData) => ({
  type: ADD_USER_SUCCESS,
  payload: userData,
});
export const addUserfailure = () => ({
  type: ADD_USER_FAILURE,
});

export const updateUserRequest = (user) => ({
  type: UPDATE_USER_REQUEST,
  payload: user,
});

export const updateUserSuccess = (userData, userId) => ({
  type: UPDATE_USER_SUCCESS,
  payload: { userId, userData },
});
export const updateUserfailure = () => ({
  type: UPDATE_USER_FAILURE,
});
export const deleteUserRequest = (userId) => ({
  type: DELETE_USER_REQUEST,
  payload: userId,
});

export const deleteUserSuccess = (userId) => ({
  type: DELETE_USER_SUCCESS,
  payload: userId,
});

export const deleteUserfailure = (error) => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

export const setLoading = (Loading) => ({
  type: SET_LOADING,
  payload: Loading,
});

export const setrowdata = (userData) => ({
  type: SET_ROWDATA,
  payload: userData,
});

export const setEditRow = (rowData) => ({
  type: SET_EDIT_ROW,
  payload: rowData,
});

export const clearEditRow = () => ({
  type: CLEAR_EDIT_ROW,
  payload: [],
});
