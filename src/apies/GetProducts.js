import http from '../services/http.service';

export async function GetProducts() {
    try {
        const response = await http.get('/products?_sort=id&_order=desc')
        return response
    }
    catch (e) {
        return Promise.reject(e)
    }
}

export async function GetProduct(id) {
    try {
        const response = await http.get(`/products/${id}`)
        return response
    }
    catch (e) {
        return Promise.reject(e)
    }
}
export async function UpdateProduct(id, data) {
    try {
        const response = await http.put(`/products/${id}`, data);
        return response;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function DeleteProduct(id) {
    try {
        const response = await http.delete(`/products/${id}`)
        return response
    }
    catch (e) {
        return Promise.reject(e)
    }
}