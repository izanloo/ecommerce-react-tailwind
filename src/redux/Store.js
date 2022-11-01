import {configureStore} from '@reduxjs/toolkit';
import NameSlice from './Slice';

export const store = configureStore({
    reducer:{
        nameState:NameSlice
    }
})