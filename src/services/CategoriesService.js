import axios from "axios";

const CategoriesService= {
    getDefaultCategories: async ()=>{
        try {
            let response = await axios.get(`http://192.168.1.134:4000/categories-default`);
            return response.data;

        }
        catch (error) {
            console.error(error)
        }
    },
    getUserCategories: async (userId)=>{
        try {
            let response = await axios.get(`http://192.168.1.134:4000/categories-user?userId=${userId}`);
            return response.data;

        }
        catch (error) {
            console.error(error)
        }
    },
    addNewCategory: async (newCategory) => {
        try {
            let response = await axios.post('http://192.168.1.134:4000/categories-user', newCategory);
            return response.data

        } catch (error) {
            console.error(error)
        }
    },
    updateCategory: async (id, path, url, title) => {
        try {
            let editCategory = await axios.put('http://192.168.1.134:4000/categories-user/' + id, {
                url: url,
                path: path,
                title: title
            });
            return editCategory.data
        } catch (error) {
            console.error(error)
        }
    },
    deleteCategory: async (id) => {
         try {
             let deletedCategory = await axios.delete('http://192.168.1.134:4000/categories-user/' + id);
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