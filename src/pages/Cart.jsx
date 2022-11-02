import { Fragment, useState,useEffect } from "react";
import WithUser from "../layouts/WithUser";

function Cart() {
    let getLocalstorage = JSON.parse(localStorage.getItem('cart'))
    let [sum, setSum] = useState()

    function sumPrices() {
        let arr = [];
        let sums
        if (getLocalstorage == null) {
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
      console.log(sum)
    return (
        <div className="py-40 flex justify-center">
       {getLocalstorage == null ? "محصولی در سبدخرید شما وجود ندارد" :
        <>
        <table className="border text-center">
            <th className="border px-2">نام محصول</th>
            <th className="border px-2">تعداد</th>
            <th className="border px-2">قیمت واحد</th>
            <th className="border px-2">مجموع قیمت</th>
        {Object.values(getLocalstorage).map((item, id) => (
                    <tr key={id}>
                        <td className="border px-2">{item.name}</td>
                        <td className="border px-2">{item.count}</td>
                        <td className="border px-2">{item.price}</td>
                        <td className="border px-2">{item.price*item.count}</td>
                    </tr>
        ))}
        </table>
        <h2>جمع: {sum == null ? "0" : <span>{sum} </span>} تومان  </h2>

    </>
       }
       </div>
    )
}
export default WithUser(Cart)