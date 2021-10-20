import axios from "axios";

const createProductsSlice = (set, get) => ({
    products: [],
    fetchProducts: async productsFetch => {
        const response = await fetch('http://localhost:4000/products');
        set({ products: await response.json() })
    },
    addProduct: (newProduct)=> {
        console.log("new product")
        console.log(newProduct)
        axios.post('http://localhost:4000/products', newProduct).then(resp => {
            console.log(resp.data);//zwraca obiekt newProduct
            let id = resp.data.id;
            newProduct.id = id;
        }).catch(error => {
            console.log(error);
        });
        set((state) => ({
            products: [
                newProduct,
                ...state.products,
            ]}))
    },
    deleteProduct: async (id) =>{
        axios.delete('http://localhost:4000/products/'+id).then(resp => {
            console.log(resp.data);

        }).catch(error => {
            console.log(error);
        });
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        }));
}});

export default createProductsSlice;
