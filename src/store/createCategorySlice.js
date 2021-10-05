
const createCategorySlice = (set, get) => ({
    categories: [],
    fetch: async categoriesFetch => {
        const response = await fetch('http://localhost:4000/categories');
        set({ categories: await response.json() })
    },
    addCategory: (newCategory)=> {
        console.log("new category")
        console.log(newCategory)
        set((state) => ({
            categories: [
                newCategory,
                ...state.categories,
            ]}))
    },
    deleteCategory: (path) =>
        set((state) => ({
            categories: state.categories.filter((category) => category.path !== path),
        }))
})

export default createCategorySlice;
