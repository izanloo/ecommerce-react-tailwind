import http from '../services/http.service';

export async function GetProducts(){
try{
    const response = await http.get('/products?_sort=id&_order=desc')
    return response
}
catch(e){
    return Promise.reject(e)
}
}