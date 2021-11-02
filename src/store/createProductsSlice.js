import axios from "axios";

const createProductsSlice = (set, get) => ({
    products: [],
    fetchProducts: async productsFetch => {
        const response = await fetch('http://192.168.1.134:4000/products');
        set({products: await response.json()})
    },
    addProduct: (newProduct) => {
        console.log("new product")
        console.log(newProduct)
        axios.post('http://192.168.1.134:4000/products', newProduct).then(resp => {
            console.log(resp.data);//zwraca obiekt newProduct
            let id = resp.data.id;
            newProduct.id = id;
            newProduct.expireDate = resp.data.expireDate; //ustawiamy expireDate na expireDate z json server bo on zapisuje inny format daty
            set((state) => ({
                products: [
                    newProduct,
                    ...state.products,
                ]
            }))//dodajemy tu do stanu zeby date waznosci dodal w tym samym formacie co w json server
        }).catch(error => {
            console.log(error);
        });

    },
    editModalOpen: false,
    setEditProductModalOpen: (open) => {
        set({editModalOpen: open})
    },
    editProduct: {},
    setEditProduct: (id, name, categoryPath, capacity, unit,quantity, expireDate) => {
        set({editProduct: {id, name, categoryPath, capacity, unit, quantity, expireDate}});
        console.log("editProduct")

    },
    updateProduct: async (id, name, path, categoryPath, capacity, unit, quantity, expireDate, selectedNewCategory)=>{
        axios.put('http://192.168.1.134:4000/products/'+id,
            {
                name: name,
                path: path,
                categoryPath: categoryPath,
                capacity: parseInt(capacity),
                unit: unit,
                quantity: parseInt(quantity),
                expireDate: expireDate,
                selectedNewCategory: selectedNewCategory
            }).then(resp => {

            let editProduct = resp.data;
            console.log(editProduct);
            set((state)=> {
                    let products = state.products.filter(editProduct => editProduct.id !== id);
                    products.push(editProduct)
                    return {
                        products: products
                    }
                }
            )
        }).catch(error => {
            console.log(error);
        });


    },
    deleteProduct: async (id) => {
        axios.delete('http://192.168.1.134:4000/products/' + id).then(resp => {
            console.log(resp.data);

        }).catch(error => {
            console.log(error);
        });
        set((state) => ({
            products: state.products.filter((product) => product.id !== id),
        }))
    },

    incrementProduct: async (id, quantity) => {
        axios.patch('http://192.168.1.134:4000/products/' + id,
            {
                quantity: quantity + 1
            }).then(resp => {

            console.log(resp.data);

        }).catch(error => {
            console.log(error);
        });
        set((state) => ({
            products: state.products.map((product) => product.id === id? {...product, quantity: product.quantity+1}:product)
            }

        ));
    },

   decrementProduct: async (id, quantity) => {
        axios.patch('http://192.168.1.134:4000/products/' + id,
            {
                quantity: quantity - 1
            }).then(resp => {

            console.log(resp.data);

        }).catch(error => {
            console.log(error);
        });
        set((state) => ({
                products: state.products.map((product) => product.id === id ? {...product, quantity: product.quantity-1} : product)
            }

        ));
    },
});

export default createProductsSlice;



