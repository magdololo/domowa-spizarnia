import axios from "axios";
import CategoriesService from "./CategoriesService";
import {auth, provider} from "../firebase";
import {signInWithEmailAndPassword, signOut} from "firebase/auth";
import { signInWithPopup} from "firebase/auth";

const UserService = {
    createNewUser: async (email, password) => {
        try {
            let response = await axios.get(`http://192.168.1.28:4000/users?email=${email}`);
            if (response.data.length === 0) {
                let responsePost = await axios.post('http://192.168.1.28:4000/users', {
                    email: email,
                    password: password
                });
                console.log(responsePost)//object with data: email, password, id
                let defaultCategories = await CategoriesService.getDefaultCategories();
                defaultCategories.forEach(category => {
                        category.id = null;
                        category.userId = responsePost.data.id;
                        CategoriesService.addNewCategory(category)
                    }
                )
                return responsePost.data;
            }
        } catch (error) {
            console.error(error)
        }
        throw new Error('User with given email already exists');
    },
    logInUser: async (auth, email, password) => {
        let returnObject = {user: null, message: ''};
        try {
            let userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(userCredential);
            if (userCredential.user) {
                let user = {};
                user.id = userCredential.user.uid
                returnObject.user = user;

            } else {
                returnObject.message = 'User or password incorrect';
            }
        } catch (error) {
            console.error(error)
            returnObject.message = error;
        }
        return returnObject;
        // (zwraca obiekt który ma user i message które potem potrzebujemy w createUserSlice w funkcji logIn)
    },
    logWithGoogle: async () => {
        let returnObject = {user: null, message: ''};
        try {
            let result = await signInWithPopup(auth, provider);
            if (result.user) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                let user = {};
                user.id = result.user.uid
                returnObject.user = result.user;
                // ...
            } else {
                returnObject.message = 'User or password incorrect';
            }
        } catch (error) {
            returnObject.message = error;
        }
        return returnObject;
    },
    logOut: async ()=>{
        await signOut(auth);
    }
}


export default UserService;