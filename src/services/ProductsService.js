import axios from "axios";

const ProductsService = {
    getAllProducts: async (userId) => {
        try {
            let allProducts = await axios.get(`http://192.168.1.134:4000/products?userId=${userId}&userId=0`);
            return allProducts.data;
        } catch (error) {
            console.error(error)
        }
    },
    getUserProducts: async (userId) => {
        try {
            let userProducts = await axios.get('http://192.168.1.134:4000/storage?userId=' + userId);
            return userProducts.data;
        } catch (error) {
            console.error(error)
        }
    },
    productToStorage: {},
    addProduct: async (newProduct, userId, productFromProducts) => {//from AddProductModal
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
                    product = await ProductsService.addProductToProducts(productToBeAdded);

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
            return await ProductsService.addProductToStorage(newStorageItem);
        } catch (error) {
            console.error(error);
        }
    },
    addProductToProducts: async (newProduct) => {
        try {
            let response = await axios.post('http://192.168.1.134:4000/products', newProduct);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    addProductToStorage: async (productToStorageFromProducts) => {
        try {
            let response = await axios.post('http://192.168.1.134:4000/storage', productToStorageFromProducts);
            return response.data;
        } catch (error) {
            console.error(error);
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
             await axios.put('http://192.168.1.134:4000/storage/' + updatedProduct.id, updatedProduct)
             return  updatedProduct
        } catch (error) {
            console.error(error);
        }
    },

    deleteProduct: async (id) => {
        try {
            let deletedProduct = await axios.delete('http://192.168.1.134:4000/storage/' + id);
            return deletedProduct.data
        } catch (error) {
            console.error(error);
        }
    },
    incrementProduct: async (id, quantity) => {
        try {
            let response = await axios.patch('http://192.168.1.134:4000/storage/' + id, {
                quantity: quantity + 1
            });
            return response.data
        } catch (error) {
            console.error(error);
        }
    },
    decrementProduct: async (id, quantity) => {
        try {
            let response = await axios.patch('http://192.168.1.134:4000/storage/' + id, {
                quantity: quantity - 1
            });
            return response.data
        } catch (error) {
            console.error(error);
        }
    },
    getProduct: async (name, capacity, unit) => {
        try {
            let existProduct = await axios.get(`http://192.168.1.134:4000/products?name=${name}&capacity=${capacity}&unit=${unit}`);
            return existProduct.data;
        } catch (error) {
            console.error(error)
        }
    }
}
export default ProductsService
