import React,{useState, useEffect } from "react";
import WithUser from "../layouts/WithUser";
import EasyEdit from 'react-easy-edit';
import { Link, useNavigate } from "react-router-dom";

function Cart() {
    
    let dataLocalStorage = JSON.parse(localStorage.getItem('cart'))
    //sum pricce products--------------------
    let [sum, setSum] = useState()
    function sumPrices() {
        let arr = [];
        let sums
        if (dataLocalStorage == null || dataLocalStorage =='') {
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
    useEffect(() => { sumPrices() }, [])

    //edit input count and update localstorage-----
    const save = (value,item) => { 
        const findItem = dataLocalStorage.findIndex(i => i.id === item.id)
        if (findItem >= 0) {
            dataLocalStorage.splice(findItem, 1)
            localStorage.setItem('cart', JSON.stringify(dataLocalStorage));
            const newLocal = JSON.parse(localStorage.getItem("cart"));
            let newRow = { "name": item.name, "price": item.price, "count": value, "id": item.id };
            localStorage.setItem('cart', JSON.stringify([...newLocal, newRow]));
            sumPrices()
        }
    }
    const cancel = () => {alert("Cancelled")}

    //delete product and update localstorage-------
    const deleteProuduct = (id)=>{    
        const cartLocalStorage = JSON.parse(localStorage.getItem('cart'))
       let items = cartLocalStorage.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(items));
        if (items.length === 0) {
          localStorage.removeItem("cart");
        }
        if(localStorage.getItem('cart') != null){
            sumPrices()
        }else{
            window.location.reload();        }
    }

    const navigate = useNavigate()
    const buy = ()=>{
        localStorage.setItem('purchaseTotal', JSON.stringify(sum));
navigate('/formCustomer')
    }
    return (
        <div className="py-40 flex justify-center">
            {dataLocalStorage == null || dataLocalStorage =='' ? "محصولی در سبدخرید شما وجود ندارد" :
                <>
                    <table className="border text-center">
                        <th className="border px-2">نام محصول</th>
                        <th className="border px-2">تعداد</th>
                        <th className="border px-2">قیمت واحد</th>
                        <th className="border px-2">حذف</th>
                        {Object.values(dataLocalStorage).map((item, id) => (
                            <tr key={id}>
                                <td className="border px-2">{item.name}</td>
                                <td className="border px-2">
                                <EasyEdit type="number" value={item.count} onSave={(value)=>save(value,item)}  onCancel={cancel} saveButtonLabel="ذخیره" cancelButtonLabel="کنسل" id="editCount" attributes={{ name: "awesome-input" , id:item.id}}/>
                                </td>
                                <td className="border px-2">{item.price}</td>
                                <td className="border px-2"><button onClick={()=>{deleteProuduct(item.id)}}>delete</button></td>
                            </tr>
                        ))}
                    </table>
                    <h2>جمع: {sum == null ? "0" : <span>{sum} </span>} تومان  </h2>
                    <button className="bg-yellow-400 border rounded-md text-2xl px-5 mx-5 h-fit" onClick={buy}>خرید</button>
                </>
            }
        </div>
    )
}
export default WithUser(Cart)