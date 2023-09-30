

import {combineReducers} from "@reduxjs/toolkit"
import authReduces from "../slices/authSlice"
import profileReducer from "../slices/profileSlice";
import cartReducer from "../slices/cartSlice";
import loadingBarSlice from "../slices/loadingBarSlice";



const rootReducer = combineReducers({
    auth :authReduces,
    profile:profileReducer,
    cart:cartReducer,
    loadingBar:loadingBarSlice
    

})

export default rootReducer


