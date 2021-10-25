import axios from "axios";

const createProductsSlice = (set, get) => ({
    products: [],
    fetchProducts: async productsFetch => {
        const response = await fetch('http://192.168.1.134:4000/products');
        set({products: await response.json()})
    },
    addProduct: (newProduct) => {
        console.log("new product")
        console.log(newProduct)
        axios.post('http://192.168.1.134:4000/products', newProduct).then(resp => {
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
            ]
        }))
    },
    deleteProduct: async (id) => {
        axios.delete('http://192.168.1.134:4000/products/' + id).then(resp => {
            console.log(resp.data);

        }).catch(error => {
            console.log(error);
        });
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        }))
    },

    incrementProduct: async (id, quantity) => {
        axios.patch('http://192.168.1.134:4000/products/' + id,
            {
                quantity: quantity + 1
            }).then(resp => {

            console.log(resp.data);

        }).catch(error => {
            console.log(error);
        });
        set((state) => ({
            products: state.products.map((product) => product.id === id? {...product, quantity: product.quantity+1}:product)
            }

        ));
    },

   decrementProduct: async (id, quantity) => {
        axios.patch('http://192.168.1.134:4000/products/' + id,
            {
                quantity: quantity - 1
            }).then(resp => {

            console.log(resp.data);

        }).catch(error => {
            console.log(error);
        });
        set((state) => ({
                products: state.products.map((product) => product.id === id ? {...product, quantity: product.quantity-1} : product)
            }

        ));
    },
});

export default createProductsSlice;



