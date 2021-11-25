
import ProductsService from "../services/ProductsService";

const createProductsSlice = (set, get) => ({
    products: [],
    fetchProducts: async () => {
        const response = await ProductsService.getAllProducts();
        console.log(response);
        set((state) => ({
            products: response,
        }));
    },
    addProduct: async (newProduct, userId) => {
        console.log("new product")
        console.log(newProduct)
        let addedProduct= await ProductsService.addProduct(newProduct, userId);
            console.log(addedProduct);//return object newProduct
            set((state) => ({
                products: [
                    addedProduct,
                    ...state.products,
                ]
            }))//dodajemy tu do stanu zeby date waznosci dodal w tym samym formacie co w json server


    },

    editModalOpen: false,
    setEditProductModalOpen: (open) => {
        set({editModalOpen: open})
    },
    editProduct: {},
    setEditProduct: (id, name, capacity, unit,quantity, expireDate, categoryId) => {
        set({editProduct: {id, name, capacity, unit, quantity, expireDate, categoryId}});
        console.log("editProduct")

    },
    updateProduct: async (id, name, capacity, unit, quantity, expireDate, categoryId)=>{
            let editProduct = await ProductsService.updateProduct(id, name, capacity, unit, quantity, expireDate, categoryId);
            console.log("updateProduct")
            console.log(editProduct);
            set((state)=> {
                    let products = state.products.filter(editProduct => editProduct.id !== id);
                    products.push(editProduct)
                    return {
                        products: products
                    }
                }
            )


    },
    deleteProduct: async (id) => {
        let deletedProduct = await ProductsService.deleteProduct(id);
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        }))
    },

    incrementProduct: async (id, quantity) => {
        let incrementProduct = await ProductsService.incrementProduct(id, quantity);
        set((state) => ({
            products: state.products.map((product) => product.id === id? {...product, quantity: product.quantity+1}:product)
            }

        ));
    },

   decrementProduct: async (id, quantity) => {
       let decrementProduct = await ProductsService.decrementProduct(id, quantity);
        set((state) => ({
                products: state.products.map((product) => product.id === id ? {...product, quantity: product.quantity-1} : product)
            }

        ));
    },
});

export default createProductsSlice;



