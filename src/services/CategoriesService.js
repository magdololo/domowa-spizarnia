import axios from "axios";
import {auth, provider, db} from "../firebase";
import {  doc, updateDoc, getDocs, collection, addDoc, where, query } from "firebase/firestore";
const user = auth.currentUser;
const CategoriesService= {
    getDefaultCategories: async ()=>{
             let defaultCategories=[];
        try {
            let q = await query(collection(db, "categories"));
            const querySnapshot = await getDocs(q);
            //defaultCategories.push(querySnapshot.docs);
            querySnapshot.forEach((doc) => {
                
                defaultCategories.push(doc.data());
                
            })
            return defaultCategories
        } catch (error) {
            console.error(error)
        }
    },
    addDefaultCategoriesToUser: async(userId)=>{
        let categories = await CategoriesService.getDefaultCategories();
        categories.forEach(async (category)=>{
            category.user = userId;
            await CategoriesService.addNewCategory(category)
        })
    },
    getUserCategories: async (userId)=>{
        let categories = [];
        
        try {
            let q = await query(collection(db, "users/" + userId + "/categories"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                
                let category = doc.data();
                category.id = doc.id;
                categories.push(category);
                
            })
            return categories
        }catch (error) {
            console.error(error)
        }
    },
    addNewCategory: async (newCategory) => {
        try {
            const docRef= await addDoc(collection(db, "users/"+ newCategory.user +"/categories"), {
                url: (newCategory.url),
                path: (newCategory.path),
                title: (newCategory.title),
                user: (newCategory.user),

            });
            
        } catch (e) {
            
        }
    },
    updateCategory: async (userId, path, url, title,categoryId) => {
        let category = {
            url: (url),
            path: (path),
            title: (title),
            user: (userId)
        }
        try {

            const categoryRef = doc(db, "users/" + userId + "/categories", categoryId);

            // Set the "capital" field of the city 'DC'
            await updateDoc(categoryRef, {
                url: (url),
                path: (path),
                title: (title)
            });
            //  const docRef = await db.collection("users/" + userId + "/categories" + categoryId).where( {
            //     url: (url),
            //     path: (path),
            //     title: (title)
            // });
            
        } catch (error) {
            console.error(error)
        }
        category.id = categoryId;
        return category;


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
        let images = [];
        try{
            let q = await query(collection(db, "images"));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                
                images.push(doc.data());
                
            })
            return images
        }catch (error) {
            console.error(error);
        }
     }
}
export default CategoriesService;