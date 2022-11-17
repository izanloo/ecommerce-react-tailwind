import React, { useEffect, useState } from "react";
import {useDispatch} from 'react-redux';
import { api } from "../../services/Config";
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/scrollbar';
import forTest from "../../assest/images/forTest.webp";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/Context";

export default function Slider(props) {
    let idCategory = props.idCategory
    const [product, setProduct] = useState({})
    async function getData() {
        try {
            const products = await api.get(`/products?_limit=6&category=${idCategory}`)
            setProduct(products.data)
        }
        catch(error) {
            console.log(error)
         }
    }
    useEffect(() => {getData()}, [])
    return (
        <>
            {product == '' ? <p>محصولی وجد ندارد</p> :
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={30}
                    breakpoints={{
                        640: {
                            width: 640,
                            slidesPerView: 2,
                        },
                        768: {
                            width: 768,
                            slidesPerView: 2,
                        },
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    className="justify-center mb-10 scrol "
                >
                    {Object.values(product)?.map((item, id) => (
                            <SwiperSlide className="mb-10 mt-5 h-56 inherit " key={id}>
                                <Link to={`/details/${item.id}`} className="relative" >
                                    <img className="w-full h-72 rounded-lg md:hover:scale-75 " src={`http://localhost:3002/files/${item.thumbnail}`} alt="" />
                                    <h5 className="mb-2 w-full lg:text-2xl font-bold bg-white text-gray-900 dark:text-white absolute bottom-0 text-center ">{item.name}</h5>
                                </Link>
                            </SwiperSlide>
                    ))}
                </Swiper>
            }
        </>
    )
}