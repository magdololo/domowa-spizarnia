import axios from "axios";

const CategoriesService= {
   addNewCategory:  async (newCategory) => {

       try {
          let response =  await axios.post('http://192.168.1.134:4000/categories', newCategory);
          return response.data

       }catch (error){
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
        }catch (error){
        console.error(error)
    }

   },


}
export default CategoriesService;