import React, { useState, useEffect } from "react";
import EasyEdit from 'react-easy-edit';
import { GetProducts, GetProduct, UpdateProduct } from '../../apies/GetProducts'
import WithAdmin from "../../layouts/WithAdmin";
import {FormatPrice} from '../../utils/functions';
import Pagination from "../../components/Pagination";

function Inventory() {
    // Pagination-----------------------
    let [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    useEffect(() => {
        GetProducts().then((res) => { setData(res.data) })
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
            {data == null || '' ? <>محصولی موحود نیست</> :
                <div className="w-full flex flex-col items-center pt-5">
                        <div className='flex justify-center border-black border-b relative w-3/6 my-10 mx-3  '>
                <h3 className='sm:text-3xl font-bold bg-[#fbf5f5] border border-sky-900 w-fit rounded-md absolute mt-[-24px] px-1 sm:px-7 py-2 '>مدیریت موجودی و قیمت</h3>
            </div>
                <table className="border text-center border-black w-6/12 mt-10">
                    <tbody>
                        <tr>
                            <th className="border border-black px-2">نام محصول</th>
                            <th className="border border-black px-2">تعداد</th>
                            <th className="border border-black px-2">قیمت واحد</th>
                        </tr>
                        {currentRecords.map((item, id) => (
                            <tr key={id}>
                                <td className="border border-black px-2">{item.name}</td>
                                <td className="border border-black px-2">
                                    <EasyEdit type="number" value={item.count} onSave={(value) => saveCount(value, item.id)} onCancel={cancel} saveButtonLabel="ذخیره" cancelButtonLabel="کنسل" id="editCount" attributes={{ name: "awesome-input", id: item.id }} />
                                </td>
                                <td className="border border-black px-2">
                                    <EasyEdit type="number" value={FormatPrice(item.price)} onSave={(value) => savePrice(value, item.id)} onCancel={cancel} saveButtonLabel="ذخیره" cancelButtonLabel="کنسل" id="editCount" attributes={{ name: "awesome-input", id: item.id }} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination
            nPages={nPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
                </div>
            }
        </>
    )
}
export default WithAdmin(Inventory)