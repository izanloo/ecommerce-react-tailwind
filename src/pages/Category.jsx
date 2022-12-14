import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"
import { GetCategory } from '../apies/GetCategory'
import { api } from "../services/Config";
import { Helmet } from "react-helmet";
import WithUser from '../layouts/WithUser'
import Pagination from "../components/Pagination";
import CardCategory from "../components/CardCategory";

function Category(props) {
    let params = useParams();
    const [category, setCategory] = useState({})
    let categoryId = '';
    // Pagination--------------------------------------
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)
    // end Pagination-------------------------------------

    if (category.length >= 1) {
        getItem()
    }
    function getItem() {
        categoryId = category.find(i => i.name === params.categoryName).id;
    }

    useEffect(() => {
        GetCategory().then(res => {
            setCategory(res.data);
        });
    }, []);

    async function getData() {
        try {
            const products = await api.get(`/products?category=${categoryId}`)
            setData(products.data);
            setLoading(false);
        }
        catch { }
    }
    useEffect(() => {
        if (categoryId != '') {
            getData()
        }
    }, [categoryId])
  
    return (
        <>
            {/* title browser------- */}
            <Helmet>
                <title>{params.categoryName} دسته بندی </title>
            {/* <meta name="description" content="لیست دسته بندی های `{params.categoryName}`" /> */}
            </Helmet>
            
            {/* content-page----------- */}
            <div className="w-full pt-20 ">
                <h1 className="text-2xl font-bold pr-12 pb-5">{params.categoryName}</h1>
                {data == '' ? 'محصول موردنظر موجود نیست' : 
                <>
                <CardCategory data={currentRecords} />
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                </>
                } 
            </div>
        </>
    )
}
export default WithUser(Category)
