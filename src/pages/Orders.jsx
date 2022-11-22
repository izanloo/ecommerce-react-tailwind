import { useState, useEffect } from "react";
import WithAdmin from '../layouts/WithAdmin'
import axios from "axios";
import TableOrders from "../components/Admin/TableOrders";

function Orders() {

    const [row, setRow] = useState([]);
    const [selectedValue, setSelectedValue] = useState("1");

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3002/orders?orderStatus=${selectedValue}`)
            .then((res) => setRow(res.data));
    }, [selectedValue]);



    return (
        <>
            <div className="flex pt-10">
                <label>سفارش های تحویل داده شده</label>
                <input type='radio' value='1' onChange={handleChange} name="status" defaultChecked />
                <br />
                <label>سفارش های در حال تحویل</label>
                <input type='radio' value='2' onChange={handleChange} name="status" />
            </div>
            {row === '' ? <>سفارشی وجود ندارد</> : <TableOrders row={row} />}
        </>

    )
}
export default WithAdmin(Orders)