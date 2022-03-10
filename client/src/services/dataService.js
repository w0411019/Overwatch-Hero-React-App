import Axios from 'axios';

class dataService {

    //CRUD

    getHeroes(callback){
        Axios.get(`${process.env.REACT_APP_API_ROOT_URL}/heroes`)
        .then(response => {
          console.log(response.data)
          callback(null, response.data)
        })
        .catch(error => {
            callback(error.response, null)
        })
    }

    getOneHero(heroID, callback){
        Axios.get(`${process.env.REACT_APP_API_ROOT_URL}/heroes/${heroID}`)
        .then(response => {
          console.log(response.data)
          callback(null, response.data)
        })
        .catch(error => {
            callback(error.response, null)
        })
    }

    createHero(heroData, callback){
        Axios.post(`${process.env.REACT_APP_API_ROOT_URL}/heroes`, heroData)
        .then(response => {
          console.log(response.data)
          callback(null, response.data)
        })
        .catch(error => {
            callback(error.response, null)
        })
    }

    updateHero(heroData, heroID, callback){
        Axios.put(`${process.env.REACT_APP_API_ROOT_URL}/heroes/${heroID}`, heroData)
        .then(response => {
          console.log(response)
          callback(null, response)
        })
        .catch(error => {
            callback(error.response, null)
        })
    }

    deleteHero(heroID, callback){
        Axios.delete(`${process.env.REACT_APP_API_ROOT_URL}/heroes/${heroID}`)
        .then(response => {
            console.log(response)
            callback(null, response)
          })
          .catch(error => {
              callback(error.response, null)
          })
    }

}

export default new dataService()