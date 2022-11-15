// import {http} from '../services/http.service'
import { ACCESS_TOKEN } from "../configs/variables.config";
import axios from 'axios';
export default function UploadImage(data){
    const header={
        headers:{
            Authorization:`${ACCESS_TOKEN}`,
            'Content-Type': 'multipart/form-data'
        },

    }
    return axios.post(`http://localhost:3002/upload`, data, header);
} 