import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    products : [
        {
            name: "olej kujawski",
            path: "olej_kujawski",
            categoryPath: "przetwory_owocowe_miod",
            quantity: 2,
            expireDate: "09.06.2023"
        },
        {
            name: "olej kokosowy",
            path: "olej_kokosowy",
            categoryPath: "maka_makarony_ryze",
            quantity: 5,
            expireDate: "30.12.2022"
        },
        {
            name: "olej lniany",
            path: "olej_lniany",
            categoryPath: "przetwory_owocowe_miod",
            quantity: 6,
            expireDate: "29.09.2028"
        },
        {
            name: "olej palmowy",
            path: "olej_palmowy",
            categoryPath: "przetwory_owocowe_miod",
            quantity: 8,
            expireDate: "19.08.2026"
        }

    ],
    categories: []
}

export const storeroomSlice = createSlice({
    name: 'storeroom',
    initialState,
    reducers: {
        addProduct: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        deleteProduct: (state, action) => {
            state.value -= 1
        },
        editProduct: (state, action) => {
            state.value += action.payload
        },
        addCategory: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value += 1
        },
        deleteCategory: (state, action) => {
            state.value -= 1
        },
        editCategory: (state, action) => {
            state.value += action.payload
        },
        addInitialCategory: (state, action) => {
            state.categories = action.payload;
        },
    },
})

 export const asyncFetch = async () =>{
    let result = null;
   await fetch('http://localhost:4000/categories')
        .then(response => {
            if (response.ok) {
                return response;
            }
            throw Error(response.status)
        })
        .then(response => response.json())
        .then(data => {
            result = data;
        })
     return result;
}



// Action creators are generated for each case reducer function
export const { addProduct, deleteProduct, editProduct, addCategory, editCategory, deleteCategory,addInitialCategory } = storeroomSlice.actions;

export default storeroomSlice.reducer;