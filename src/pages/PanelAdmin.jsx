import { useState, useEffect } from "react";
import { GetProducts } from '../apies/GetProducts';
import Pagination from "../components/Pagination";
import Products from '../components/Admin/Products'
import WithAdmin from '../layouts/WithAdmin'
import ModalAdd from "../components/Admin/ModalAdd";
import { Link } from "react-router-dom";

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
    }, [])

    return (
        < div className="pt-5">
            <div className='flex justify-center border-black border-b relative my-10 mx-3 '>
                <h3 className='sm:text-3xl font-bold bg-[#fbf5f5] border border-sky-900 w-fit rounded-md absolute mt-[-24px] px-1 sm:px-7 py-2 '>تمام محصولات</h3>
            </div>
            <div className="flex items-center mb-5">
                <ModalAdd /><h2>افزودن محصول جدید</h2>
            </div>
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