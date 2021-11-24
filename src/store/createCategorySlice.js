import CategoriesService from "../services/CategoriesService";


const createCategorySlice = (set, get) => ({
//set ustawianie stanu get pobieranie ze stanu
    categories: [],
   //categoriesFetched: false,
   getCategories: async () => {
        let categories = await CategoriesService.fetch();
        console.log(categories)
        set((state) => ({
            categories: categories,
        }));
    },
    getCategoryByPath: async (path) => {
        let categories = get().categories;//pobiera kategorie ze stanu
        console.log(categories);
        console.log(path)
        if (categories.length === 0) {

            const fetch = get().getCategories;
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
        let addedCategory = await CategoriesService.addNewCategory(newCategory);
        console.log(addedCategory)


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
        let updateCategory = await CategoriesService.updateCategory(id, path, url, title)
        set((state) => {
                let categories = state.categories.filter(editCategory => editCategory.id !== id);
                categories.push(updateCategory)
                return {
                    categories: categories,
                    editCategory: {}
                }
            }
        )
    },
    deleteCategory: async (id) => {

        let deleteCategory = await CategoriesService.deleteCategory(id);
        set((state) => ({
            categories: state.categories.filter(deleteCategory => deleteCategory.id !== id),
        }));
    },
    images: [],
    getImages: async () => {
        const response = await CategoriesService.fetchImages();
        console.log(response);
        set((state) => ({
            images: response,
        }));
        },
    pickedImage: '',
    setPickedImage: (url)=> {
        console.log("pickedImage")
        console.log(url)
        set({pickedImage: url})
        },

});

export default createCategorySlice;
