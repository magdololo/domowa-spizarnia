const createImagesSlice = (set, get) => ({
    images: [],
    fetchImages: async imagesFetch => {
        const response = await fetch('http://localhost:4000/images');
        set({images: await response.json()})
    },
    pickedImage: '',
    setPickedImage: (url)=> {
        console.log("pickedImage")
        console.log(url)
        set({pickedImage: url})
    },
})

export default createImagesSlice;