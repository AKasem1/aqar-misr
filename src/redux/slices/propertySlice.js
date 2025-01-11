import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProperties: [],
  properties: [],
};

const propertySlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
      state.allProperties = action.payload;
    },
    deleteProperty: (state, action) => {
      const { id } = action.payload;
      state.properties = state.allProperties.filter((property) => property._id !== id);
    },
    filterProperties: (state, action) => {
      const { propertyType, contractType } = action.payload;
    //   console.log("properties filtered by: ", propertyType, contractType);

      let filteredProperties = state.allProperties;

      if (propertyType) {
        filteredProperties = filteredProperties.filter(
          (property) => property.propertyType === propertyType
        );
      }

      if (contractType) {
        filteredProperties = filteredProperties.filter(
          (property) => property.contractType === contractType
        );
      }

      state.properties = filteredProperties;
    },
  },
});

export const { setProperties, deleteProperty, filterProperties } = propertySlice.actions;

export default propertySlice.reducer;