import axios from "axios";

const createUsersSlice = (set, get) => ({
    isLoggedIn: false,
    logIn: async (email, password)=>{
        await axios.get(`http://192.168.1.134:4000/users?email=${email}&password=${password}`).then(
            function (response) {
                // handle success
                console.log(response);
                return true;
            }
        )
    }
})

export default createUsersSlice;