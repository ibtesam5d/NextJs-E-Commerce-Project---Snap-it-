import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const IphoneCard = ({iphoneCase}) => {
  return (
    <div className='mx-auto p-4 lg:w-[30%] lg:text-center'>
      <Link className='mx-auto' href={`/product/${iphoneCase._id}`}><Image src={iphoneCase.image} width={500} height={500} alt="iphone-case" className="rounded-3xl" /></Link>
        
        <p className='text-lg pt-2'>${iphoneCase.prices[0]}</p>
        <h2 className='text-2xl font-medium'>{iphoneCase.title}</h2>
        <p className='max-w-[500px]'>{iphoneCase.desc}</p>
    </div>
  )
}

export default IphoneCard