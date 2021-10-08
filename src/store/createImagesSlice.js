const createImagesSlice = (set, get) => ({
    products: [],
    fetchImages: async imagesFetch => {
        const response = await fetch('http://localhost:4000/images');
        set({images: await response.json()})

    }
})

export default createImagesSlice;