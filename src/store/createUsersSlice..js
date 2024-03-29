
import UserService  from "../services/UserService";
import CategoriesService from "../services/CategoriesService";
import ProductsService from "../services/ProductsService";

/**
 * @typedef {Object} LoginResult
 * @property {typeof import("@firebase/auth").User | null} user
 * @property {string} message
 * */


const createUsersSlice = (set, get) => ({
    users: [],
    /**
     * @type {typeof import("@firebase/auth").User | null}
     * */
    loggedInUser: null,
    /** @param {string} email
     * @param {string} password
     * @returns {LoginResult} */
    logIn: async (email, password)=>{
        let loggingAction = await UserService.logInUser(email,password);
        
        if (loggingAction.user === null){

            return loggingAction.message;
        }
        await get().setInitialStoreState(loggingAction.user.uid);
        set(() => ({
            loggedInUser: loggingAction.user,

        }))

        return '';
    },
    /**
     * 
     * @param  {typeof import("@firebase/auth").User | null} user 
     */
    setLogInUser: async (user)=>{
        const userExists = await UserService.checkIfUserExists(user.uid);
        user = userExists ? user : null;
        if(user !== null){
            get().setInitialStoreState(user.uid)
        }
        set(() => ({
            loggedInUser: user,
        }))

    },
    setInitialStoreState: async (userId)=>{
        const images = await CategoriesService.fetchImages();
        let allProducts = await ProductsService.getAllProducts();
        let userProducts = await ProductsService.getUserProducts(userId);
        await get().getUserCategories(userId);
        set(() => ({
            images: images,
            productDictionary: allProducts, userProducts

        }))
    },
    /**
     * Returns error message or empty string if everything is ok
     * @return {Promise<string>}
     */
    logWithGoogle: async ()=>{
        let loggingAction = await UserService.logWithGoogle();
        
        if (loggingAction.user === null){
            return loggingAction.message;
        }
        await get().setInitialStoreState(loggingAction.user.uid);
        set(() => ({
            loggedInUser: loggingAction.user,

        }))

        return '';
    },
    /**
     * LogOut current user
     * @return {Promise<void>}
     */
    logOut: async () => {
        await UserService.logOut();
        set(() => ({
            loggedInUser: null,

        }))
    },
    /**
     * Creates new user
     * sets global state properties
     * loggedInUser - new created user
     * @param {string} email
     * @param {string} password
     * @return {Promise<string>}
     */
    addUser: async (email, password)=>{
        //let userCategories = [];
        try{
            
            let createdAction = await UserService.createNewUser(email,password);
            
            if(createdAction.user === null){
                return createdAction.message;
            }
            //userCategories = await CategoriesService.getUserCategories(createdAction.user.uid);
            await get().setInitialStoreState(createdAction.user.uid);
            set(() => ({
                loggedInUser: createdAction.user,
                //categories: userCategories  // w UserService when this function return new user we add to him default categories

            }))
            return ""

        } catch (error){
            
            return error
        }

    },
    /**
     * Creates new user
     * sets global state properties
     * loggedInUser - new created user
     * @return {Promise<string>}
     */
    signWithGoogle: async () =>{
        try{
            
            let createdAction = await UserService.signUpWithGoogle();
            
            if(createdAction.user === null){
                return createdAction.message;
            }
            await get().setInitialStoreState(createdAction.user.uid);
            set(() => ({
                loggedInUser: createdAction.user,
            }))
            return ""

        } catch (error){
            
            return error
         }

    },
    /**
     * return user which email is equal param email
     * @param {string} email
     * @return {Promise<void>}
     */
    forgotPasswordWithEmail: async (email) =>{
        await UserService.forgotPassword(email);
        
    },
})

export default createUsersSlice;