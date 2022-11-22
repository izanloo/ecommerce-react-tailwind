import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { BiErrorCircle } from "react-icons/bi";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object";
import WithUser from "../layouts/WithUser";
import imgFormCustomer from '../assest/images/imgFormCustomer.png'


function FormCustomer() {
    let cartLocalstorage = localStorage.getItem('cart')
    const [dateValue, setDateValue] = useState(new Date());

    // useform for get value inputs and handle error validation
    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data) => {
        let arr = data
        let deliveryDate = new DateObject({ date: dateValue }).format("YYYY/MM/DD")
        let dataCustomer = { ...arr, deliveryDate }
        localStorage.setItem('customer', JSON.stringify(dataCustomer))
        window.location.replace("http://localhost:3000/dargah.html");
    }
    return (
        <>
            {cartLocalstorage == undefined ? <div className="pt-40">هیچ محصولی برای خرید انتخاب نکرده اید</div> :
                <div className="md:grid md:grid-cols-2 lg:grid-flow-col lg:grid-cols-3 xl:grid-cols-4 lg:gap-3 pt-40 pb-10 justify-center  bg-[#e5e5e5] px-5">
                    <form onSubmit={handleSubmit(onSubmit)} className="border bg-[#FBF6F6] rounded-lg px-5 flex flex-col items-center py-5  ">
                        <div className="relative w-full">
                            <label className="absolute mr-3 block" for="firstName" >نام</label>
                            <input className='p-2 mt-3 border rounded-lg w-full'{...register("firstName", { required: "نام خود را وارد کنید" })} />
                            <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />
                        </div>

                        <div className="relative w-full mt-4">
                            <label className="absolute mr-3 block" for="lastName">نام خانوادگی</label>
                            <input className='mt-3 p-2 border rounded-lg w-full'{...register("lastName", { required: "نام خود را وارد کنید" })} />
                            <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />
                        </div>
                        <div className="relative w-full mt-4">
                            <label className="absolute mr-3 block" for="address">آدرس</label>
                            <input className='mt-3 p-2 border rounded-lg w-full'{...register("address", { required: "نام خود را وارد کنید" })} />
                            <ErrorMessage errors={errors} name="address" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />
                        </div>

                        <div className="relative w-full mt-4">
                            <label className="absolute mr-3 block" for="phone">شماره تماس</label>
                            <input type="tel" className='mt-3 p-2  border rounded-lg w-full'{...register("phone", { required: "نام خود را وارد کنید" })} />
                            <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />
                        </div>
                        <div className="relative w-full mt-4">

                        <label className="absolute mr-3 mb-5 block">تاریخ ارسال : </label>
                        <div style={{ direction: "rtl" }}>
                            <DatePicker
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                value={dateValue}
                                onChange={setDateValue}
                                minDate={new DateObject({ calendar: persian })}
                            />
                        </div>
                        </div>
                        <input type="submit" value="ثبت" className="bg-[#8C2973] w-full text-white text-xl p-2 rounded-lg mt-5" />
                    </form>
                    <div  className="hidden md:block">
                        <img src={imgFormCustomer} alt="img form customer" className="h-96" />
                    </div>
                </div>
            }
        </>
    )
}
export default WithUser(FormCustomer)