import { useState, useEffect } from "react";
import { GetProducts } from '../apies/GetProducts';
import Pagination from "../components/Pagination";
import Products from '../components/Admin/Products'
import WithAdmin from '../layouts/WithAdmin'
import ModalAdd from "../components/Admin/ModalAdd";
import axios from "axios";
import TableOrders from "../components/Admin/TableOrders";

function PanelAdmin() {

    // Pagination-----------------------
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)

    // get products-------------------------
    useEffect(() => {
        GetProducts().then((res) => {
            setData(res.data)
        })
    }, [data])


    return (
        < div className="pt-40">
            <p>تمام محصولات</p>
            <ModalAdd />
            {data == '' ? 'محصول  موجود نیست' :
                <>
                    <Products data={currentRecords} />
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            }

        </div>
    )
}
export default WithAdmin(PanelAdmin)