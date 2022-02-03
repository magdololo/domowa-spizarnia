import CategoriesService from "../services/CategoriesService";
/**
 * @typedef {Object} Category
 * @property {string} url
 * @property {string} title
 * @property {string} path
 * @property {string} categoryId
 * @property {string} userId
 * @property {string} id
 * */
const createCategorySlice = (set, get) => ({
//set ustawianie stanu get pobieranie ze stanu
    categories: [],
    getDefaultCategories: async (user) =>{
        /** @type {Array} */
        let defaultCategories=[];
        if(user){
            defaultCategories= await CategoriesService.getDefaultCategories()
        }
        
        set((state) => ({
            categories: defaultCategories,
        }));
    },
    /**
     *
     * @param user
     * @return {Promise<void>}
     */
    addDefaultCategoriesToUser: async (user)=>{
        let defaultCategories = await CategoriesService.addDefaultCategoriesToUser(user.uid);
        console.log(defaultCategories)
        set((state) => ({
            categories: defaultCategories
        }));
   },
    requiredCategoryId:'',
    requiredCategory: {},
    /**
     *
     * @param userId
     * @return {Promise<Category[]>}
     */
   getUserCategories: async (userId) => {
       /** @type {Array} */
        let categories=[];
        categories = await CategoriesService.getUserCategories(userId);
        let requiredCategory = categories.filter(category => category.required === "true");
        requiredCategory = requiredCategory[0];
        let requiredCategoryId = requiredCategory.id;
        set((state) => ({
            categories: categories,
            requiredCategory: requiredCategory,
            requiredCategoryId: requiredCategoryId
        }));
    },
    /**
     *
     * @param path
     * @return {Category}
     */
    getCategoryByPath: (path) => {
        let categories = get().categories;//pobiera kategorie ze stanu
        /** @type {Object} */
        let category = categories.filter(categoryItem => categoryItem.path === path);
        return category[0];
    },
    /**
     *
     * @param id
     * @return {Category}
     */
    getCategoryById: (id) => {
        let categories = get().categories;//pobiera kategorie ze stanu
        /** @type {Object} */
        let category = categories.filter(categoryItem => categoryItem.id === id);
        return category[0];
    },
    /**
     *
     * @param {object} newCategory
     * @return {Promise<void>}
     */
    addCategory: async (newCategory) => {
        console.log(newCategory)
        await CategoriesService.addNewCategory(newCategory);
        set((state) => ({
            categories: [
                newCategory,
                ...state.categories
            ]
        }));
    },
    editModalOpen: false,
    /**
     *
     * @param {boolean} open
     * @return {Promise<void>}
     */
    setEditCategoryModalOpen: (open) => {
        set({editModalOpen: open})
    },
    editCategory: {},
    /**
     *
     * @param {string} userId
     * @param {string} url
     * @param {string} title
     * @param {string} path
     * @param {string} categoryId
     * @return {Promise<void>}
     */
    setEditCategory: (userId, url, title, path, categoryId) => {
        set({editCategory: {userId, url, title, path, categoryId}})
    },
    /**
     *
     * @param {string} userId
     * @param {string} path
     * @param {string} url
     * @param {string} title
     * @param {string} categoryId
     * @return {Promise<void>}
     */
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
    /**
     * @param {string} categoryId
     * @param {string} userId
     * @param {string} userId
     * @return {Promise<void>}
     * */
    deleteCategory: async ( userId, categoryId) => {

        let category =  get().categories.filter(category => category.id === categoryId)
        console.log(category)
        if(category[0].hasOwnProperty("required") === false || category[0].required === "false"){
            await CategoriesService.deleteCategory(userId, categoryId);

            set((state) => ({
                categories: state.categories.filter(deleteCategory => deleteCategory.id !== categoryId),
            }));
        }
    },


    images: [],
    /**
     *
     * @return {Promise<void>}
     */
    getImages: async () => {
        /** @type {Array} */
        const response = await CategoriesService.fetchImages();
        set((state) => ({
            images: response,
        }));
        },
    pickedImage: '',
    /**
     *
     * @param {string} url
     * @return {Promise<void>}
     */
    setPickedImage: (url)=> {
        set({pickedImage: url})
        },
});

export default createCategorySlice;
