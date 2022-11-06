import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import WithUser from '../layouts/WithUser'
import logo from "../assest/images/logo.png"
import { BiErrorCircle } from "react-icons/bi";

function Login() {
    // useform for get value inputs and handle error validation
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm();
    const onSubmit = (data) => console.log(data);

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
                    <ErrorMessage
                        errors={errors}
                        name="username"
                        render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle/>{message}</p>}
                    />
                    {/* ///// */}
                    <label className="block mb-2 mt-6" for="password">پسورد</label>
                    <input className='w-full p-2 border border-gray-400 rounded-lg bg-gray-100'
                        {...register("password", {
                            required: "پسورد خود را وارد کنید"
                        })}
                    />
                     <ErrorMessage
                        errors={errors}
                        name="password"
                        render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle/>{message}</p>}
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