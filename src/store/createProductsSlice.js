
import ProductsService from "../services/ProductsService";

const createProductsSlice = (set, get) => ({
    products: [],
    fetchProducts: async () => {
        const response = await ProductsService.getAllProducts();
        set((state) => ({
            products: response,
        }));
    },
    storage: [],
    getProductsOfUser: async (userId) => {
        const response = await ProductsService.getUserProducts(userId);
        set((state) => ({
            storage: response,
        }));
    },
    addProduct: async (newProduct, userId) => {

        let addedProduct= await ProductsService.addProduct(newProduct, userId);
        console.log(addedProduct);
            set((state) => ({
                products: [
                    addedProduct,
                    ...state.products,
                ],
                storage: [
                    addedProduct,
                    ...state.storage,
                ]
            }))//dodajemy tu do stanu zeby date waznosci dodal w tym samym formacie co w json server


    },

    editModalOpen: false,
    setEditProductModalOpen: (open) => {
        set({editModalOpen: open})
    },
    editProduct: {},
    setEditProduct: (id, name, capacity, unit,quantity, expireDate, categoryId, productId, userId) => {
        set({editProduct: {id, name, capacity, unit, quantity, expireDate, categoryId, productId, userId}});

    },
    updateProduct: async (id, name, capacity, unit, quantity, expireDate, categoryId, productId, userId)=>{
            let editProduct = await ProductsService.updateProduct(id, name, capacity, unit, quantity, expireDate, categoryId, productId, userId);
            set((state)=> {
                    let products = state.storage.filter(editProduct => editProduct.id !== id);
                    products.push(editProduct)
                    return {
                        storage: products
                    }
                }
            )


    },
    deleteProduct: async (id) => {
        await ProductsService.deleteProduct(id);
        set((state) => ({
            storage: state.storage.filter((product) => product.id !== id),
        }))
    },

    incrementProduct: async (id, quantity) => {
        await ProductsService.incrementProduct(id, quantity);
        set((state) => ({
            storage: state.storage.map((product) => product.id === id? {...product, quantity: product.quantity+1}:product)
            }

        ));
    },

   decrementProduct: async (id, quantity) => {
        await ProductsService.decrementProduct(id, quantity);
        set((state) => ({
                storage: state.storage.map((product) => product.id === id ? {...product, quantity: product.quantity-1} : product)
            }

        ));
    },
});

export default createProductsSlice;



