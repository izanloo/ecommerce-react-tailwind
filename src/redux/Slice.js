import {createSlice} from '@reduxjs/toolkit';

export const NameSlice = createSlice({
    name:'nameState',
    initialState:{
        nameState:[]
    },
    reducers:{
        setNameState:(state,action) =>{
            state.category = action.payload
        },
    },
})
export const {setNameState} = NameSlice.actions
export default NameSlice.reducer