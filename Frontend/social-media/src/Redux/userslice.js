import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        otherUserData:null
    },
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload;
        },
        setOtherUserData(state,action){
            state.otherUserData=action.payload
        }
        
    }
});

export const { setUserData,setOtherUserData } = userSlice.actions;

export default userSlice.reducer;
