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
import PanelAdmin from '../pages/PanelAdmin';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

export default function AppRoute() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* -----------public pages--------------- */}
                    <Route path={PATHS.HOME} element={<Home />} />
                    <Route path={PATHS.LOGIN} element={<PublicRoute element={<Login />} />} />
                    <Route path={PATHS.Details} element={<Details />} />
                    <Route path={PATHS.Category} element={<Category />} />
                    <Route path={PATHS.Cart} element={<Cart />} />
                    <Route path={PATHS.FormCustomer} element={<FormCustomer/>} />
                    <Route path={PATHS.Payment} element={<Payment/>} />

                    {/* ----------protected pages admin----------------------------- */}
                    <Route path={PATHS.PanelAdmin} element={<ProtectedRoute element={<PanelAdmin/>} />} />

                    <Route path='*' element={<Notfound/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

