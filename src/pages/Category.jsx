import { useState, useEffect} from "react";
import { useParams } from "react-router-dom"
import { GetCategory } from '../apies/GetCategory'
import { api } from "../services/Config";
// import { Helmet } from "react-helmet";
import WithUser from '../layouts/WithUser'

 function Category(props) {
    let params = useParams();
    const [category, setCategory] = useState({})
    const [product, setProduct] = useState({})
let categoryId =2
    
    // useEffect(() => {
        Object.values(category).map((item) => {
            if (item.name = `${params.categoryName}`) {
                categoryId = item.id 
                
            }
        })
    // }, [category]) 
    console.log(categoryId)
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
        if(categoryId != ''){
            getData()
        }  
     }, [categoryId])
    
    console.log(product)
    return (
        <>
            {/* <Helmet>
                <meta charSet="utf-8" />
                <title>دسته بندی  سامسونگ</title>
            </Helmet> */}
                <meta name="description" content="لیست دسته بندی های {namecategory}" />
            <div className="pt-40">
            {params.categoryName} دسته بندی
            </div>
                
        </>
    )
}
export default WithUser(Category)