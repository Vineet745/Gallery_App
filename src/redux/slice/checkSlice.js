import { createSlice } from "@reduxjs/toolkit";

export const checkSlice = createSlice({
    name:'check',
    initialState:{check:false},
    reducers:{
         setTrue:(state,action)=>{
            console.log("action",action)
            state.check = action.payload
         }
    }
})


export const {setTrue} = checkSlice.actions

export default checkSlice.reducer