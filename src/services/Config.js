import axios from 'axios';

const api = axios.create({
    baseURL : 'http://localhost:3002/'
})
export {api}

const baseURL = 'http://localhost:3002/';
export {baseURL}