import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function WithAdmin(Component) {

    return function Layout({ ...props }) {
        return (
            <>
                <Navbar />
                <div className='pt-32'>
                <Link to='/panelAdmin'>تمام محصولات</Link>
                <Link to='/orders'>سفارشات</Link>
                </div>
                <div>
                    <Component {...props} />
                </div>

                <Footer />
            </>
        )
    }
}