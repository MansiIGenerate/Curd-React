export const setUsers = () => ({
  type: "FETCH_DATA",
});

export const addUser = (userData) => ({
  type: "ADD_USER",
  payload: userData,
});

export const updateUser = (id, userData) => ({
  type: "UPDATE_USER",
  payload: { id, userData },
});

export const deleteUser = (userId) => ({
  type: "DELETE_USER",
  payload: userId,
});

// export const fetchData = () => ({ type: FETCH_DATA });
// export const fetchDataSuccess = (data) => ({
//   type: FETCH_DATA_SUCCESS,
//   payload: data,
// });
// export const fetchDataFailure = (error) => ({
//   type: FETCH_DATA_FAILURE,
//   payload: error,
// });
// export const updateData = (id, data) => ({
//   type: UPDATE_DATA,
//   payload: { id, data },
// });
// export const updateDataSuccess = () => ({ type: UPDATE_DATA_SUCCESS });
// export const updateDataFailure = (error) => ({
//   type: UPDATE_DATA_FAILURE,
//   payload: error,
// });
// export const deleteData = (id) => ({ type: DELETE_DATA, payload: { id } });
// export const deleteDataSuccess = () => ({ type: DELETE_DATA_SUCCESS });
// export const deleteDataFailure = (error) => ({
//   type: DELETE_DATA_FAILURE,
//   payload: error,
// });
