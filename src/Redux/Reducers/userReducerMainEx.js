import {
  SET_USERS,
  SET_LOADING,
  SET_EDIT_ROW,
  CLEAR_EDIT_ROW,
  FETCH_USERS,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  SET_ROWDATA,
  ADD_USER_SUCCESS,
} from "../Actions/userActionsData";

const initialState = {
  users: [],
  loading: false,
  editRow: null,
  row: [],
};

const userReducerSaga = (state = initialState, action) => {
  console.log("action:::::::::::::", action);
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case FETCH_USERS:
      return {
        ...state,
        loading: true,
      };
    case ADD_USER:
      console.log(" action.payload--------------", state);
      return {
        ...state,
      };
    case ADD_USER_SUCCESS:
      console.log(" action.payload--------------", state.users);
      return {
        ...state,
        row: [...state.row, { ...action.payload, id: state.row.length + 1 }],
      };
    case UPDATE_USER:
      return {
        ...state,
        row: state.row.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ROWDATA:
      return {
        ...state,
        row: action.payload,
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

export default userReducerSaga;
