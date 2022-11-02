import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiCartAlt, BiBookmarkHeart, BiShareAlt, BiBell, BiStar } from "react-icons/bi";
import { Tooltip, Button } from "@material-tailwind/react";
import { Helmet } from 'react-helmet';
import { api } from '../services/Config';
import SliderGallery from '../components/SliderGallery'
import WithUser from '../layouts/WithUser'


 function Details() {

const navigate = useNavigate();
  let params = useParams();
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  let [count, setCount] = useState();
  let [cart, setCart] = useState([])

  let categoryId = product.id
  // let idProductCart = ''
  async function getData() {
    try {
      const getProduct = await api.get(`products/${params.productId}`)
      setProduct(getProduct.data)
      let getCategoryProduct = await api.get(`/category`)
      setCategory(getCategoryProduct.data)
    }
    catch { }
  }
  useEffect(() => { getData() }, [])
  useEffect(() => {
    category.map((item) => {
      if (item.id == categoryId) {
        setCategoryName(item.name)
      }
    })
  }, [category])

  const handleChange = (e) => {
    setCount(e.target.value)
  }
  useEffect(() => {
    setCart([{ "name": product.name, "price": product.price, "count": count, "id": product.id }])

  }, [count])
  // add product to cart(save in localStorage)
  const handleAddCart = () => {

    if (count > parseInt(product.count)) {
      console.log("موجودی کم است")
    }
    if (count <= 0) {
      console.log("عدد وارد شده نادرست است")
    }

    if (count <= parseInt(product.count)) {
      // setCart([{ "name": product.name ,"price": product.price ,  "count": count , "id": product.id}])
      let items = { 'count': count }
      let newList = Object.assign(...cart, items)
      if (localStorage.getItem("cart")) {
        const LocalStorage = JSON.parse(localStorage.getItem("cart"));
        const findItem = LocalStorage.findIndex(i => i.id == newList.id)
        if (findItem >= 0) {
          LocalStorage.splice(findItem, 1)
          localStorage.setItem('cart', JSON.stringify(LocalStorage));
          const newLocal = JSON.parse(localStorage.getItem("cart"));
          localStorage.setItem('cart', JSON.stringify([...newLocal, newList]));
        }
        localStorage.setItem('cart', JSON.stringify([...LocalStorage, newList]));
      }
      else {
        localStorage.setItem('cart', JSON.stringify([newList]));
      }
      return navigate('/cart')
    }

  }
  return (
    <>
    <Helmet>
      <meta charSet='utf-8' />
      <title>{product.name}</title>
    </Helmet>
    <div className='pt-32 px-2 md:px-20 '>
      <h6 className='text-gray-500' >گوشی موبایل » {category != '' ? <span>{categoryName} » {product.name}</span> : <span></span>}</h6>
      <div className='md:flex my-5'>
        {/* gallery images */}
        <div className='w-50 flex'>
          <div className='md:pl-3'>
            <Tooltip content="افزودن به علاقه مندی ها" className='bg-sky-700 p-3 '>
              <Button variant="gradient" className='text-sky-700 text-4xl'><BiBookmarkHeart /></Button>
            </Tooltip>
            <Tooltip content="اشتراک گذاری" className='bg-sky-700 p-3 '>
              <Button variant="gradient" className='text-sky-700 text-4xl'><BiShareAlt /></Button>
            </Tooltip>
            <Tooltip content="تخفیف خورد خبرم کن :)" className='bg-sky-700 p-3 z-10 '>
              <Button variant="gradient" className='text-sky-700 text-4xl'><BiBell /></Button>
            </Tooltip>
          </div>
          <SliderGallery />
        </div>
        {/* description mobile */}
        <div className='w-50  md:pr-5 lg:pr-20 xl:pr-40 xl:pl-20 mt-3 md:mt-0'>
          <h1 className='text-3xl font-bold mb-3'>{product.name}</h1>
          <p className='text-justify mb-2'>توضیحات {product.description}</p>
          <Link to='' className='text-sky-700'><BiStar className='text-yellow-400 inline ml-1' />(0 نظر)</Link>
          <div className='flex justify-between items-center'>
            <div>
              <label className='mr-10'>تعداد : </label>
              <input type='number' className=' border-2 border-black rounded' min="1" max="25" onChange={handleChange} />
            </div>
            <h2 className='text-2xl font-bold text-left mt-3'>{product.price} تومان</h2>
          </div>
          <button className='flex items-center bg-yellow-400 w-full justify-center rounded-lg text-2xl mt-4 mb-3 py-4' onClick={handleAddCart}><BiCartAlt className='ml-2 text-sky-700' />افزودن به سبد خرید</button>
          <Link to='' className='text-sky-700 font-bold text-left block'>چطور قسطی خرید کنم؟</Link>
        </div>
      </div>
    </div>
    </>
  )
}
export default WithUser(Details)