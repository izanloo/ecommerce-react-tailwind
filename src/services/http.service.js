import axios from "axios";
import {BASE_URL} from '../configs/variables.config'

class HttpService{
    constructor(){
        axios.defaults.baseURL = BASE_URL;
    }

    get(url, config) {
        return axios.get(url, config);
    }
    put(url,data,config){
        return axios.put(url,data,config)
    }
    push(url,data,config){
        return axios.push(url,data,config)
    }
    patch(url,data,config){
        return axios.patch(url,data,config)
    }
    delete(url,config){
        return axios.delete(url,config)
    }
}
export default new HttpService();

export const http = {
    // get: axios.get,
    post: axios.post,
    // delete: axios.delete,
    // put: axios.put,
    // patch:axios.patch,
  };
  