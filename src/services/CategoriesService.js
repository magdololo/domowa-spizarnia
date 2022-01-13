import axios from "axios";
import {auth, provider, db} from "../firebase";
import {  doc, getDocs, setDoc, collection, addDoc, where, query } from "firebase/firestore";
const user = auth.currentUser;
const CategoriesService= {
    getDefaultCategories: async ()=>{
             let defaultCategories=[];
        try {
            let q = await query(collection(db, "categories" ), where("user" , "==", ""));
            const querySnapshot = await getDocs(q);
            //defaultCategories.push(querySnapshot.docs);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                defaultCategories.push(doc.data());
                console.log(defaultCategories);
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
        console.log(userId)
        try {
            let q = await query(collection(db, "categories"), where("user", "==", userId));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                categories.push(doc.data());
                console.log(categories)
            })
            return categories
        }catch (error) {
            console.error(error)
        }
    },
    addNewCategory: async (newCategory) => {
        try {
            const docRef= await addDoc(collection(db, "categories"), {
                url: (newCategory.url),
                path: (newCategory.path),
                title: (newCategory.title),
                user: (newCategory.user)
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