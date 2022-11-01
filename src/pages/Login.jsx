import React from 'react'
import CarouselSlide from '../components/SliderGallery';
import logo from "../assest/images/logo.png"
import { Link } from 'react-router-dom';
import Input from '../components/Input';


export default function Login() {
    return (
        <body className="flex h-screen bg-gray-100">
            <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-gray-300 p-5">
                <header>
                    <img className="w-20 mx-auto mb-5" src={logo} />
                </header>
                <form>
                    <label className="block mb-2" for="username">نام کاربری</label>
                    <Input type="text" className='w-full p-2 mb-6 border border-gray-400 rounded-lg bg-gray-100' />
                    <label className="block mb-2" for="password">پسورد</label>
                    <Input type="password" className='w-full p-2 mb-6 border border-gray-400 rounded-lg bg-gray-100' />
                    <button className="w-full bg-yellow-400 font-bold py-2 px-4 mb-6 rounded-lg" >ورود</button>
                </form>
                <div className='flex justify-between'>
                    <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">رمز عبورم را فراموش کردم !</a>
                    <a className="text-indigo-700 hover:text-pink-700 text-sm float-right" href="#">ایجاد حساب جدید</a>
                </div>
            </div>
        </body>
    )
}