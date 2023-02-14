import Image from 'next/image'
import React from 'react'

const IphoneCard = () => {
  return (
    <div className='p-4 lg:w-[30%] lg:text-center'>
        <Image src="/images/iphone2.jpg" width={500} height={500} className="rounded-3xl" />
        <p className='text-lg pt-2'>$24.99</p>
        <h2 className='text-2xl font-medium'>Cyberpunk Skyscraper</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, ut!</p>
    </div>
  )
}

export default IphoneCard