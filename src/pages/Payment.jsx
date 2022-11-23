import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetProduct, UpdateProduct } from '../apies/GetProducts'
import PaymentCancel from '../components/PaymentCancel'
import WithUser from "../layouts/WithUser";
import { AddOrders } from '../apies/Orders'
import PaymentSucess from "../components/PaymentSucess";


function Payment() {
    const [searchParams, setSearchParams] = useSearchParams()
    const dateNumber = +new Date()
    const navigate = useNavigate();

    // get info customer and order from localStorage-----------------
    let customer = JSON.parse(localStorage.getItem('customer'))
    let products = JSON.parse(localStorage.getItem('cart'))
    let purchaseTotal = JSON.parse(localStorage.getItem('purchaseTotal'))

    useEffect(() => {
        if (searchParams.get("status") == 'sucsess') {
            return () => postOrders()
        }
    }, [])

    //post info customer and orsders----------------------------------
    const postOrders = () => {
        if (products == null) {
            navigate('/')
        }
        else {
            let check = false;
            let customerDetail = {
                "firstName": customer.firstName,
                "lastName": customer.lastName,
                "address": customer.address,
                "phone": customer.phone
            }
            let info = {
                customerDetail,
                orderItems: products,
                orderStatus: "1",
                delivery: customer.deliveryDate,
                purchaseTotal: purchaseTotal,
                orderDate: dateNumber,
            }
            products.map(item => {
                GetProduct(item.id).then((res) => {
                    if (res.status == 200) {
                        const data = res.data;
                        data.count -= parseInt(item.count)
                        UpdateProduct(item.id, data).then((res) => {
                            if (res.status == 200) {
                                check = true;
                            }
                        })
                    }
                })
            })
            if (check = true) {
                AddOrders(info).then((res) => {
                    if (res.status == 201) {
                        localStorage.removeItem('customer')
                        localStorage.removeItem('cart')
                        localStorage.removeItem('purchaseTotal')
                    }
                })
            }
        }
    }
    return (
        <div className="pt-40 flex flex-col items-center">
            {searchParams.get("status") == 'sucsess' ? <PaymentSucess/> : <PaymentCancel />}
        </div>
    )
}
export default WithUser(Payment)