import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PATHS } from '../configs/routes.config';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Details from '../pages/Details';
import Category from '../pages/Category';
import Cart from '../pages/Cart';
import FormCustomer from '../pages/FormCustomer';
import Payment from '../pages/Payment';
import Notfound from '../pages/Notfound';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import PanelAdmin from '../pages/Admin/PanelAdmin';
import Orders from '../pages/Admin/Orders';
import Inventory from '../pages/Admin/Inventory';

export default function AppRoute() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* -----------public pages---------------------------------- */}
                    <Route element={<PublicRoute />}>
                        <Route path={PATHS.HOME} element={<Home />} />
                        <Route path={PATHS.Details} element={<Details />} />
                        <Route path={PATHS.Category} element={<Category />} />
                        <Route path={PATHS.Cart} element={<Cart />} />
                        <Route path={PATHS.FormCustomer} element={<FormCustomer />} />
                        <Route path={PATHS.Payment} element={<Payment />} />
                    </Route>

                    {/* ----------protected pages (rol: admin,user)--------------- */}
                    <Route element={<ProtectedRoute />}>
                        <Route path={PATHS.PanelAdmin} element={<PanelAdmin />} />
                        <Route path={PATHS.Orders} element={<Orders/>}/>
                        <Route path={PATHS.Inventory} element={<Inventory/>}/>
                    </Route>

                    {/*----------private Route------------------------------------- */}
                    <Route element={<PrivateRoute />}>
                        <Route path={PATHS.LOGIN} element={<Login />} />
                    </Route>

                    <Route path='*' element={<Notfound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

