import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../Reducers/userReducerSaga";
import userSaga from "../Saga/userSaga";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(userSaga);

export default store;

// import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "../Reducers/userReducer";
// const store = configureStore({
//   reducer: {
//     users: userReducer,
//   },
// });

// export default store;
