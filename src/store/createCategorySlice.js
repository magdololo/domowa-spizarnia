import axios from "axios";


const createCategorySlice = (set, get) => ({
    categories: [],
    categoriesFetched: false,
    fetch: async categoriesFetch => {
        const response = await fetch('http://192.168.1.134:4000/categories');
        set({categories: await response.json()})
    },
    getCategoryByPath: async (path) => {
        let categories = get().categories;//pobiera kategorie ze stanu
        console.log(categories);
        console.log(path)
        if (categories.length === 0) {

            const fetch = get().fetch;
            await fetch();
            categories = get().categories;
        }
        let category = categories.filter(categoryItem => categoryItem.path === path);
        console.log(category);
        return category[0];

    },
    addCategory: async (newCategory) => {
        console.log("new category")
        console.log(newCategory)


        axios.post('http://192.168.1.134:4000/categories', newCategory).then(resp => {
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
    editModalOpen: false,
    setEditCategoryModalOpen: (open) => {
        set({editModalOpen: open})
    },
    editCategory: {},
    setEditCategory: (id, url, title, path) => {
        set({editCategory: {url, title, path, id}})
        console.log("editCategory")


    },
    updateCategory: async (id, path, url, title) => {
        axios.put('http://192.168.1.134:4000/categories/' + id,
            {
                url: url,
                path: path,
                title: title
            }).then(resp => {

            let editCategory = resp.data;
            console.log(editCategory);
            set((state) => {
                    let categories = state.categories.filter(editCategory => editCategory.id !== id);
                    categories.push(editCategory)
                    return {
                        categories: categories
                    }
                }
            )
        }).catch(error => {
            console.log(error);
        });


    },
    deleteCategory: async (id) => {
        console.log(id);
        axios.delete('http://192.168.1.134:4000/categories/' + id).then(resp => {
            console.log(resp.data);

        }).catch(error => {
            console.log(error);
        });

        set((state) => ({

            categories: state.categories.filter((category) => category.id !== id),
        }));
    }
});

export default createCategorySlice;
