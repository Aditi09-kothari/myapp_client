import {createSlice} from "@reduxjs/toolkit"

const initialState ={
    movies: [],
    tvSeries : []
}
const movieSlice = createSlice({
    name : "AllDataState",
    initialState,
    reducers : {
        addmovies : (state,{payload})=>{
            state.movies = payload;
        },
        addtvSeries : (state ,action)=>{
            state.tvSeries = action.payload
        },
    }
})
export const {addmovies,addtvSeries
} = movieSlice.actions;
export default movieSlice.reducer;