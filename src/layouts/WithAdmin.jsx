import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Orders from '../components/Admin/Orders'

export default function WithAdmin (Component) {


    return function Layout({ ...props }) {
        return (
            <>
                <Navbar />
                <Orders/>
                    <div>
                       <Component {...props} />
                    </div>
                
                <Footer />
            </>
        )
    }
}