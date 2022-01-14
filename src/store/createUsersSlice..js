
import UserService  from "../services/UserService";
import CategoriesService from "../services/CategoriesService";


const createUsersSlice = (set, get) => ({
    users: [],
    loggedInUser: null,
    logIn: async (email, password)=>{
        let loggingAction = await UserService.logInUser(email,password);
        
        if (loggingAction.user === null){

            return loggingAction.message;
        }
            await CategoriesService.getUserCategories(loggingAction.user.uid);
        set(() => ({
            loggedInUser: loggingAction.user,

        }))
        return '';
    },
    logWithGoogle: async ()=>{
        let loggingAction = await UserService.logWithGoogle();
        
        if (loggingAction.user === null){
            return loggingAction.message;
        }
        set(() => ({
            loggedInUser: loggingAction.user,

        }))
        return '';
    },
    logOut: async () => {
        await UserService.logOut();
        set(() => ({
            loggedInUser: null,

        }))
    },
    addUser: async (email, password)=>{
        let userCategories = [];
        try{
            
            let createdAction = await UserService.createNewUser(email,password);
            
            if(createdAction.user === null){
                return createdAction.message;
            }
            userCategories = await CategoriesService.getUserCategories(createdAction.user.uid);

            set(() => ({
                loggedInUser: createdAction.user,
                categories: userCategories

            }))
            return ""

        } catch (error){
            
            return error
        }

    },
    signWithGoogle: async()=>{
        try{
            
            let createdAction = await UserService.signUpWithGoogle();
            
            if(createdAction.user === null){
                return createdAction.message;
            }
            set(() => ({
                loggedInUser: createdAction.user,
            }))
            set(() => ({
                loggedInUser: createdAction.user,
            }))
            return ""

        } catch (error){
            
            return error
         }

    },
    forgotPasswordWithEmail: async (email) =>{
        let createdAction = await UserService.forgotPassword(email);
        
    },
    // deleteUser: async () =>{
    //     let createdAction = await UserService.deleteUserFromUsers();
    //     
    // },
})

export default createUsersSlice;