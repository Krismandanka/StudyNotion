


import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-hot-toast";

const initialState={
    totalItems:localStorage.getItems("totalItems")? JSON.parse(localStorage.getItems("totalItems")):0
}


const cartSlice = createSlice({
    name:"cart",
    initialState:initialState,
    reducers:{
        setTotalToken(state,value){
            state.token=value.payload
        }
    }
})

export const {setToken}= cartSlice.actions;
export default cartSlice.reducer;


