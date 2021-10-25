const createImagesSlice = (set, get) => ({
    images: [],
    fetchImages: async imagesFetch => {
        const response = await fetch('http://192.168.1.134:4000/images');
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