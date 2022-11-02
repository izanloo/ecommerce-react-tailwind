import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function(Component){
    return function UserLayout({...props}){
        return(
            <>
            <Navbar/>
            <Component {...props} />
            <Footer/>
            </>
        )
    }
}