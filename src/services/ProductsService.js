import axios from "axios";
const ProductsService= {
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
            let userProducts = await axios.get('http://192.168.1.134:4000/storage?userId='+userId);
            return userProducts.data;
        } catch (error) {
            console.error(error)
        }
    },
    productToStorage:{},
    addProduct: async (newProduct, userId) => {//from AddProductModal
        try {
            let addedProductToProducts = await ProductsService.addProductToProducts(newProduct);
            console.log(addedProductToProducts)
            let productToStorage = addedProductToProducts
            console.log(productToStorage)
            let productId = productToStorage.id;
            productToStorage.id = null;
            productToStorage.productId = productId;
            productToStorage.userId = userId;//from AddProductModal
            //console.log(productToStorage)//id null
            let addedProductToStorage = await ProductsService.addProductToStorage(productToStorage)
            //console.log(addedProductToStorage) //id 5
            return addedProductToStorage;
        } catch (error) {
            console.error(error);
        }
    },
    addProductToProducts: async (newProduct) =>{
        try {
            let response = await axios.post('http://192.168.1.134:4000/products', newProduct);
            console.log(response)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    },
    addProductToStorage: async (productToStorage) => {
        console.log(productToStorage)
        try {
            let response = await axios.post('http://192.168.1.134:4000/storage', productToStorage);
            console.log(response)
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
}
export default ProductsService
