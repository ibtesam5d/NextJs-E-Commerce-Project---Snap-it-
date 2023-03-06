import Image from 'next/image';
import React, { useState } from 'react'
import { MdCall } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { HiMenuAlt3 } from "react-icons/hi";
import logo from "../public/images/logo.png"
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Navbar = () => {

    const quantity = useSelector(state=>state.cart.quantity)

    const [nav, setNav] = useState(false)

    const handleNav = ()=>{
        setNav(!nav)
    }

  return (
    <nav className='fixed top-0 w-full bg-gray-900 text-white p-4 h-20 z-[999]'>
        <div className='flex justify-between items-center relative w-full h-full'>
            {/* =======logo======== */}
            <div className="relative">
                <Link href="/"><Image src={logo} alt="logo" width={70} height={70} className='object-contain'/></Link>
                
            </div>

            {/* =======order======== */}
            <div className="flex items-center justify-between w-[140px] md:w-[150px]">
                <div className='bg-white rounded-full p-1 cursor-pointer'>
                    <MdCall className='text-gray-900' size={25}/>
                </div>
                <div className='text-base sm:text-lg'>
                    <p className=''>Order Now!</p>
                    <p className=''>1 234 5678</p>
                </div>
            </div>

            {/* ======= lg device nav links ======== */}
            <div className="hidden text-white lg:flex">
                <ul className='flex justify-between items-center w-[400px]'>
                    <li><Link href={"/"}>Home</Link></li>
                    <li>Shop</li>
                    <li>Orders</li>
                    <li><Link href={"/admin"}>Admin</Link></li>
                </ul>
            </div>

            {/* =======cart button======== */}
            <div className="bg-white rounded-full p-1 cursor-pointer relative">
                <Link href={"/cart"}>
                <BsCart3 className='text-gray-900 ' size={25} />
                </Link>

                {/* == quantity == */}
                <div className="absolute top-[-15px] left-[20px] bg-red-500 text-white rounded-full font-bold text-base px-2">{quantity}</div>
            </div>

            {/* =======menu button======== */}
            <div className="lg:hidden cursor-pointer z-[102]" onClick={handleNav}>
                <HiMenuAlt3 size={25}/>
            </div>

            {/* ======= nav links ======== */}
            <div className={nav? "lg:hidden fixed top-0 left-0 text-white bg-gray-900/90 w-full h-screen flex-col z-[100] px-4 py-7 ease-in-out duration-300": "absolute top-0 h-full right-[-100%]"}>
            <ul className='flex flex-col w-full h-full justify-center items-center'>
                    <li onClick={()=>setNav(false)}><Link href={"/"}>Home</Link></li>
                    <li>Shop</li>
                    <li>About</li>
                    <li onClick={()=>setNav(false)}><Link href={"/admin"}>Admin</Link></li>
                </ul>
            </div>
            
        
        </div>
        
    </nav>
  )
}

export default Navbar