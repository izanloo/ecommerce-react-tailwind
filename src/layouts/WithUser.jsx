import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar';

export default function(Component){
    const currentPath = window.location;
    const categoryPath = '/category';

    var sentence = "This is my Hello World and I like widgets."

    // if (categoryPath.indexOf('category') >= 0) { 
    //     console.log('Yes');
    //   } else { 
    //     console.log('No');
    //   }
    // console.log(currentPath)
    return function UserLayout({...props}){
        return(
            <>
            <Navbar/>
            <div className='flex'>
            <div className='pt-40'>
            {(currentPath.pathname).indexOf(categoryPath) >=0 ? <Sidebar/> : null}
            </div>
            <Component {...props} />
            </div>
            <Footer/>
            </>
        )
    }
}