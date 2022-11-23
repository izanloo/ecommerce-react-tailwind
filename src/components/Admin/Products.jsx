import React from 'react'
import ModalEdit from './ModalEdit'
import axios from 'axios';
import { BiTrash } from "react-icons/bi";
import { BASE_URL } from '../../configs/variables.config'
import { useState } from 'react';
import { DeleteProduct } from '../../apies/GetProducts';
import { FormatPrice } from '../../utils/functions';

const Products = ({ data }) => {
let [Products,setProducts] = useState(data)

    //delete product --------------
    const deleteProduct = (id) => {
        DeleteProduct(id).then((res)=>{
            if(res.status == 200){
                const posts = Products.filter(item => item.id !== id);  
                setProducts(posts)
            }
        })
    }
    return (
        <>
            <table className='text-center border'>
                <tbody>
                    <tr className='border p-2'>
                        <th className='border p-2'>عکس</th>
                        <th className='border p-2'>نام محصول</th>
                        <th className='border p-2'>تعداد</th>
                        <th className='border p-2'>قیمت</th>
                        <th className='border p-2'>ویرایش </th>
                        <th className='border p-2'>حذف </th>
                    </tr>
                    {Products.map((item, i) => (
                        <tr className='border p-2' key={i}>
                            <td className='border p-2'>{<img src={`${BASE_URL}/files/${item.thumbnail}`} className=" w-32 " />}</td>
                            <td className='border p-2'>{item.name}</td>
                            <td className='border p-2'>{item.count}</td>
                            <td className='border p-2'>{FormatPrice(item.price)}</td>
                            <td className='border p-2'><ModalEdit item={item} /></td>
                            <td className='border p-2'><BiTrash onClick={() => { deleteProduct(item.id) }} /></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export default Products  