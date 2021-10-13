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
        axios.post('http://localhost:4000/categories', newCategory).then(resp => {
            console.log(resp.data);//zwraca obiekt newCategory
           let id = resp.data.id;
            newCategory.id = id;
        }).catch(error => {
            console.log(error);
        });

        set((state) => ({
            categories: [
                newCategory,
                ...state.categories,
            ]
        }));
    },
    deleteCategory: async (id) => {
        console.log(id);
        axios.delete('http://localhost:4000/categories/'+id).then(resp => {
             console.log(resp.data);

            }).catch(error => {
            console.log(error);
        });

        set((state) => ({

             categories: state.categories.filter((category) => category.id !== id),
        }));
    }});

export default createCategorySlice;
