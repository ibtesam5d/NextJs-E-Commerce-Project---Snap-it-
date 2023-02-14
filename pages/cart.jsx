import Image from 'next/image'
import React from 'react'

const Cart = () => {
  return (
    <div className='h-full lg:h-screen mb-10 w-full text-gray-900 mt-[5rem] flex justify-between flex-col p-[50px] lg:flex-row'>
        {/* left side */}
        
        <div className="flex-1 flex flex-col gap-4 mb-4 px-8">
            <h1 className='font-bold uppercase text-2xl sm:text-3xl lg:text-4xl mb-2 text-center'>Your Cart Items</h1>
            {/* items */}
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:gap-8">
                <div className="object-contain">
                    <Image src="/images/iphone2.jpg" width={100} height={100} alt="iphone" className='rounded-xl' />
                </div>
                <p className='font-medium text-lg'>Dark Castle</p>
                <p><span className='font-semibold'>Material:</span> Glossy</p>
                <p><span className='font-semibold'>Size:</span> Regular</p>
                <p><span className='font-semibold'>Amount:</span> 1</p>
                <p><span className='font-semibold'>Price:</span> $19.99</p>
            </div>
            
           
            
        </div> 

            
           
   

        {/* right side - cart total */}
        <div className="flex-2 mx-auto px-4 w-full max-w-[400px] lg:px-0">
            <div className="flex flex-col justify-between max-h-[300px] bg-gray-900 text-white p-8">
                <h2 className='text-3xl font-semibold mb-2 text-center'>Cart Total</h2>
                <div className="">
                    <strong  className='mr-2'>Sub-total:</strong>$24.99
                </div>
                <div className="">
                    <strong className='mr-2'>Discount:</strong>$0
                </div>
                <div className="">
                    <strong className='mr-2'>Total:</strong>$24.99
                </div>

                <button className='bg-white text-gray-900 mt-2 py-2 px-4 w-full rounded-xl font-medium uppercase'>Checkout</button>

            </div>
        </div>
    </div>
  )
}

export default Cart