import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar';

export default function (Component) {
    const currentPath = window.location;
    const categoryPath = '/category';

    return function UserLayout({ ...props }) {
        return (
            <>
                <Navbar />
                    <div>
                        {(currentPath.pathname).indexOf(categoryPath) >= 0 ? 
                        <div className='flex pt-20'><Sidebar /><Component {...props} /></div> : <Component {...props} />}
                    </div>
                
                <Footer />
            </>
        )
    }
}