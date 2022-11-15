import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import WithUser from '../layouts/WithUser'
import logo from "../assest/images/logo.png"
import { BiErrorCircle, BiLock, BiLockOpen } from "react-icons/bi";
import axios from "axios";
import { useNavigate,useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    // useform for get value inputs and handle error validation
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();

    //toggle password-------------------
    const [passwordShow, setPasswordshow] = useState(false)
    const togglePassword = () => {
        setPasswordshow(passwordShow ? false : true)
    }

    //axios for check username and pssword admin
    const navigate = useNavigate();
    const location = useLocation()
    const redirectaddress = location.state?.from.pathname || '/paneladmin';
    const onSubmit = (data) => {
        axios.post('http://localhost:3002/auth/login', data).then((res) => {
            if (res.status == 201 || 200) {
                toast.success("خوش اومدی ادمین عزیز")
                localStorage.setItem('token', res.data.token)
                navigate(redirectaddress, { replace: true })
            }
        }).catch((err) =>
            toast.error("نام کاربری یا رمز عبور اشتباه است"))
    }

    return (
        <div className="flex bg-gray-100 pt-40 pb-20">
            <div className="w-full max-w-sm m-auto bg-white rounded-lg border border-gray-300 p-5">
                <div>
                    <img className="w-20 mx-auto mb-5" src={logo} />
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="block mb-2" for="username">نام کاربری</label>
                    <input className='w-full p-2  border border-gray-400 rounded-lg bg-gray-100'
                        {...register("username", {
                            required: "نام کابری را وارد کنید"
                        })}
                    />
                    <ErrorMessage errors={errors} name="username" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>}/>
                    {/* ///// */}
                    <label className="block mb-2 mt-6" for="password">پسورد</label>
                    <div className="relative">
                        <input className='w-full p-2 border border-gray-400 rounded-lg bg-gray-100'
                            {...register("password", {
                                required: "پسورد خود را وارد کنید"
                            })}
                            type={passwordShow ? "text" : "password"}
                        />
                        <div className="absolute top-2 left-2 text-2xl text-gray-700" onClick={togglePassword}>
                            {passwordShow ? <BiLockOpen /> : <BiLock />}
                        </div>
                    </div>
                    <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>}
                    />
                    <input type="submit" className="w-full bg-yellow-400 font-bold py-2 px-4 my-6 rounded-lg" value="ورود" />
                </form>
                <div className='flex justify-between'>
                    <a className="text-indigo-700 hover:text-pink-700 text-sm float-left" href="#">رمز عبورم را فراموش کردم !</a>
                    <a className="text-indigo-700 hover:text-pink-700 text-sm float-right" href="#">ایجاد حساب جدید</a>
                </div>
            </div>
        </div>
    );
}
export default WithUser(Login)