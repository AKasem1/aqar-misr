import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import requestReducer from './slices/requestSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    property: requestReducer,
  });
  export default rootReducer;