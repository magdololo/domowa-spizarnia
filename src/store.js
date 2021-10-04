import { configureStore } from '@reduxjs/toolkit'
import storeroomReducer from './storeroomSlice'
export const store = configureStore({
    reducer: {
        storeroom: storeroomReducer,
    },
})