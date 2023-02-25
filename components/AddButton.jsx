import Link from 'next/link'
import React from 'react'

const AddButton = ({setClose}) => {
  return (
    <div className='py-4 flex justify-center gap-4'>
        <button className='bg-gray-900 text-white px-6 py-2 rounded-md' onClick={()=>setClose(false)}>Add New Product</button>
        <Link href={"/admin"} className='bg-gray-900 text-white px-6 py-2 rounded-md' >Admin</Link>
    </div>
  )
}

export default AddButton