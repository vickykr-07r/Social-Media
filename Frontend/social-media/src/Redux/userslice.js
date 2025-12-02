import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        otherUserData:null,
        profileData:null
    },
    reducers: {
        setUserData(state, action) {
            state.userData = action.payload;
        },
        setOtherUserData(state,action){
            state.otherUserData=action.payload
        },
        setProfileData(state,action){
           state.profileData=action.payload
        }
        
    }
});

export const { setUserData,setOtherUserData,setProfileData } = userSlice.actions;

export default userSlice.reducer;
