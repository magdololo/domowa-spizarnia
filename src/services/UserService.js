import axios from "axios";
import CategoriesService from "./CategoriesService";
import {auth, provider, db} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { signInWithPopup} from "firebase/auth";
import {  doc, getDoc, setDoc } from "firebase/firestore";

const UserService = {

    createNewUser: async (email, password) => {
        let returnObject = {user: null, message: ''};
        try {
            console.log("createUser")
            let result = await createUserWithEmailAndPassword(auth, email,password);
            if (result.user) {
                console.log(result)
                returnObject.user = result.user;
                await setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    email: result.user.email,
                    provider: result.user.providerId
                });
                let defaultCategories =  await CategoriesService.getDefaultCategories();
                defaultCategories.forEach(category=> {
                    category.id = null;
                    category.userId = result.user.uid;
                    CategoriesService.addNewCategory(category)
                })
            }
        } catch (error) {
            returnObject.message = error.message;
        }
        return returnObject;
    },
    logInUser: async (auth, email, password) => {
        let returnObject = {user: null, message: ''};
        try {
            console.log("loggingUser")
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
            console.log(error.code)
            switch (error.code){
                case "auth/user-not-found":
                    returnObject.message = "Nie masz jeszcze konta. Zarejestuj się";
                    break;
                case "auth/user-disabled":
                    returnObject.message = "Użytkownik zablokowany.";
                    break;
                case "auth/weak-password":
                    returnObject.message = "Hasło nie spełnia reguł bezpieczeństwa.";
                    break;
                default:
                    returnObject.message = "Nieznany błąd. Zgłoś się do administaratora.";
            }
        }
        return returnObject;
        // (zwraca obiekt który ma user i message które potem potrzebujemy w createUserSlice w funkcji logIn)
    },
    logWithGoogle: async () => {
        let returnObject = {user: null, message: ''};
        try {
            let result = await signInWithPopup(auth, provider);
            if (result.user) {
                const docRef = doc(db, "users", result.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("user exists:");
                } else {
                    console.log("zarejestruj sie")
                    returnObject.message = "Nie masz jeszcze konta. Zarejestruj się";
                }
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