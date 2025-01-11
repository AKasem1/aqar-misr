import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import adminReducer from './slices/adminSlice';
import requestReducer from './slices/requestSlice';
import propertyReducer from './slices/propertySlice';
const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    property: requestReducer,
    properties: propertyReducer
  });
  export default rootReducer;