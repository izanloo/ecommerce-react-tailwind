import { useState, useEffect } from "react";
import WithAdmin from '../../layouts/WithAdmin'
import axios from "axios";
import TableOrders from "./TableOrders";

function Orders() {

    const [row, setRow] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3002/orders?orderStatus=${selectedValue}`)
            .then((res) => setRow(res.data));
    }, [selectedValue]);



    return (
        < div className="pt-40">
            <p>تمام محصولات</p>
            <div className="flex">
                <label>سفارش های تحویل داده شده</label>
                <input type='radio' value='1' onChange={handleChange} name="status" />
                <br />
                <label>سفارش های در حال تحویل</label>
                <input type='radio' value='2' onChange={handleChange} name="status" />
            </div>
            {row === '' ? <>سفارشی وجود ندارد</> : <TableOrders row={row} />}

        </div>
    )
}
export default Orders