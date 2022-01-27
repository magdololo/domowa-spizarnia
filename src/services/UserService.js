
import CategoriesService from "./CategoriesService";
import {auth, provider, db} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup} from "firebase/auth";
import {  doc, getDoc, setDoc} from "firebase/firestore";

/**
 * @typedef {Object} User
 * @property {string} userId
 * @property {string} email
 * @property {string} password
 * */
const UserService = {
    /**
     * creates new user and adds default categories to it
     * @param {string} email
     * @param {string} password
     * @returns {returnObject} */
    createNewUser: async (email, password) => {
        let returnObject = {user: null, message: ''};

        try {
            
            let result = await createUserWithEmailAndPassword(auth, email,password);

            if (result.user) {
                
                returnObject.user = result.user;
                setDoc(doc(db, "users", result.user.uid), {
                    uid: result.user.uid,
                    email: result.user.email,
                    provider: result.user.providerId
                });
                await CategoriesService.addDefaultCategoriesToUser(result.user.uid);
            }

        } catch (error) {
            returnObject.message = error.message;
        }
        return returnObject


    },
    /**
     * @param {string} email
     * @param {string} password
     * @returns {returnObject} */
    logInUser: async (email, password) => {
        let returnObject = {user: null, message: ''};
        try {
            
            let userCredential = await signInWithEmailAndPassword(auth, email, password);
            if (userCredential.user) {
                returnObject.user = userCredential.user;
                const docRef = doc(db, "users", userCredential.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                        await CategoriesService.getUserCategories(returnObject.user.uid);
                } else {
                    returnObject.message = "Nie masz jeszcze konta. Zarejestruj się";
                }
            }
        }catch (error) {
            
            switch (error.code){
                case "auth/wrong-password":
                    returnObject.message = "Błedne hasło. Przypomnij hasło."
                    break;
                case "auth/user-not-found":
                    returnObject.message = "Nie masz jeszcze konta. Zarejestruj się";
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
    /**
     * @returns {returnObject} */
    signUpWithGoogle: async()=>{
        console.log("signup with google")
        let returnObject = {user: null, message: ''};
        try {
            let result = await signInWithPopup(auth, provider);
            if (result.user) {
                returnObject.user = result.user;
                const docRef = doc(db, "users", result.user.uid);
                const docSnap = await getDoc(docRef);
                console.log(docSnap)
                if (docSnap.exists()) {
                    returnObject.message = "User already exist"
                } else {
                    await setDoc(doc(db, "users", auth.currentUser.uid), {
                        uid: auth.currentUser.uid,
                        email: auth.currentUser.email,
                        provider: auth.currentUser.providerId
                    });
                    await CategoriesService.addDefaultCategoriesToUser(auth.currentUser.uid);

                }
            }
        } catch (error) {
            returnObject.message = error;
        }
        return returnObject;
    },
    /**
     * @returns {returnObject} */
    logWithGoogle: async () => {
        let returnObject = {user: null, message: ''};
        try {
            let result = await signInWithPopup(auth, provider);
            if (result.user) {
                const docRef = doc(db, "users", result.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    returnObject.user = result.user;
                    
                    await CategoriesService.getUserCategories(result.user.uid);
                } else {
                    returnObject.message = "Nie masz jeszcze konta. Zarejestruj się";
                }
            }
        } catch (error) {
            returnObject.message = error;
        }
        return returnObject;
    },
    /**
     * send email to reset password to user which email exist
     * @param {string} email
     * @return {Promise<void>} */
    forgotPassword: async (email) =>{
        let returnObject = {user: null, message: ''};
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            returnObject.message = error;
        }
        return returnObject;
    },
    /**
     * LogOut current user
     * @return {Promise<void>}
     */
    logOut: async ()=>{
        await signOut(auth);
    }
}


export default UserService;