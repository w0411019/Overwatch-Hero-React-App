import Axios from 'axios';
import jwt_decode from 'jwt-decode';

class authService {
  
      register(registrationData, callback){

        Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/users/register`, registrationData)
        .then(response => {
            console.log(response)

            if(response.status === 201){
                localStorage.setItem('token', response.headers['x-auth-token'])

                callback(null, true)
            }  
        })
      .catch(error => {
        console.log(error.response)
        callback(error.reponse, false)
      })

    }


    login(credentials, callback) {

        //provide credentials
        //do a post to the api
        Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/users/login`, credentials)
            .then(response => {
                console.log(response)
                
                if(response.status === 200){
                    localStorage.setItem('token', response.headers['x-auth-token'])
                }               
                callback(null, true);
            })
        .catch(error => {
          console.log(error.response) 
          callback(error.response, false);
        })
      
    }
  
    getToken() {
      return localStorage.getItem('token')
    }

    logout() {
      localStorage.removeItem('token')
    }
  
    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    }

    getUser(){
      var tokenDecoded = jwt_decode(localStorage.getItem('token'))
      return tokenDecoded.email;
    }
  }
  
  export default new authService();