import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Home/Carousel'
import SliderHome from '../components/Home/SliderHome'
import { GetCategory } from '../apies/GetCategory'
import WithUser from '../layouts/WithUser';

function Home() {
        const [category, setCategory] = useState([])
        useEffect(() => {
                GetCategory().then(res => {
                        setCategory(res.data);
                });
        }, []);
        return (
                <>
                        <Carousel />
                        <div className='flex justify-center border-black border-b relative my-20 mx-3 sm:mx-20'>
                                <h3 className='sm:text-3xl font-bold bg-white border border-sky-900 w-fit rounded-md absolute mt-[-24px] px-1 sm:px-7 py-2 '>دسته بندی محصولات</h3>
                        </div>
                        {category.map((item, id) => ( 
                                <div className="px-3 md:px-20 " key={id} >
                                        <Link to={`/category/${item.name}`} state={{ item: item }} className='sm:text-2xl font-bold mt-2'>{item.name}</Link>
                                        <SliderHome idCategory={item.id} />
                                </div>
                        ))}
                </>
        )
}
export default WithUser(Home)