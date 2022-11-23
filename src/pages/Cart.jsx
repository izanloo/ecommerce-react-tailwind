import React, { useState, useEffect } from "react";
import WithUser from "../layouts/WithUser";
import EasyEdit from 'react-easy-edit';
import { useNavigate } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import Pagination from "../components/Pagination";
import {FormatPrice} from '../utils/functions'



function Cart() {
    // Pagination-----------------------
    let [dataLocalStorage, setData] = useState(JSON.parse(localStorage.getItem('cart')) || '')
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(2);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = dataLocalStorage.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(dataLocalStorage.length / recordsPerPage)


    //sum pricce products--------------------
    let [sum, setSum] = useState()
    function sumPrices() {
        let arr = [];
        let sums
        if (dataLocalStorage == null || dataLocalStorage == '') {
            console.log("null")
        } else {
            const data = localStorage.getItem('cart');
            const initialData = data !== null ? JSON.parse(data) : null;
            initialData.map(item => {
                arr = [...arr, parseInt(item.count) * parseInt(item.price)]
                sums = arr.reduce((x, y) => x + y);
            })
        }
        setSum(sums)
    }
    useEffect(() => { sumPrices() }, [sum])

    //edit input count and update localstorage-----
    const save = (value, item) => {
        const findItem = dataLocalStorage.findIndex(i => i.id === item.id)
        if (findItem >= 0) {
            dataLocalStorage.splice(findItem, 1)
            localStorage.setItem('cart', JSON.stringify(dataLocalStorage));
            const newLocal = JSON.parse(localStorage.getItem("cart"));
            let newRow = { "name": item.name, "price": item.price, "count": value, "id": item.id };
            localStorage.setItem('cart', JSON.stringify([...newLocal, newRow]));
            setData(JSON.parse(localStorage.getItem("cart")))
            sumPrices()
        }
    }
    const cancel = () => { alert("تغییرات ذخیره نمی شود") }

    //delete product and update localstorage-------
    const deleteProuduct = (id) => {
        const cartLocalStorage = JSON.parse(localStorage.getItem('cart'))
        let items = cartLocalStorage.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(items));
        setData(JSON.parse(localStorage.getItem('cart')))
        if (items.length === 0) {
            localStorage.removeItem("cart");
        }
        if (localStorage.getItem('cart') != null) {
            sumPrices()
        }

    }

    const navigate = useNavigate()
    const buy = () => {
        localStorage.setItem('purchaseTotal', JSON.stringify(sum));
        navigate('/formCustomer')
    }
    return (
        <div className="py-40 flex justify-center">
            {dataLocalStorage == null || dataLocalStorage == '' ? "محصولی در سبدخرید شما وجود ندارد" :
                <div>
                    <table className="border text-center">
                        <tbody>
                            <tr>
                                <th className="border px-2">نام محصول</th>
                                <th className="border px-2">تعداد</th>
                                <th className="border px-2">قیمت واحد</th>
                                <th className="border px-2">حذف</th>
                            </tr>
                            {Object.values(currentRecords).map((item, id) => (
                                <tr key={id}>
                                    <td className="border px-2">{item.name}</td>
                                    <td className="border px-2">
                                        <EasyEdit type="number" value={item.count} onSave={(value) => save(value, item)} onCancel={cancel} saveButtonLabel="ذخیره" cancelButtonLabel="کنسل" id="editCount" attributes={{ name: "awesome-input", id: item.id }} />
                                    </td>
                                    <td className="border px-2">{FormatPrice(item.price)}</td>
                                    <td className="border px-2"><button onClick={() => { deleteProuduct(item.id) }}><BiTrash /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex mt-5 items-center">
                    <h2>جمع: {sum == null ? "0" : <span>{FormatPrice(sum)} </span>} تومان  </h2>
                    <button className="bg-[#8C2973] text-white border rounded-md text-2xl pb-2 pt-1 px-5 mx-5 h-fit" onClick={buy}>خرید</button>
                        </div>
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            }
        </div>
    )
}
export default WithUser(Cart)