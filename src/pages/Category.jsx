import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"
import { GetCategory } from '../apies/GetCategory'
import { api } from "../services/Config";
import { Helmet } from "react-helmet";
import WithUser from '../layouts/WithUser'
import { BASE_URL } from '../configs/variables.config'
import Pagination from "../components/Pagination";
import Records from "../components/Records";

function Category(props) {
    let params = useParams();
    const [category, setCategory] = useState({})
    let categoryId = '';
    // Pagination--
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(6);
    // end Pagination--

    if (category.length >= 1) {
        getItem()
    }
    else {
        console.log("not categort")
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

    // Pagination
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(data.length / recordsPerPage)
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{params.categoryName} دسته بندی </title>
            </Helmet>
            <meta name="description" content="لیست دسته بندی های {namecategory}" />
            <div className="w-full pt-20 ">
                <Records data={currentRecords} />
                <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>

        </>
    )
}
export default WithUser(Category)
