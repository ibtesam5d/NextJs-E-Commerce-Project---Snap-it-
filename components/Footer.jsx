import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {BsFacebook, BsInstagram,BsTwitter,BsPinterest} from "react-icons/bs"

const Footer = () => {
  return (
    <div className="bg-gray-900 p-4 text-white">
    <div className='w-full flex flex-col justify-center items-center lg:px-6  gap-4 lg:flex-row lg:justify-between'>
      <div className="flex flex-col justify-center items-center">
        <Image src="/images/logo.png" width={80} height={80} />
        <p className='uppercase text-lg font-semibold'>Best Iphone Cases Ever!</p>
      </div>
      
      <div className="py-4 text-center flex flex-col gap-1">
        <Link href="#">HOME</Link>
        <Link href="#">SHOP</Link>
        <Link href="#">POLICY</Link>
        <Link href="#">REFUNDS</Link>
        <Link href="#">ORDERS</Link>
      </div>
      <div className="py-4 text-center flex flex-col gap-1">
        <Link href="#">ABOUT US</Link>
        <Link href="#">CONTACT US</Link>
        <Link href="#">MATERIALS</Link>
        <Link href="#">WARRANTY</Link>
        <Link href="#">REVIEWS</Link>
      </div>

      <div className="text-center mb-2">
        <p className='uppercase pb-2'>Tag Us Here</p>
        <div className="flex gap-4 pt-2">
        <BsFacebook size={25} className="cursor-pointer"/>
        <BsInstagram size={25} className="cursor-pointer"/>
        <BsPinterest size={25} className="cursor-pointer"/>
        <BsTwitter size={25} className="cursor-pointer"/>
        </div>

        
        
      </div>
      
    </div>
    <hr className='color-white w-full my-4'/>
      <div className="text-center">
        <p> Copyright &copy; 2023. All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer