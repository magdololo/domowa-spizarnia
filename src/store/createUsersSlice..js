import axios from "axios";
import UserService  from "../services/UserService";

const createUsersSlice = (set, get) => ({
    users: [],
    loggedInUser: null,
    logIn: async (email, password)=>{
        let loggingAction = await UserService.logInUser(email,password);
        console.log(loggingAction)
        if (loggingAction.user === null){
            return loggingAction.message;
        }
        set(() => ({
            loggedInUser: loggingAction.user
        }))
        return '';
    },
    addUser: async (newUser)=>{
        try{
            let createdUser = await UserService.createNewUser(newUser.email,newUser.password);
            set(() => ({
                loggedInUser: createdUser
            }))
            return "User Added"

        } catch (error){
            console.log(error)
            return error
        }

    },
    sendPassword: async (email,password) =>{
        await axios.get(`http://192.168.1.134:4000/users?email=${email}&password=${password}`).then(
            function (response) {
                // handle success
                console.log(response);
                return window.location = '/';
            }
        )
    }
})

export default createUsersSlice;