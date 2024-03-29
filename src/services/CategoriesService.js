
import { db} from "../firebase";
import {doc, updateDoc, getDocs, collection, addDoc, query, deleteDoc, where, getDoc} from "firebase/firestore";


/**
 * @typedef {Object} Category
 * @property {string} path
 * @property {string} title
 * @property {string} url
 * @property {string} user
 * @property {string} [id]
 * @property {string}[required]
 * */

const CategoriesService= {
    /**
     *
     * @return {Promise.<Category[]>}
     */
    getDefaultCategories: async ()=>{
        /** @type {Array} */
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
            console.log(error)
        }
    },
    /**
     * @param {string} userId
     * */
    addDefaultCategoriesToUser: async(userId)=>{
        let categories = await CategoriesService.getDefaultCategories();

        categories.forEach(async (category)=>{
            category.user = userId;
            await CategoriesService.addNewCategory(category)
        })
    },
    /**
     * @param {string} userId
     * @returns {Promise.<Category[]>}
     * */
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
            console.log(error)
        }
    },
    /** @param {Category} newCategory */
    addNewCategory: async (newCategory) => {

            let category = {
                url: (newCategory.url),
                path: (newCategory.path),
                title: (newCategory.title),
                user: (newCategory.user),
            }
            if (newCategory.hasOwnProperty("required")) {
                category.required = newCategory.required;
            }
            try {
                let result = await addDoc(collection(db, "users/" + newCategory.user + "/categories"), category);

                return {...category,id: result.id}
            } catch (error) {
                console.log(error)
            }
    },
    getCategoryByPath: async (path, userId) =>{

        let category ={};
        try {
            let q = await query(collection(db, "users/" + userId + "/categories"),where("path", "==", path));
            const querySnapshot = await getDoc(q);

            category = querySnapshot.data();
            category.id = querySnapshot.id
            return category
        } catch (error) {
            console.log(error)
            console.error(error)
        }
    },
    /**
     *
     * @param {string} userId
     * @param {string} path
     * @param {string} url
     * @param {string} title
     * @param {string} categoryId
     * @return {Promise<{user: string, url: string, path: string, title: string, id?: string}>}
     */
    updateCategory: async (userId, path, url, title,categoryId) => {
        /** @type {Category} */
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
            
        } catch (error) {
            console.log(error)
        }
        category.id = categoryId;
        return category;


    },
    /**
     * @param {string} userId
     * @param {string} categoryId
     * @return {Promise<void>}
     * */
    deleteCategory: async (userId, categoryId) => {


        try {
            const res = await deleteDoc(doc(db, "users/" + userId + "/categories", categoryId))
              return res
            } catch (error) {
            console.log(error);
        }

    },
    /**
     *
     * @return {Promise<[]>}
     */
     fetchImages: async ()=> {
        /** @type {Array} */
        let images = [];
        try{
            let q = await query(collection(db, "images"));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                
                images.push(doc.data());
                
            })
            return images
        }catch (error) {
            console.log(error);
        }
     }
}
export default CategoriesService;