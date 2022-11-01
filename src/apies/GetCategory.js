import http from '../services/http.service';

export async function GetCategory(){ 
    try{
        const response = await http.get('/category')
        return response
    }
    catch(e){
        return Promise.reject(e);
    }
}