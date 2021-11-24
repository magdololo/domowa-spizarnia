import axios from "axios";

const CategoriesService= {
    fetch: async ()=>{
        try {
            let response = await axios.get('http://192.168.1.134:4000/categories');
            console.log(response.data)
            return response.data;

        }
        catch (error) {
            console.error(error)
        }
    },
    addNewCategory: async (newCategory) => {

        try {
            let response = await axios.post('http://192.168.1.134:4000/categories', newCategory);
            return response.data

        } catch (error) {
            console.error(error)
        }
    },
    updateCategory: async (id, path, url, title) => {

        try {
            let editCategory = await axios.put('http://192.168.1.134:4000/categories/' + id, {
                url: url,
                path: path,
                title: title
            });
            console.log(editCategory.data);
            return editCategory.data
        } catch (error) {
            console.error(error)
        }
    },
    deleteCategory: async (id) => {
         try {
             let deletedCategory = await axios.delete('http://192.168.1.134:4000/categories/' + id);
             console.log(deletedCategory);
             return deletedCategory.data
            } catch (error) {
            console.error(error);
        }
    },
     fetchImages: async ()=> {
        try{
            let response = await axios.get('http://192.168.1.134:4000/images');
            return response.data
        }catch (error) {
            console.error(error);
        }
     }
}
export default CategoriesService;