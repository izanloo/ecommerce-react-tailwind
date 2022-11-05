import { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom"
import { GetCategory } from '../apies/GetCategory'
import { api } from "../services/Config";
import { Helmet } from "react-helmet";
import WithUser from '../layouts/WithUser'
import {BASE_URL} from '../configs/variables.config'

function Category(props) {
    let params = useParams();
    const [category, setCategory] = useState({})
    const [product, setProduct] = useState({})
    let categoryId = '';


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
            setProduct(products.data)
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
            <Helmet>
                <meta charSet="utf-8" />
                <title>{params.categoryName} دسته بندی </title>
            </Helmet>
            <meta name="description" content="لیست دسته بندی های {namecategory}" />
            <div className="pt-40 flex">
                {Object.values(product).map((item,i)=>(
                    <Fragment key={i}>
                        <div className="px-5 ">
                            <img src={`${BASE_URL}/files/${item.thumbnail}`} />
                            <h1 className="text-3xl text-center">{item.name}</h1>
                            <p>{item.price}  تومان </p>
                        </div>
                        </Fragment>
                ))}
            </div>

        </>
    )
}
export default WithUser(Category)