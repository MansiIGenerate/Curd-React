export const FETCH_USERS = "FETCH_USERS";
export const SET_USERS = "SET_USERS";
export const ADD_USER = "ADD_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";
export const SET_LOADING = "SET_LOADING";
export const SET_EDIT_ROW = "SET_EDIT_ROW";
export const CLEAR_EDIT_ROW = "CLEAR_EDIT_ROW";
export const SET_ROWDATA = "SET_ROWDATA";
export const ADD_USER_SUCCESS = "ADD_USER_SUCCESS";

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const setUsers = (users) => ({
  type: SET_USERS,
  payload: users,
});

export const addUser = (userData) => ({
  type: ADD_USER,
  payload: userData,
});

export const addUserSuccess = (userData) => ({
  type: ADD_USER_SUCCESS,
  payload: userData,
});

export const updateUser = (userData) => ({
  type: UPDATE_USER,
  payload: userData,
});

export const deleteUser = (userId) => ({
  type: DELETE_USER,
  payload: userId,
});

export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
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
});
