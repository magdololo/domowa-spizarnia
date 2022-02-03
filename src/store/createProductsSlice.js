
import ProductsService from "../services/ProductsService";
import ProductsList from "../pages/ProductsList";
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
    productDictionary: [],
    getProductDictionary: async (userId)=>{
        let allProducts = await ProductsService.getAllProducts();
        let userProducts = await ProductsService.getUserProducts(userId);
        set((state) => ({
            productDictionary: allProducts, userProducts
        }));
    },
    products: [],
    /**
     *
     * @param {string} userId
     * @return {Promise<void>}
     */
    fetchProducts: async (userId) => {
        /** @type {Array} */
        let allProducts=[];
        if(userId){
            allProducts= await ProductsService.getAllProducts();
        }
        set((state) => ({
            products: allProducts,
        }));
    },
    storage: [],
    /**
     *
     * @param {string} userId
     * @return {Promise<void>}
     */
    addAllProductsToUserToUser: async (userId)=>{
        let defaultProducts = await ProductsService.addAllProductsToUser(userId);
        set((state) => ({
            categories: defaultProducts
        }));
    },
    /**
     *
     * @param {string} userId
     * @returns {Promise<void>}
     */
    getProductsOfUser: async (userId) => {
        const response = await ProductsService.getUserProducts(userId);
        set((state) => ({
            storage: response,
        }));
    },
    /**
     *
     * @param {object} newProduct
     * @param {string} userId
     * @param {object} productFromProducts
     * @param {string} categoryId
     * @returns {Promise<Product>}
     */
    addProduct: async (newProduct, userId, productFromProducts, categoryId) => {

        let addedProduct = await ProductsService.addProduct(newProduct, userId, productFromProducts, categoryId);

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
    /**
     * @param {string} id
     * @return { {searchedProduct: String[]} }
     */
    setSearchedProduct : (id) =>{
        set((state)=> {
            /** @type {Array} */
               let sp = [];
               sp.push(id);
                return {
                    searchedProduct: sp,
                    searchedProducts: []
                }
            }
        )
    },
    searchedProducts : [],
    /**
     * @param {string} searchedName
     */
    setSearchedProducts : (searchedName)=>{
        const productsFromStorageList = get().storage;

        let productsWithName = productsFromStorageList.filter(product=> product.name.indexOf(searchedName) >= 0);
        
        set({searchedProducts: productsWithName, searchedProduct: []});

    },
    editModalOpen: false,
    /**
     * @param {boolean} open
     */
    setEditProductModalOpen: (open) => {
        set({editModalOpen: open})
    },
    editProduct: {},
    /**
     * @param {string} id
     * @param {string} name
     * @param {number} capacity
     * @param {string} unit
     * @param {number} quantity
     * @param {Date | null | string} [expireDate]
     * @param {string} categoryId
     * @param {string} productId
     * @param {string} userId
     */
    setEditProduct: (id, name, capacity, unit,quantity, expireDate, categoryId, productId, userId) => {
        set({editProduct: {id, name, capacity, unit, quantity, expireDate, categoryId, productId, userId}});

    },
    /**
     * @param {object}  updatedProduct
     * @param {string}  userId
     * @param {object} productFromProducts
     * @param {string}  categoryId
     * @returns {Promise<void>}
     */
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
    /**
     * @param {string} userId
     * @param {string} categoryId
     * @param {string} productId
     * @returns {Promise<void>}
     */
    deleteProduct: async (userId, categoryId, productId) => {
        await ProductsService.deleteProduct(userId, categoryId, productId);
        set((state) => ({
            storage: state.storage.filter((product) => product.id !== productId),
        }))
    },
    /**
     * @param {string} id
     * @param {number} quantity
     * @param {string} userId
     * @param {string} categoryId
     * @returns {Promise<void>}
     */
    incrementProduct: async (id, quantity, userId, categoryId) => {
        await ProductsService.changeProductQuantity(id, quantity+1, userId, categoryId);
        set((state) => ({
            storage: state.storage.map((product) => product.id === id? {...product, quantity: product.quantity+1}:product)
            }

        ));
    },
    /**
     *
     * @param {string} id
     * @param {number} quantity
     * @param {string} userId
     * @param {string} categoryId
     * @returns {Promise<void>}
     */
   decrementProduct: async (id, quantity, userId, categoryId) => {
       await ProductsService.changeProductQuantity(id, quantity-1, userId, categoryId);
        set((state) => ({
                storage: state.storage.map((product) => product.id === id ? {...product, quantity: product.quantity-1} : product)
            }
        ));
    },
});

export default createProductsSlice;



