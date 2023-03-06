import { addProduct } from '@/redux/cartSlice'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const Product = ({iphoneCase}) => {
    const [price, setPrice] = useState(iphoneCase.prices[0])
    const [materialType, setMaterialType] = useState("Matte")
    const [size, setSize] = useState("Regular")
    const [amount, setAmount] = useState("1")

    const dispatch = useDispatch()

    

    const handleSize = (sizeIndex)=>{
        // const difference = iphoneCase.prices[sizeIndex] - iphoneCase.prices[index]

        // setIndex(sizeIndex)
        // changePrice(difference)

        if(sizeIndex === 0){
            setSize("Regular")
        }
        if(sizeIndex === 1){
            setSize("Pro")
        }
        if(sizeIndex === 2){
            setSize("Pro-Max")
        }

        setPrice(iphoneCase.prices[sizeIndex])
    }

    const handleChange = (e,material)=>{
        const checked = e.currentTarget.checked

        if(checked){
            setMaterialType(material.text)
        }
        
    }

    const handleCartClick = ()=>{
       dispatch(addProduct({...iphoneCase, price, size, amount, materialType}))
        
    }


  return (
    <div className='w-full h-full lg:h-screen pt-[5rem] flex flex-col px-4 items-center justify-center lg:flex-row lg:items-start'>
        {/* left side */}
        <div className="flex-1 py-4">
            <div className="flex justify-center items-center">
                <Image src={iphoneCase.image} alt="case" width={400} height={400} className="rounded-3xl pt-4"/>
            </div>
        </div>
        {/* right side */}
        <div className="flex-1 flex flex-col gap-4 p-4 text-center text-gray-900 lg:text-left lg:py-4">
            <h1 className='text-3xl mt-2 font-semibold'>{iphoneCase.title}</h1>
            <span className='text-xl font-semibold'>${price}</span>
            <p className=''>{iphoneCase.desc}</p>
            <h3 className='text-xl font-semibold'>Choose your model:</h3>

            {/* choosing size */}

            <div className="flex gap-4 items-center justify-center py-4 lg:justify-start">
                <p className='bg-gray-900 text-white py-2 px-4 rounded-2xl cursor-pointer' onClick={()=>handleSize(0)}>Regular</p>
                <p className='bg-gray-900 text-white py-2 px-4 rounded-2xl cursor-pointer' onClick={()=>handleSize(1)}>Pro</p>
                <p className='bg-gray-900 text-white py-2 px-4 rounded-2xl cursor-pointer' onClick={()=>handleSize(2)}>Pro-Max</p>
            </div>

            {/* choose material */}

            <h3 className='text-xl font-semibold'>Select Your Material Type:</h3>

            {/* ====== Material Options ===== */}
            <div className="flex justify-center items-center gap-4 lg:justify-start py-4">

            {iphoneCase.materialType.map((material)=>{
                return(
                <div className="flex gap-1" key={material._id}>
                    <input type="radio" name="material" id={material.text} value={material.text} className='w-[20px]'
                    onClick={(e)=> handleChange(e,material)}/>
                    <label htmlFor={material.text} className='text-xl font-semibold'>{material.text}</label>
                </div>
                )
            })}
            </div>

            {/* select amount */}
            <div className="flex items-center justify-center gap-4 lg:justify-start py-4">
                
                <label htmlFor="quantity" className='text-xl font-semibold'>Select Quantity</label>
                <input type="number" name="quantity" id="quantity" className='w-[35px] bg-gray-100' onChange={(e)=> setAmount(e.target.value)}/>
            </div>

        {/* ====== Add To Cart Button ====== */}

            <div>
                <button className='bg-gray-900 text-white py-4 px-8 rounded-full text-lg' onClick={handleCartClick}>Add To Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Product

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`https://snap-it.vercel.app/api/products/${params.id}`);
  
    return {
      props: {
        iphoneCase: await res.data,
      },
    };
  };