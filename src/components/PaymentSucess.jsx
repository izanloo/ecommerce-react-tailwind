import { Link } from "react-router-dom";
import imgFormCustomer from '../assest/images/imgFormCustomer.png'
export default function PaymentSucess(){
    return(
        <>
        <img src={imgFormCustomer} className="w-96"/>
        <h1 className="text-2xl font-bold text-green-500">با موفقت پرداخت شد</h1>
        <Link to='/' className="block">بازگشت به صفحه اصلی</Link>
        </>
    )
}