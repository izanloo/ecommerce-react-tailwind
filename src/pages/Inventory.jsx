import React, { useState, useEffect } from "react";
import EasyEdit from 'react-easy-edit';
import { GetProducts, GetProduct, UpdateProduct } from '../apies/GetProducts'
import WithAdmin from "../layouts/WithAdmin";


function Inventory() {
    // Pagination-----------------------
    let [dataLocalStorage, setData] = useState(JSON.parse(localStorage.getItem('cart')) || '')
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(2);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = dataLocalStorage.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(dataLocalStorage.length / recordsPerPage)

    let [products, setProducts] = useState([])
    useEffect(() => {
        GetProducts().then((res) => { setProducts(res.data) })
    }, [])

    //edit input count and update localstorage-----
    const saveCount = (count, id) => {
        GetProduct(id).then((res) => {
            if (res.status == 200) {
                const data = res.data;
                data.count = count;
                UpdateProduct(id, data)
            }
        })
    }

    const savePrice = (price, id) => {
        GetProduct(id).then((res) => {
            if (res.status == 200) {
                const data = res.data;
                data.price = price;
                UpdateProduct(id, data)
            }
        })
    }
    
    const cancel = () => { alert("تغییرات ذخیره نمی شود") }

    return (
        <>
            {products == null || '' ? <>محصولی موحود نیست</> :
                <table className="border text-center ">
                    <tbody>
                        <tr>
                            <th className="border px-2">نام محصول</th>
                            <th className="border px-2">تعداد</th>
                            <th className="border px-2">قیمت واحد</th>
                        </tr>
                        {products.map((item, id) => (
                            <tr key={id}>
                                <td className="border px-2">{item.name}</td>
                                <td className="border px-2 pt-40">
                                    <EasyEdit type="number" value={item.count} onSave={(value) => saveCount(value, item.id)} onCancel={cancel} saveButtonLabel="ذخیره" cancelButtonLabel="کنسل" id="editCount" attributes={{ name: "awesome-input", id: item.id }} />
                                </td>
                                <td className="border px-2 pt-40">
                                    <EasyEdit type="number" value={item.price} onSave={(value) => savePrice(value, item.id)} onCancel={cancel} saveButtonLabel="ذخیره" cancelButtonLabel="کنسل" id="editCount" attributes={{ name: "awesome-input", id: item.id }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            }
        </>
    )
}
export default WithAdmin(Inventory)