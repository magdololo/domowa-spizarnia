import CategoriesService from "../services/CategoriesService";

const createCategorySlice = (set, get) => ({
//set ustawianie stanu get pobieranie ze stanu
    categories: [],
    getDefaultCategories: async (user) =>{
        let defaultCategories=[];
        if(user){
            defaultCategories= await CategoriesService.getDefaultCategories()
        }
        
        set((state) => ({
            categories: defaultCategories,
        }));
    },
    addDefaultCategoriesToUser: async (user)=>{
        let defaultCategories = await CategoriesService.addDefaultCategoriesToUser(user.uid);
        set((state) => ({
            categories: defaultCategories
        }));
   },
   getUserCategories: async (userId) => {
        let categories=[];
        categories = await CategoriesService.getUserCategories(userId);
        
        
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
    getCategoryById: async (id) => {
        let categories = get().categories;//pobiera kategorie ze stanu
        if (categories.length === 0) {
            const fetch = get().getUserCategories;
            await fetch(get().loggedInUser.id);
            categories = get().categories;
        }
        let category = categories.filter(categoryItem => categoryItem.id === id);
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
    setEditCategory: (userId, url, title, path, categoryId) => {
        set({editCategory: {userId, url, title, path, categoryId}})


    },
    updateCategory: async (userId, path, url, title, categoryId) => {
        
        let updateCategory = await CategoriesService.updateCategory(userId, path, url, title, categoryId)
        
        set((state) => {
                let categories = state.categories.filter(editCategory => editCategory.id !== categoryId);
                categories.push(updateCategory)
                return {
                    categories: categories,
                    editCategory: {}
                }
            }
        )
    },
    deleteCategory: async (categoryId) => {
        const userId = get().loggedInUser.uid;
        const response = await CategoriesService.deleteCategory(userId, categoryId);

        set((state) => ({
            categories: state.categories.filter(deleteCategory => deleteCategory.id !== categoryId),
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
