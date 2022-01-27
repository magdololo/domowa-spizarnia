
import {
    collection,
    getDocs,
    query,
    collectionGroup,
    doc,
    startAt,
    endAt,
    orderBy,
    documentId,
    addDoc,
    where,
    Timestamp, deleteDoc, updateDoc, getDoc, setDoc
} from "firebase/firestore";
import {db} from "../firebase";

/**
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} name
 * @property {number} capacity
 * @property {string} categoryId
 * @property {Date | null | string} [expireDate]
 * @property {string} productId
 * @property {string} unit
 * @property {string} userId
 * */

const ProductsService = {
    /**
     * @returns {Product[]} */
    getAllProducts: async () => {
        let allProducts=[];
        try {
            let q = await query(collection(db, "allProducts"));
            const querySnapshot = await getDocs(q);
            //defaultCategories.push(querySnapshot.docs);
            querySnapshot.forEach((doc) => {

                allProducts.push(doc.data());

            })
            return allProducts
        } catch (error) {
            console.log(error)
        }
    },

    addAllProductsToUser: async()=>{
        let dictionaryProducts = await ProductsService.getAllProducts();

        dictionaryProducts.forEach(async (product)=>{
            product.id = product.doc.id;
            await ProductsService.addProduct(product)
        })
    },
    /** @param {string} userId
     * @returns {Product[]} */
    getUserProducts: async (userId) => {
        let userProducts = [];
        try {
            const docRef = doc(db, "users", userId);
            let q = await query(collectionGroup(db, "products"), orderBy(documentId()) ,startAt(docRef.path), endAt(docRef.path + "\uf8ff"));//wszystkie produkty Usera
            //
            const querySnapshot = await getDocs(q);
            //
            querySnapshot.forEach((doc) => {

                let product = doc.data();
                product.id = doc.id;

                if(product.hasOwnProperty("expireDate") && product.expireDate !== null && product.expireDate !== "" && product.expireDate !== "object"){
                    let expireDate = Timestamp.fromMillis(product.expireDate.seconds*1000);
                   // console.log(expireDate)
                    product.expireDate = expireDate.toDate();
                }


                userProducts.push(product);

            })
            return userProducts
        }catch (error) {
            console.log(error)
        }
    },
    productToStorage: {},
    /**
     * @param {string} userId
     * @param {string} categoryId
     * @param {Object} productFromProducts
     * @param {Object} newProduct
     * @return {Product}
     * */
    addProduct: async (newProduct, userId, productFromProducts, categoryId) => {//from AddProductModal
        try {
            let product = {}
            if (productFromProducts && newProduct.capacity === productFromProducts.capacity && newProduct.unit === productFromProducts.unit) {
                product = {
                    "id": productFromProducts.id,
                    "name": productFromProducts.name,
                    "capacity": productFromProducts.capacity,
                    "unit": productFromProducts.unit,
                }
            } else {
                let productToBeAdded = {
                    "name": newProduct.name,
                    "capacity": newProduct.capacity !== productFromProducts.capacity ? newProduct.capacity : productFromProducts.capacity,
                    "unit": newProduct.unit !== productFromProducts.unit ? newProduct.unit : productFromProducts.unit,
                }
                let productExist = await ProductsService.getProduct(productToBeAdded.name, productToBeAdded.capacity, productToBeAdded.unit)
                if (productExist.length === 0) {
                    let resultRef = await addDoc(collection(db, "allProducts"),productToBeAdded);
                    product = {...productToBeAdded, id: resultRef.id}
                } else {
                    product = productExist[0];

                }
            }

            let newStorageItem = {
                "userId": userId,
                "productId": product.id,
                "name": product.name,
                "capacity": product.capacity,
                "unit": product.unit,
                "quantity": newProduct.quantity,
                "expireDate": newProduct.expireDate,
                "categoryId": newProduct.categoryId
            }
            console.log(newStorageItem.expireDate)
            let result = await addDoc(collection(db, "users/" + userId + "/categories/" + categoryId +"/products" ), newStorageItem);
            return {...newStorageItem,id: result.id}
        } catch (error) {
            console.log(error);
        }
    },
    /**
     *
     * @param {Object} newProduct
     * @return {Promise.<Product>}
     */
    addProductToProducts: async (newProduct) => {
        try {
            let response = await addDoc(collection(db, "allProducts" ), newProduct);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    /**
     *
     * @param {Product} updatesValues
     * @param {string} userId
     * @param {Object} productFromProducts
     * @param {string} categoryId
     * @return {Promise<Product>}
     */
    updateProduct: async (updatesValues, userId, productFromProducts, categoryId) => {//updatesValues - product after update
        try {
            let product = {}
            if (productFromProducts && updatesValues.capacity === productFromProducts.capacity && updatesValues.unit === productFromProducts.unit && updatesValues.name === productFromProducts.name) {
                product = {
                    "id": productFromProducts.productId,
                    "name": productFromProducts.name,
                    "capacity": productFromProducts.capacity,
                    "unit": productFromProducts.unit,
                }
            }   else {
                    let productToBeAdded = {
                    "name": updatesValues.name !== productFromProducts.name ? updatesValues.name : productFromProducts.name,
                    "capacity": updatesValues.capacity !== productFromProducts.capacity ? updatesValues.capacity : productFromProducts.capacity,
                    "unit": updatesValues.unit !== productFromProducts.unit ? updatesValues.unit : productFromProducts.unit,
                    "userId": userId
                    }
                    let productExist = await ProductsService.getProduct(productToBeAdded.name, productToBeAdded.capacity, productToBeAdded.unit)
                    if (productExist.length === 0) {
                        product = await ProductsService.addProductToProducts(productToBeAdded);

                    } else {
                    product = productExist[0];

                    }
            }

            let updatedProduct = {
                "id": updatesValues.id,
                "userId": userId,
                "productId": product.id,
                "name": updatesValues.name,
                "capacity": updatesValues.capacity,
                "unit": updatesValues.unit,
                "quantity": updatesValues.quantity,
                "expireDate": updatesValues.expireDate,
                "categoryId": updatesValues.categoryId
            }

            if (categoryId !== updatedProduct.categoryId){

                await deleteDoc(doc(db, "users/" + userId + "/categories/" + categoryId  + "/products", updatedProduct.id))
                await setDoc(doc(db, "users/" + userId + "/categories/" + updatedProduct.categoryId +"/products",updatedProduct.id ), updatedProduct);
            }else{
                const productRef = doc(db, "users/" + userId + "/categories/" + categoryId + "/products/", updatedProduct.id);
                await updateDoc(productRef, updatedProduct);
            }
            console.log(updatedProduct)
            return  updatedProduct
        } catch (error) {
            console.log(error);
        }
    },
    /**
     *
     * @param {string} userId
     * @param {string} categoryId
     * @param {string} productId
     * @return {Promise<void>}
     */
    deleteProduct: async (userId, categoryId, productId) => {
        try {
            const res = await deleteDoc(doc(db, "users/" + userId + "/categories/" + categoryId  + "/products", productId))
            console.log(res)
            return res
        } catch (error) {
            console.log(error);
        }

    },
    /**
     *
     * @param {string} name
     * @param {number} capacity
     * @param {string} unit
     * @return {Promise}
     */
    getProduct: async (name, capacity, unit) => {
        let productFromAllProducts = [];
        try{
            let q = await query(collection(db, "allProducts"),  where("name", "==", name), where("capacity", "==", capacity), where("unit", "==", unit));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let product = doc.data()
                product.id = doc.id;
                productFromAllProducts.push(product);

            })
            console.log(productFromAllProducts)
            return productFromAllProducts
        }catch (error) {
            console.log(error);
        }
    },
    /**
     *
     * @param {string} productId
     * @param {number} quantity
     * @param {string} userId
     * @param {string} categoryId
     * @return {Promise<void>}
     */
    changeProductQuantity: async (productId, quantity, userId, categoryId)=> {
        try {
            const productRef = doc(db, "users/" + userId + "/categories/" + categoryId + "/products/", productId);
            const productDoc = await getDoc(productRef);
            const product = productDoc.data();
            product.quantity = quantity;
            await setDoc(productRef, product);

        } catch (error) {
            console.log(error);
        }
    }
}
export default ProductsService
