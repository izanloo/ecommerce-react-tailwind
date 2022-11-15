import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { BiErrorCircle } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import DatePicker from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import DateObject from "react-date-object";
import WithUser from "../layouts/WithUser";


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
            <form onSubmit={handleSubmit(onSubmit)} className="pt-40 pb-10">
                <label className="block mb-2" for="firstName">نام</label>
                <input className=' p-2  border border-gray-400 rounded-lg bg-gray-100'{...register("firstName", { required: "نام خود را وارد کنید" })} />
                <ErrorMessage errors={errors} name="firstName" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />
               
                <label className="block mb-2" for="lastName">نام خانوادگی</label>
                <input className=' p-2  border border-gray-400 rounded-lg bg-gray-100'{...register("lastName", { required: "نام خود را وارد کنید" })} />
                <ErrorMessage errors={errors} name="lastName" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />

                <label className="block mb-2" for="address">آدرس</label>
                <input className=' p-2  border border-gray-400 rounded-lg bg-gray-100'{...register("address", { required: "نام خود را وارد کنید" })} />
                <ErrorMessage errors={errors} name="address" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />

                <label className="block mb-2" for="phone">شماره تماس</label>
                <input type="tel" className=' p-2  border border-gray-400 rounded-lg bg-gray-100'{...register("phone", { required: "نام خود را وارد کنید" })} />
                <ErrorMessage errors={errors} name="phone" render={({ message }) => <p className="text-red-700 pt-2 flex items-center"><BiErrorCircle />{message}</p>} />
               
                <label>تاریخ ارسال : </label>
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
                <input type="submit" value="ثبت" />
            </form>
        }
        </>
    )
}
export default WithUser(FormCustomer)