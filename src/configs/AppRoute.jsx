import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { PATHS } from './routes.config';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Details from '../pages/Details';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Category from '../pages/Category';
import Cart from '../pages/Cart';

export default function AppRoute() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* -----------public pages--------------- */}
                    <Route path={PATHS.HOME} element={<Home />} />
                    <Route path={PATHS.LOGIN} element={<Login />} />
                    <Route path={PATHS.Details} element={<Details/>} />
                    <Route path={PATHS.Category} element={<Category/>} />
                    <Route path={PATHS.Cart} element={<Cart/>} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

