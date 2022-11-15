import React from 'react'
import ModalEdit from './ModalEdit'
import axios from 'axios';
import { BiTrash } from "react-icons/bi";
import { BASE_URL } from '../../configs/variables.config'

const Products = ({ data }) => {

    //delete product --------------
    const deleteProduct = (id) => {
        axios.delete(`${BASE_URL}/products/${id}`)
    }
    return (
        <>
            <table className='text-center border'>
                <tr className='border p-2'>
                    <th className='border p-2'>عکس</th>
                    <th className='border p-2'>نام محصول</th>
                    <th className='border p-2'>تعداد</th>
                    <th className='border p-2'>قیمت</th>
                    <th className='border p-2'>ویرایش </th>
                    <th className='border p-2'>حذف </th>
                </tr>
                {data.map((item, i) => (
                    <tr className='border p-2' key={i}>
                        <td className='border p-2'>{<img src={`${BASE_URL}/files/${item.thumbnail}`} className=" w-32 " />}</td>
                        <td className='border p-2'>{item.name}</td>
                        <td className='border p-2'>{item.count}</td>
                        <td className='border p-2'>{item.price}</td>
                        <td className='border p-2'><ModalEdit item={item} /></td>
                        <td className='border p-2'><BiTrash onClick={() => { deleteProduct(item.id) }} /></td>
                    </tr>
                ))}
            </table>
        </>
    )
}
export default Products  