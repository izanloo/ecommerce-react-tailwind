import { useState } from "react";
import { BiShoppingBag, BiUserCircle, BiMenu, BiLogIn, BiRegistered, BiSearch } from "react-icons/bi";
import { Link } from "react-router-dom";
import logo from "../assest/images/logo.png"

import {
    Popover,
    PopoverHandler,
    PopoverContent,
} from "@material-tailwind/react";


export default function Navbar() {
    const links = ["گوشی موبایل", " لوازم جانبی", "ساعت  دستبند هوشمند", "تبلت", "هنذفری واسپیکر", "صوتی و تصویری"];
    let [menuOpen, setMenuOpen] = useState(false)

    const handleMenuClick = () => {
        setMenuOpen(!menuOpen)
    }

    const renderMenuCol = () => {
        return (
            <div className="flex flex-col bg-[#151414] text-[#CBCBCB]">
                {links.map(link => (
                    <a className="mr-6 font-bold hover:text-white">
                        {link.charAt(0).toUpperCase() + link.slice(1)}
                    </a>
                ))}
            </div>
        );
    }

    function renderMenuRow() {
        return (
            <div className=" hidden sm:block">
                {links.map((link, i) => (
                    <a className="mr-6 font-bold  hover:text-white hover:border-b text-base lg:text-xl cursor-pointer" key={i}>
                        {link.charAt(0).toUpperCase() + link.slice(1)}
                    </a>
                ))}
            </div>
        );
    }

    return (
        // bg-[#151414] text-[#CBCBCB]
        <header className="fixed z-10 bg-[#0046be] text-white w-full">
            <div className="grid-cols-3 gap-4 justify-between flex items-center px-1 md:px-20 py-3 border-b">
                <Link to='/'>
                    <img src={logo} alt="لوگو موبایل کده" className="logo" />
                </Link>
                <div className="w-full md:px-20">
                    <div className="border rounded-lg bg-white flex md:mr-4 w-full ">
                        <input type="text" className="px-4 py-1 md:py-2 rounded-lg w-full" placeholder="دنبال چی میگردی...؟" />
                        <button className="pl-4 text-2xl">
                            <BiSearch />
                        </button>
                    </div>
                </div>
                <div className="flex items-center">
                    {/* icon shop and user */}
                    <Link to='/cart' ><BiShoppingBag className="mx-3 hover:text-white text-3xl" /></Link>
                    <Popover placement="bottom">
                        <PopoverHandler className="hover:text-white text-3xl">
                            <button><BiUserCircle /></button>
                        </PopoverHandler>
                        <PopoverContent className="ml-2 py-2 rounded-md">
                            <Link to='/login' className="flex items-center px-2 hover:text-[#8C2973]"><BiLogIn className="ml-1" />ورود</Link>
                            <Link to='/' className="flex items-center px-2 hover:text-[#8C2973]"><BiRegistered className="ml-1" />ثبت نام</Link>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div className="py-2 text-center">
                {renderMenuRow()}
                <BiMenu onClick={handleMenuClick} className="text-indigo-200 hover:text-white text-2xl sm:hidden" />
            </div>
            {menuOpen && renderMenuCol()}
        </header>
    );

}

