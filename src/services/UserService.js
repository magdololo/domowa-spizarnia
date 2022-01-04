import axios from "axios";
import CategoriesService from "./CategoriesService";

const UserService =  {
    createNewUser: async (email, password) => {
        try{
            let response = await axios.get(`http://192.168.1.28:4000/users?email=${email}`);
            if(response.data.length === 0){
                let responsePost = await axios.post('http://192.168.1.28:4000/users', {email: email, password: password});
                console.log(responsePost)//object with data: email, password, id
                let defaultCategories =  await CategoriesService.getDefaultCategories();
                defaultCategories.forEach(category=>{
                    category.id = null;
                    category.userId = responsePost.data.id;
                    CategoriesService.addNewCategory(category)
                    }
                )
                return responsePost.data;
            }
        } catch (error){
            console.error(error)
        }
        throw new Error('User with given email already exists');
    },
    logInUser: async (email,password) => {
        let returnObject = {user: null, message:''};
        try {
            let response = await axios.get(`http://192.168.1.28:4000/users?email=${email}&password=${password}`);
            if(response.data.length === 1){
                returnObject.user = response.data[0];
            }else {
                returnObject.message = 'User or password incorrect';
            }
        }
        catch (error){
            console.log(error)
            returnObject.message = error;
        }

        return returnObject;
    }
}

export default UserService;