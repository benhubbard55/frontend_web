import { combineReducers } from "@reduxjs/toolkit";
import authUserReducer from "./authSlice";
// import profileUserReducer from '../reducers/slice/profileSlice';
// import orderReducer from './slice/orderSlice';

const rootReducer = combineReducers({
  user: authUserReducer,
  //   profile : profileUserReducer,
  //   order: orderReducer,
});

export default rootReducer;
