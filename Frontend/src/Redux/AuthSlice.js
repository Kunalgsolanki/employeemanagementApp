import { createSlice } from "@reduxjs/toolkit";

const initialState={
     loading :null, 
     error :null, 
     user :null
}
const AuthSlice = createSlice({
     name :"authSlice", 
     initialState:initialState,
     reducers:{

     }
});
export default AuthSlice.reducer;