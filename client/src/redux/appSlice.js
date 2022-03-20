import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    authUser: null,
    allEvents:null,
  }
  
    const AppSlice = createSlice({
    name: 'App',
    initialState,
    reducers: {
      setIsAuthenticated: (state,action) => {
          state.isAuthenticated = action.payload;
      },
      setAuthUser: (state, action) => {
          state.authUser = action.payload;
      },
      setAllEvents: (state, action) => {
        state.allEvents = action.payload;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setIsAuthenticated, setAuthUser, setAllEvents } = AppSlice.actions;
  
  export default AppSlice.reducer;