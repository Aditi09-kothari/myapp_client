import { configureStore } from "@reduxjs/toolkit";
import AllDataStateReducer from "../features/MoviesState"


export const store = configureStore({
    reducer : AllDataStateReducer,
})

export default store