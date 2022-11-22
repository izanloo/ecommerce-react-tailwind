import { Link } from 'react-router-dom'
import imgPaymentCancel from '../assest/images/imgPaymentCancel.png'

export default function PaymentCancel(){
    return(
        <>
        <h1 className='w-full text-center text-3xl'>پرداخت شما کنسل شد</h1>
        <Link to='/cart' className='block text-xl w-full text-center' replace={true}>بازگشت به صفحه سبد خرید</Link>
        <div className='flex justify-center'>
<img src={imgPaymentCancel} alt="img payment cencel" className='h-96'/>
        </div>
        </>
    )
}