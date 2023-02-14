import Image from 'next/image'
import React, { useState } from 'react'

const Product = () => {
    const [index, setIndex] = useState(0)
    const iphoneCase = {
        id:1,
        img: "/images/iphone3.jpg",
        title:"Dark Castle",
        price:[19.99,24.99,34.99],
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, ut!"
    }

    

  return (
    <div className='w-full h-full lg:h-screen pt-[5rem] flex flex-col px-4 items-center justify-center lg:flex-row lg:items-start'>
        {/* left side */}
        <div className="flex-1 py-4">
            <div className="flex justify-center items-center">
                <Image src={iphoneCase.img} alt="case" width={400} height={400} className="rounded-3xl pt-4"/>
            </div>
        </div>
        {/* right side */}
        <div className="flex-1 flex flex-col gap-4 p-4 text-center text-gray-900 lg:text-left lg:py-4">
            <h1 className='text-3xl mt-2 font-semibold'>{iphoneCase.title}</h1>
            <span className='text-xl font-semibold'>${iphoneCase.price[index]}</span>
            <p className=''>{iphoneCase.desc}</p>
            <h3 className='text-xl font-semibold'>Choose your model:</h3>

            {/* choosing size */}

            <div className="flex gap-4 items-center justify-center py-4 lg:justify-start">
                <p className='bg-gray-900 text-white py-2 px-4 rounded-2xl cursor-pointer' onClick={()=>setIndex(0)}>Regular</p>
                <p className='bg-gray-900 text-white py-2 px-4 rounded-2xl cursor-pointer' onClick={()=>setIndex(1)}>Pro</p>
                <p className='bg-gray-900 text-white py-2 px-4 rounded-2xl cursor-pointer' onClick={()=>setIndex(2)}>Pro-Max</p>
            </div>

            {/* choose material */}

            <h3 className='text-xl font-semibold'>Select Your Material Type:</h3>
            <div className="flex justify-center items-center gap-4 lg:justify-start py-4">
                <div className="flex gap-1">
                    <input type="radio" name="material" id="glossy" value={'glossy'} className='w-[20px]'/>
                    <label htmlFor="glossy" className='text-xl font-semibold'>Glossy</label>
                </div>
                <div className="flex gap-1">
                    <input type="radio" name="material" id="matte" value={"matte"} className='w-[20px]'/>
                    <label htmlFor="matte" className='text-xl font-semibold'>Matte</label>
                </div>
                
            </div>

            {/* select amount */}
            <div className="flex items-center justify-center gap-4 lg:justify-start py-4">
                
                <label htmlFor="quantity" className='text-xl font-semibold'>Select Quantity</label>
                <input type="number" name="quantity" id="quantity" className='w-[35px] bg-gray-100'/>
            </div>

            <div className="">
                <button className='bg-gray-900 text-white py-4 px-8 rounded-full text-lg'>Add To Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Product