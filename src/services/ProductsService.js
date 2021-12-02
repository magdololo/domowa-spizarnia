import axios from "axios";

const ProductsService = {
    getAllProducts: async () => {
        try {
            let allProducts = await axios.get('http://192.168.1.134:4000/products');
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
                    "unit": newProduct.unit !== productFromProducts.unit ? newProduct.unit : productFromProducts.unit
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
    updateProduct: async (id, name, capacity, unit, quantity, expireDate, categoryId, productId, userId) => {
        try {
            let updatedProduct = await axios.put('http://192.168.1.134:4000/storage/' + id, {
                id: id,
                name: name,
                capacity: parseInt(capacity),
                unit: unit,
                quantity: parseInt(quantity),
                expireDate: expireDate,
                categoryId: categoryId,
                productId: productId,
                userId: userId
            });
            return updatedProduct.data
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
