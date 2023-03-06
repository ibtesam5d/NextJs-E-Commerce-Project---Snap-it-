import {MdReceiptLong,MdMapsHomeWork} from "react-icons/md"
import {AiFillCheckCircle,AiFillCar} from "react-icons/ai"
import {BiTimeFive} from "react-icons/bi"
import axios from "axios"

const Orders = ({order}) => {
  return (
    <div className='h-full lg:h-screen mb-16 w-full text-gray-900 mt-[5rem] flex justify-between flex-col p-[30px] lg:flex-row'>
        {/* left */}
        <div className="flex-1 sm:text-xl">
            {/* 1st row - order info */}
            <div className="">
            
                <div className="text-center">
                    <p className="py-2"><span className="font-semibold"> Order Id:</span> {order._id}</p>
                    <p className="py-2"><span className="font-semibold"> Customer:</span> {order.customer} </p>
                    <p className="py-2"><span className="font-semibold"> Address:</span> {order.address}</p>
                    <p className="py-2"><span className="font-semibold"> Total:</span> ${order.total}</p>
                </div>
            </div>
            {/* 2nd row - status */}
            <div className="mt-8 flex flex-col justify-between items-center gap-6 p-8 lg:flex-row lg:text-sm lg:gap-2 xl:text-lg">
                <div className="flex relative items-center">
                    <MdReceiptLong size={40} />
                    <span className="text-semibold">Payment</span>
                    
                    <AiFillCheckCircle size={20} className="absolute bottom-7 left-[-8px] text-green-700 "/>
                </div>
                <div className="flex relative items-center animate-pulse">
                    <BiTimeFive size={40} />
                    <span className="text-semibold">Preparing</span>
                    
                    <AiFillCheckCircle size={20} className="absolute bottom-7 left-[-8px] text-green-700 "/>
                </div>
                <div className="flex relative items-center opacity-[0.3]">
                    <AiFillCar size={40} />
                    <span className="text-semibold">On the way</span>
                    
                    <AiFillCheckCircle size={20} className="absolute bottom-7 left-[-8px] text-green-700 "/>
                </div>
                <div className="flex relative items-center opacity-[0.3]">
                    <MdMapsHomeWork size={40} />
                    <span className="text-semibold">Delivered</span>
                    
                    <AiFillCheckCircle size={20} className="absolute bottom-7 left-[-8px] text-green-700 "/>
                </div>
            </div>
        </div>
        {/* right - cart total */}
        <div className="flex-2 mx-auto px-4 w-full lg:px-0 max-w-[400px]">
            <div className="flex flex-col justify-between max-h-[300px] bg-gray-900 text-white p-8">
                <h2 className='text-3xl font-semibold mb-2 text-center'>Cart Total</h2>
                <div className="">
                    <strong  className='mr-2'>Sub-total:</strong>${order.total}
                </div>
                <div className="">
                    <strong className='mr-2'>Discount:</strong>$0
                </div>
                <div className="">
                    <strong className='mr-2'>Total:</strong>${order.total}
                </div>

                <button disabled className='bg-white text-teal-500 mt-2 py-2 px-4 w-full rounded-xl font-bold uppercase'>{order.method === 0 ? "Cash On Delivery" : "PAID"}</button>

            </div>
        </div>
    </div>
  )
}

export default Orders   


export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`/api/orders/${params.id}`);

    
  
    return {
      props: {
        order: await res.data,
      },
    };
  };