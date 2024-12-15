import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requests: [],
};

const requestSlice = createSlice({
  name: 'request',
  initialState,
  reducers: {
    setPropertyRequests: (state, action) => {
      state.requests = action.payload;
    },

    acceptRequest: (state, action) => {
      const { id } = action.payload; 
      const index = state.requests.findIndex((request) => request._id === id);

      if (index !== -1) {
        state.requests[index].accepted = 'accepted';
        state.requests = state.requests.filter((request) => request._id !== id);
      }
    },
    rejectRequest: (state, action) => {
      const { id } = action.payload; 
      const index = state.requests.findIndex((request) => request._id === id);

      if (index !== -1) {
        state.requests[index].accepted = 'rejected';
        state.requests = state.requests.filter((request) => request._id !== id);
      }
    },
  },
});

export const { setPropertyRequests, acceptRequest, rejectRequest } = requestSlice.actions;

export default requestSlice.reducer;
