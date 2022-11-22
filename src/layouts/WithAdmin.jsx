import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function WithAdmin(Component) {

    return function Layout({ ...props }) {
        return (
            <>
                <Navbar />
                <div className='pt-32 text-xl font-bold'>
                <Link to='/panelAdmin' className='mx-2'>تمام محصولات</Link>
                <Link to='/orders' className='mx-2'>سفارشات</Link>
                <Link to='/inventory'>مدیریت موجودی و قیمت</Link>
                </div>
                <div>
                    <Component {...props} />
                </div>

                <Footer />
            </>
        )
    }
}