
import CategoriesService from "./CategoriesService";
import {auth, provider, db} from "../firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup} from "firebase/auth";
import {  doc, getDoc, setDoc} from "firebase/firestore";

const UserService = {

    createNewUser: async (email, password) => {
        let returnObject = {user: null, message: ''};

        try {
            console.log("createUser")
            let result = await createUserWithEmailAndPassword(auth, email,password);

            if (result.user) {
                console.log(result)
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
    logInUser: async (email, password) => {
        let returnObject = {user: null, message: ''};
        try {
            console.log("loggingUser")
            let userCredential = await signInWithEmailAndPassword(auth,email, password);
            console.log(userCredential);
            if (userCredential.user) {
                returnObject.user = userCredential.user;
                const docRef = doc(db, "users", userCredential.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                        console.log("user exists:");
                        await CategoriesService.getUserCategories();
                } else {
                    returnObject.message = "Nie masz jeszcze konta. Zarejestruj się";
                }
            }
        }catch (error) {
            console.log(error.code)
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
    signUpWithGoogle: async()=>{
        let returnObject = {user: null, message: ''};
        try {
            let result = await signInWithPopup(auth, provider);
            if (result.user) {
                returnObject.user = result.user;
                const docRef = doc(db, "users", result.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    console.log("user exists:");
                    await CategoriesService.getDefaultCategories();
                } else {
                    console.log(result.user.uid);
                    console.log(auth.currentUser);
                    await setDoc(doc(db, "users", auth.currentUser.uid), {
                        uid: auth.currentUser.uid,
                        email: auth.currentUser.email,
                        provider: auth.currentUser.providerId
                    });
                     //await CategoriesService.getDefaultCategories();
                    // defaultCategories.forEach(category=> {
                    //     category.id = null;
                    //     category.userId = auth.currentUser.uid;
                    //     CategoriesService.addNewCategory(category)
                    // })

                }
            }
        } catch (error) {
            returnObject.message = error;
        }
        return returnObject;
    },
    logWithGoogle: async () => {
        let returnObject = {user: null, message: ''};
        try {
            let result = await signInWithPopup(auth, provider);
            if (result.user) {
                const docRef = doc(db, "users", result.user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    returnObject.user = result.user;
                    console.log("user exists:");
                    await CategoriesService.getUserCategories();
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
    forgotPassword: async (email) =>{
        let returnObject = {user: null, message: ''};
        try {
            let result = await sendPasswordResetEmail(auth, email);
            if (result) {
                console.log(result)
                // const docRef = doc(db, "users", result.user.uid);
                // const docSnap = await getDoc(docRef);
                // if (docSnap.exists()) {
                //     returnObject.user = result.user;
                //     console.log("user exists:");
                } else {
                    console.log("zarejestruj sie")
                    returnObject.message = "Nie masz jeszcze konta. Zarejestruj się";

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