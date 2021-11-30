import CategoriesService from "../services/CategoriesService";


const createCategorySlice = (set, get) => ({
//set ustawianie stanu get pobieranie ze stanu
    categories: [],
   getUserCategories: async (userId) => {
        let categories = await CategoriesService.getUserCategories(userId);
        set((state) => ({
            categories: categories,
        }));
    },
    getCategoryByPath: async (path) => {
        let categories = get().categories;//pobiera kategorie ze stanu
        if (categories.length === 0) {
            const fetch = get().getUserCategories;
            await fetch(get().loggedInUser.id);
            categories = get().categories;
        }
        let category = categories.filter(categoryItem => categoryItem.path === path);
        return category[0];

    },
    addCategory: async (newCategory) => {

        await CategoriesService.addNewCategory(newCategory);
        set((state) => ({
            categories: [
                newCategory,
                ...state.categories
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

        await CategoriesService.deleteCategory(id);
        set((state) => ({
            categories: state.categories.filter(deleteCategory => deleteCategory.id !== id),
        }));
    },
    images: [],
    getImages: async () => {
        const response = await CategoriesService.fetchImages();
        set((state) => ({
            images: response,
        }));
        },
    pickedImage: '',
    setPickedImage: (url)=> {
        set({pickedImage: url})
        },

});

export default createCategorySlice;
