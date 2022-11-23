import { useState, useEffect } from "react";
import WithAdmin from '../../layouts/WithAdmin'
import axios from "axios";
import TableOrders from "../../components/Admin/TableOrders";
import Pagination from "../../components/Pagination";

function Orders() {
    // Pagination-----------------------
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    const [selectedValue, setSelectedValue] = useState("1");
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    useEffect(() => {
        axios
            .get(`http://localhost:3002/orders?orderStatus=${selectedValue}`)
            .then((res) => setData(res.data));
    }, [selectedValue]);

    return (
        <div className="w-full px-56 text-center">
            <div className="flex pt-10 justify-center mb-10 text-xl ">
                <input type='radio' value='1' onChange={handleChange} name="status" className="ml-1" defaultChecked />
                <label>سفارش های تحویل داده شده</label>
                <input type='radio' value='2' onChange={handleChange} name="status" className="mr-5 ml-1" />
                <label>سفارش های در حال تحویل</label>
            </div>
            {data === '' ? <>سفارشی وجود ندارد</> :
            <div className="min-h-[540px]">
            <TableOrders data={currentRecords} />
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
export default WithAdmin(Orders)