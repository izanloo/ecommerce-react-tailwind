import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import SidebarAdmin from '../components/Admin/SidebarAdmin'

export default function WithAdmin(Component) {

    return function Layout({ ...props }) {
        return (
            <>
                <Navbar />
                <div className='pt-28'>
                
                </div>
                <div className='flex'>
                <SidebarAdmin/>
                    <Component {...props} />
                </div>

                <Footer />
            </>
        )
    }
}