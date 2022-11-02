import { Fragment, useState, useEffect } from "react";
import WithUser from "../layouts/WithUser";

function Cart() {
    let dataLocalStorage = JSON.parse(localStorage.getItem('cart'))
    let [sum, setSum] = useState()

    function sumPrices() {
        let arr = [];
        let sums
        if (dataLocalStorage == null) {
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

    //------ edit count product
    const handleEdit = (item) => {
        document.getElementById("editCount").setAttribute("contenteditable", "true");
        const box = document.getElementById("editCount");
        const findItem = dataLocalStorage.findIndex(i => i.id === item.id)
        let aa = box.textContent;
        if (findItem >= 0) {
            dataLocalStorage.splice(findItem, 1)
            localStorage.setItem('cart', JSON.stringify(dataLocalStorage));
            const newLocal = JSON.parse(localStorage.getItem("cart"));
            let newRow = { "name": item.name, "price": item.price, "count": "2", "id": item.id };
            localStorage.setItem('cart', JSON.stringify([...newLocal, newRow]));
            sumPrices()
        }
    }
    return (
        <div className="py-40 flex justify-center">
            {dataLocalStorage == null ? "محصولی در سبدخرید شما وجود ندارد" :
                <>
                    <table className="border text-center">
                        <th className="border px-2">نام محصول</th>
                        <th className="border px-2">تعداد</th>
                        <th className="border px-2">قیمت واحد</th>
                        {Object.values(dataLocalStorage).map((item, id) => (
                            <tr key={id}>
                                <td className="border px-2">{item.name}</td>
                                <td className="border px-2" id="editCount" onClick={() => handleEdit(item)}>{item.count}</td>
                                <td className="border px-2">{item.price}</td>
                            </tr>
                        ))}
                    </table>
                    <h2>جمع: {sum == null ? "0" : <span>{sum} </span>} تومان  </h2>

                </>
            }
        </div>
    )
}
// npm i react-easy-edit
export default WithUser(Cart)