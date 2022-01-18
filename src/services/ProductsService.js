import axios from "axios";
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
    Timestamp
} from "firebase/firestore";
import {db} from "../firebase";

const ProductsService = {
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
    /** @param {string} userId  */
    addAllProductsToUser: async(userId)=>{
        let dictionaryProducts = await ProductsService.getAllProducts();

        dictionaryProducts.forEach(async (product)=>{
            product.id = product.doc.id;
            await ProductsService.addProduct(product)
        })
    },
    getUserProducts: async (userId) => {
        let userProducts = [];
        try {
            const docRef = doc(db, "users", userId);
            let q = await query(collectionGroup(db, "products"), orderBy(documentId()) ,startAt(docRef.path), endAt(docRef.path + "\uf8ff"));
            //
            const querySnapshot = await getDocs(q);
            //
            querySnapshot.forEach((doc) => {

                let product = doc.data();
                product.id = doc.id;


                if(product.hasOwnProperty("expireDate") && product.expireDate != null){

                    let expireDate = Timestamp.fromMillis(product.expireDate.seconds);
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
                    "userId": userId
                }
                let productExist = await ProductsService.getProduct(productToBeAdded.name, productToBeAdded.capacity, productToBeAdded.unit)
                if (productExist.length === 0) {
                    product = await addDoc(collection(db, "allProducts"),productToBeAdded);

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


            let result = await addDoc(collection(db, "users/" + userId + "/categories/" + categoryId +"/products" ), newStorageItem);
            return {...newStorageItem,id: result.id}
        } catch (error) {
            console.log(error);
        }
    },
    addProductToProducts: async (newProduct) => {
        try {
            let response = await axios.post('http://192.168.1.28:4000/products', newProduct);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    addProductToStorage: async (productToStorageFromProducts) => {
        try {
            let response = await axios.post('http://192.168.1.28:4000/storage', productToStorageFromProducts);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
    updateProduct: async (updatesValues, userId, productFromProducts) => {//updatesValues - product after update
        try {
            let product = {}
            if (productFromProducts && updatesValues.capacity === productFromProducts.capacity && updatesValues.unit === productFromProducts.unit && updatesValues.name === productFromProducts.name) {
                product = {
                    "id": productFromProducts.id,
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
                "capacity": product.capacity,
                "unit": product.unit,
                "quantity":updatesValues.quantity,
                "expireDate": updatesValues.expireDate,
                "categoryId": updatesValues.categoryId
            }
             await axios.put('http://192.168.1.28:4000/storage/' + updatedProduct.id, updatedProduct)
             return  updatedProduct
        } catch (error) {
            console.log(error);
        }
    },

    deleteProduct: async (id) => {
        try {
            let deletedProduct = await axios.delete('http://192.168.1.28:4000/storage/' + id);
            return deletedProduct.data
        } catch (error) {
            console.log(error);
        }
    },
    incrementProduct: async (id, quantity) => {
        try {
            let response = await axios.patch('http://192.168.1.28:4000/storage/' + id, {
                quantity: quantity + 1
            });
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
    decrementProduct: async (id, quantity) => {
        try {
            let response = await axios.patch('http://192.168.1.28:4000/storage/' + id, {
                quantity: quantity - 1
            });
            return response.data
        } catch (error) {
            console.log(error);
        }
    },
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

            return productFromAllProducts
        }catch (error) {
            console.log(error);
        }
    }
}
export default ProductsService
