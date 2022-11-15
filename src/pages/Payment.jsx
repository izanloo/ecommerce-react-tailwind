import WithUser from "../layouts/WithUser";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { ACCESS_TOKEN } from "../configs/variables.config";
import { useState } from "react";
import { useEffect } from "react";


function Payment() {
    const [searchParams, setSearchParams] = useSearchParams()
    let customer = JSON.parse(localStorage.getItem('customer'))
    let products = JSON.parse(localStorage.getItem('cart'))
    let purchaseTotal = JSON.parse(localStorage.getItem('purchaseTotal'))
    const dateNumber = +new Date()

    let [product, setProduct] = useState([])
    let arr =[]
    products.map((item) => {
        arr =[...arr, item.id]
    })
    const getProduct = () => {
        arr.map(item=>{
            axios.get(`products?id=${item}`).then((res) => setProduct(res.data))

        })
    }
    
useEffect(()=>{
    getProduct()

},[])
product.map((item=>{console.log(item.name)}))
        let data = {
        50: "50"
    }
    // let token = localStorage.getItem('token')
    // axios.patch(`products/id=3`, data,{
    //     headers: {

    //         Authorization: `Bearer ${localStorage.getItem('token')}`,
    //         'Content-Type': 'application/json',
    //         // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'

    //     },
    // }).then(response => { 
    //     console.log(response)
    // })
    // .catch(error => {
    //     console.log(error.response)
    // });



    let customerDetail = {
        "firstName": customer.firstName,
        "lastName": customer.lastName,
        "address": customer.address,
        "phone": customer.phone
    }
    // if(searchParams.get("status") == 'sucsess'){
    //     axios({
    //         method: 'post',
    //         url: 'orders',
    //         data: {
    //           customerDetail,
    //           orderItems :products,
    //           orderStatus : "1",
    //           delivery: customer.deliveryDate,
    //           purchaseTotal: purchaseTotal,
    //           orderDate: dateNumber,
    //         }
    //     })
    // }
    return (
        <div className="pt-40">
            {searchParams.get("status") == 'sucsess' ? <>با موفقیت پرداخت شد</> : <>کنسل شد</>}
            {product != '' ? <>
                {product.map(item => (<p key={item.id}>{item.name}</p>))}
            </> : <></>}
        </div>
    )
}
export default WithUser(Payment)