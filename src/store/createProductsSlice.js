
import ProductsService from "../services/ProductsService";
import CategoriesService from "../services/CategoriesService";


const createProductsSlice = (set, get) => ({
    products: [],
    fetchProducts: async (user) => {
        /** @type {Array} */
        let allProducts=[];

        if(user){
            allProducts= await ProductsService.getAllProducts()
        }

        set((state) => ({
            products: allProducts,
        }));
    },
    storage: [],
    addAllProductsToUserToUser: async (user)=>{
        let defaultProducts = await ProductsService.addAllProductsToUser(user.uid);
        set((state) => ({
            categories: defaultProducts
        }));
    },
    getProductsOfUser: async (userId) => {

        const response = await ProductsService.getUserProducts(userId);
        console.log(response);
        set((state) => ({
            storage: response,
        }));
    },
    addProduct: async (newProduct, userId, productFromProducts, categoryId) => {
        // 
        
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
    updateProduct: async (updatedProduct, userId, productFromProducts)=>{

            await ProductsService.updateProduct(updatedProduct, userId, productFromProducts);
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



