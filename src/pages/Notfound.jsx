import WithUser from "../layouts/WithUser"
import notfound from '../assest/images/404.webp'
function Notfound(){
    return(
        <>
        <img src={notfound} />
        </>
    )
}
export default WithUser(Notfound)