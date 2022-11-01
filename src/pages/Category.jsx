import { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom"
import {GetCategory} from '../apies/GetCategory'
import { api } from "../services/Config";
import { AppContext } from "../context/Context";

export default function Category(props){
    const {user} = useContext(AppContext)
    console.log(user)
let params = useParams();
const [category,setCategory] = useState({})
const [product,setProduct] = useState({})
let categoryId = []
useEffect(()=>{
    Object.values(category).map((item)=>{
        if(item.name === `${params.categoryName}`){
            categoryId = item.id
        }
    })
},[])
useEffect(() => {
    GetCategory().then(res => {
            setCategory(res.data);
    });
}, []); 

async function getData(){
    try{
        const products = await api.get(`/products?category=${categoryId}`)
        setProduct(products.data)
    }
    catch{}
}
useEffect(()=>{getData()},[])
return(
       <>
       hi
       </>
    )
}