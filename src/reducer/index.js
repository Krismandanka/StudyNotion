

import {combineReducers} from "@reduxjs/toolkit"
import authReduces from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";



const rootReducer = combineReducers({
    auth :authReduces,
    profile:profileReducer,
    cart:cartReducer,

    

})

export default rootReducer


