import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setUser(state, action) {
        // console.log('Previous State:', state);
        // console.log('Action Payload:', action.payload);
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        // console.log('Updated State:', state);
      },
      logout(state) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      },
      setError(state, action) {
        state.error = action.payload;
      },
    },
  });
  
  export const { setUser, logout, setError } = authSlice.actions;
  
  export default authSlice.reducer;