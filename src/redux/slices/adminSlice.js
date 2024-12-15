import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admin: null,
    token: null,
    isAuthorized: false,
    error: null,
  };
  
  const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
      setAdmin(state, action) {
        state.admin = action.payload.admin;
        state.token = action.payload.token;
        state.isAuthorized = true;
      },
      logout(state) {
        state.admin = null;
        state.token = null;
        state.isAuthorized = false;
      },
      setError(state, action) {
        state.error = action.payload;
      },
    },
  });
  
  export const { setAdmin, logout, setError } = adminSlice.actions;
  
  export default adminSlice.reducer;