import { BASE_URL } from '../configs/variables.config'
import {http} from '../services/http.service'

export async function AddOrders(data){
    try{
        const response = await http.post(`${BASE_URL}/orders`,data)
        return response
    }
    catch(e){
        return Promise.reject(e)
    }
}