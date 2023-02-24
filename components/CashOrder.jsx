import React, { useState } from 'react'
import axios from 'axios'

const CashOrder = ({total, createOrder}) => {
    const [customer, setCustomer] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")

    const handleClick = ()=>{
        createOrder({customer,total,address,method:0})
    }    
        
   


  return (
    <div className='flex items-center justify-center absolute top-0 left-0 bg-gray-900/60 h-full w-full z-[998]'>
        <div className="text-gray-900 bg-white flex flex-col gap-2 justify-center items-center p-4 rounded-md sm:p-20">
            <h1 className='text-lg font-bold sm:text-2xl mb-4'>You will pay {total} after delivery</h1>

        {/* ====== INPUTS ======== */}

            <div className="flex flex-col w-full mb-2 gap-2">
                <label className='text-sm' htmlFor="customerName">Full Name</label>
                <input className='border-gray-900 border-2 rounded-sm' type="text" id='customerName' placeholder='John Doe'
                onChange={(e)=>setCustomer(e.target.value) } />
            </div>
            <div className="flex flex-col w-full mb-4 gap-2">
                <label className='text-sm' htmlFor="phone">Phone Number</label>
                <input className='border-gray-900 border-2 rounded-sm' type="tel" id='phone' placeholder='123 456 7891'
                onChange={(e)=>setPhone(e.target.value) } />
            </div>
            <div className="flex flex-col w-full mb-4 gap-2">
                <label className='text-sm' htmlFor="address">Address</label>
                <input className='border-gray-900 border-2 rounded-sm' type="text" id='address' placeholder='1st St SE'
                onChange={(e)=>setAddress(e.target.value) } />
            </div>
            <button className='bg-gray-900 text-white mt-2 py-2 px-4 w-full rounded-md font-medium uppercase' onClick={handleClick}>Order</button>
        </div>
    </div>
  )
}

export default CashOrder