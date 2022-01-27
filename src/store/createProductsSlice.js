
import ProductsService from "../services/ProductsService";
/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} capacity
 * @property {string} unit
 * @property {number} quantity
 * @property {Date | null | string} [expireDate]
 * @property {string} productId
 * @property {string} userId
 * */

const createProductsSlice = (set, get) => ({
    products: [],
    /**
     *
     * @param {string} userId
     * @return {Promise<void>}
     */
    fetchProducts: async (userId) => {
        console.log(userId)
        /** @type {Array} */
        let allProducts=[];

        if(userId){
            allProducts= await ProductsService.getAllProducts()
        }

        set((state) => ({
            products: allProducts,
        }));
    },
    storage: [],
    /**
     *
     * @param {string} user
     * @return {Promise<void>}
     */
    addAllProductsToUserToUser: async (user)=>{
        let defaultProducts = await ProductsService.addAllProductsToUser(user.uid);
        set((state) => ({
            categories: defaultProducts
        }));
    },
    getProductsOfUser: async (userId) => {

        const response = await ProductsService.getUserProducts(userId);

        set((state) => ({
            storage: response,
        }));
    },
    addProduct: async (newProduct, userId, productFromProducts, categoryId) => {
        // 
        console.log(newProduct)
        let addedProduct = await ProductsService.addProduct(newProduct, userId, productFromProducts, categoryId);

        //
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
    searchedProduct : [],
    setSearchedProduct : (id) =>{
        set((state)=> {
               let sp = [];
               sp.push(id);
                return {
                    searchedProduct: sp
                }
            }
        )
    },
    searchedProducts : [],
    setSearchedProducts : (searchedName)=>{
        const productsFromStorageList = get().storage;

        let productsWithName = productsFromStorageList.filter(product=> product.name.indexOf(searchedName) >= 0);
        
        set({searchedProducts: productsWithName});

    },
    editModalOpen: false,
    setEditProductModalOpen: (open) => {
        set({editModalOpen: open})
    },
    editProduct: {},
    setEditProduct: (id, name, capacity, unit,quantity, expireDate, categoryId, productId, userId) => {
        set({editProduct: {id, name, capacity, unit, quantity, expireDate, categoryId, productId, userId}});

    },
    updateProduct: async (updatedProduct, userId, productFromProducts, categoryId)=>{
            userId = get().loggedInUser.uid;
            await ProductsService.updateProduct(updatedProduct, userId, productFromProducts, categoryId);
            //product after update
            set((state)=> {
                    let products = state.storage.filter(productAfterUpdate => productAfterUpdate.id !== updatedProduct.id);
                    products.push(updatedProduct)
                    return {
                        storage: products
                    }
                }
            )


    },
    deleteProduct: async (userId, categoryId, productId) => {
        await ProductsService.deleteProduct(userId, categoryId, productId);
        set((state) => ({
            storage: state.storage.filter((product) => product.id !== productId),
        }))
    },

    incrementProduct: async (id, quantity, userId, categoryId) => {
        await ProductsService.changeProductQuantity(id, quantity+1, userId, categoryId);
        set((state) => ({
            storage: state.storage.map((product) => product.id === id? {...product, quantity: product.quantity+1}:product)
            }

        ));
    },

   decrementProduct: async (id, quantity, userId, categoryId) => {
       await ProductsService.changeProductQuantity(id, quantity-1, userId, categoryId);
        set((state) => ({
                storage: state.storage.map((product) => product.id === id ? {...product, quantity: product.quantity-1} : product)
            }

        ));
    },
});

export default createProductsSlice;



