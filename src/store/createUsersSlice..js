import axios from "axios";
import UserService  from "../services/UserService";
import {auth} from "../firebase";

const createUsersSlice = (set, get) => ({
    users: [],
    loggedInUser: null,
    logIn: async (email, password)=>{
        let loggingAction = await UserService.logInUser(auth, email,password);
        if (loggingAction.user === null){
            return loggingAction.message;
        }
        set(() => ({
            loggedInUser: loggingAction.user,

        }))
        return '';
    },
    logWithGoogle: async ()=>{
        let loggingAction = await UserService.logWithGoogle();
        console.log(loggingAction);
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
    addUser: async (newUser)=>{
        try{
            let createdUser = await UserService.createNewUser(newUser.email,newUser.password);
            //console.log('createdUser')
            set(() => ({
                loggedInUser: createdUser,
            }))
            return ""

        } catch (error){
            console.log(error)
            return error
        }

    },
    sendPassword: async (email,password) =>{
        await axios.get(`http://192.168.1.28:4000/users?email=${email}&password=${password}`).then(
            function (response) {
                // handle success
                return window.location = '/';
            }
        )
    }
})

export default createUsersSlice;