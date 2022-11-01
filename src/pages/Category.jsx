import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import { GetCategory } from '../apies/GetCategory'
import { api } from "../services/Config";
import { Helmet } from "react-helmet";

export default function Category(props) {
    let params = useParams();
    const [category, setCategory] = useState({})
    const [product, setProduct] = useState({})
    let categoryId = []
    useEffect(() => {
        Object.values(category).map((item) => {
            if (item.name === `${params.categoryName}`) {
                categoryId = item.id
            }
        })
    }, [])
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
    useEffect(() => { getData() }, [])
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>دسته بندی  سامسونگ</title>
                <meta name="description" content="لیست دسته بندی های " />
            </Helmet>
        </>
    )
}