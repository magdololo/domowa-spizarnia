const createProductsSlice = (set, get) => ({
    products: [],
    fetchProducts: async productsFetch => {
        const response = await fetch('http://localhost:4000/products');
        set({ products: await response.json() })
    },
    addProduct: (newProduct)=> {
        console.log("new product")
        console.log(newProduct)
        set((state) => ({
            products: [
                newProduct,
                ...state.products,
            ]}))
    },
    deleteProduct: (path) =>
        set((state) => ({
            products: state.products.filter((product) => product.path !== path),
        }))
})

export default createProductsSlice;
