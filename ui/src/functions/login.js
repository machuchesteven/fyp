import axios from "axios";
const login = async (username, password) => {        
    let loginURL = "http://127.0.0.1:8000/accounts/login/";        
    const response = await axios.post(loginURL, { 
        "username": username, "password": password
    })
        .then(response => response.json())
        .catch(err => err.json())
}

export default login;