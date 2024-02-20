import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  CLEAR_EDIT_ROW,
  DELETE_USER_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SET_EDIT_ROW,
  SET_LOADING,
  SET_ROWDATA,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "../Actions/userActionsData";

const initialState = {
  users: [],
  Loading: false,
  rowData: [],
  editRow: null,
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
    case ADD_USER_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        Loading: true,
        error: null,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        error: null,
      };

    case FETCH_USERS_SUCCESS:
      // console.log("users action.payload", action.payload);
      return {
        ...state,
        users: action.payload,
        Loading: false,
        error: null,
      };

    case FETCH_USERS_FAILURE:
    case ADD_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case DELETE_USER_FAILURE:
      return {
        ...state,
        Loading: false,
        error: "Failed to fetch data",
      };

    case ADD_USER_SUCCESS:
      return {
        ...state,
        rowData: [
          ...state.rowData,
          { ...action.payload, id: state.rowData.length + 1 },
        ],
        Loading: false,
        error: null,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
        Loading: false,
        error: null,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        Loading: false,
        error: null,
      };

    case SET_LOADING:
      return {
        ...state,
        Loading: action.payload,
      };

    case SET_ROWDATA:
      return {
        ...state,
        rowData: action.payload,
      };

    case SET_EDIT_ROW:
      return {
        ...state,
        editRow: action.payload,
      };

    case CLEAR_EDIT_ROW:
      return {
        ...state,
        editRow: null,
      };

    default:
      return state;
  }
};

export default usersReducer;
