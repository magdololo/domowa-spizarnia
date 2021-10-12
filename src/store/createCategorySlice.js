import axios from "axios";
import slugify from "slugify";

const createCategorySlice = (set, get) => ({
    categories: [],
    fetch: async categoriesFetch => {
        const response = await fetch('http://localhost:4000/categories');
        set({categories: await response.json()})
    },
    addCategory: async (newCategory) => {
        console.log("new category")
        console.log(newCategory)

        //const axios = require('axios');
        console.log("new category")
        console.log(newCategory)
        let response = await fetch ('http://localhost:4000/categories', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCategory),
        });
        let responseJson = await response.json();
        console.log('Success:', responseJson);
        let id = responseJson.id;
        newCategory.id = id;
        set((state) => ({
            categories: [
                newCategory,
                ...state.categories,
            ]
        }));
    },
    deleteCategory: (path) =>
        set((state) => ({
            categories: state.categories.filter((category) => category.path !== path),
        }))
})

export default createCategorySlice;
