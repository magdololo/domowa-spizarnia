import axios from "axios";
import {auth, provider, db} from "../firebase";
import {  doc, getDocs, setDoc, collection, addDoc, where, query } from "firebase/firestore";
const CategoriesService= {
    getDefaultCategories: async ()=>{
        try {
            let q = await query(collection(db, "categories" ), where("user" , "==", ""));
            const querySnapshot = await getDocs(q);
           console.log("default categories", querySnapshot);
        } catch (error) {
            console.error(error)
        }
    },
    getUserCategories: async (userId)=>{
        try {
            let response = await axios.get(`http://192.168.1.28:4000/categories-user?userId=${userId}`);
            return response.data;

        }
        catch (error) {
            console.error(error)
        }
    },
    addNewCategory: async (newCategory) => {
        try {
            const docRef= await addDoc(collection(db, "categories"), {
                url: (newCategory.url),
                path: (newCategory.path),
                title: (newCategory.title)
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    },
    updateCategory: async (id, path, url, title) => {
        try {
             await db.collection("categories").doc(doc.id).update({
                url: (url),
                path: (path),
                title: (title)
            });
        } catch (error) {
            console.error(error)
        }
    },
    deleteCategory: async (id) => {
         try {
             let deletedCategory = await axios.delete('http://192.168.1.28:4000/categories-user/' + id);
             return deletedCategory.data
            } catch (error) {
            console.error(error);
        }
    },
     fetchImages: async ()=> {
        try{
            let response = await axios.get('http://192.168.1.28:4000/images');
            return response.data
        }catch (error) {
            console.error(error);
        }
     }
}
export default CategoriesService;