import Image from 'next/image'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '@/redux/cartSlice';
import CashOrder from '@/components/CashOrder';





const Cart = () => {
    const cart = useSelector((state)=> state.cart)
    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()

    // This values are the props in the UI
    const amount = cart.total;
    const currency = "USD";
    const style = {"layout":"vertical"};

    const createOrder = async (data)=>{

        try {
            const res = await axios.post("http://localhost:3000/api/orders", data)

            res.status === 201 && router.push("/orders/" + await res.data._id)
            setOpen(false)
            dispatch(reset())
        } catch (error) {
            console.log(error)
        }

    }

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
   
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={{
                    layout:"vertical",
                    color:"blue"
                }}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping

                        createOrder({
                            customer:shipping.name.full_name,
                            address:shipping.address.address_line_1,
                            total:cart.total,
                            method:1,

                        })
                    });
                }}
            />
        </>
    );
    }

    
    
  return (
    <div className='h-full mb-[6.9rem] w-full text-gray-900 mt-[5rem] flex justify-between flex-col px-[10px] py-[40px] lg:flex-row lg:mb-[14rem]'>
        {/* left side */}
        
        <div className="flex-1 flex flex-col gap-4 mb-4 px-4">
            <h1 className='font-bold uppercase text-2xl sm:text-3xl lg:text-4xl mb-2 text-center'>Your Cart Items</h1>

            {/*====== items ======*/}

        {cart.products.map((product)=>(
            <div key={product._id} className="flex flex-col items-center gap-4 lg:flex-row lg:gap-4 lg:flex-grow-0">

            <div className="object-contain">
                <Image src={product.image} width={100} height={100} alt="iphone" className='rounded-xl' />
            </div>
            <p className='font-medium text-lg'>{product.title}</p>
            <p><span className='font-semibold'>Material:</span> {product.materialType}</p>
            <p><span className='font-semibold'>Size:</span> {product.size}</p>
            <p><span className='font-semibold'>Amount:</span> {product.amount}</p>
            <p><span className='font-semibold'>Price:</span> ${product.price * product.amount}</p>
        </div>
        ))}
        
            
            
           
            
        </div> 

            
           
   

        {/* right side - cart total */}
        <div className="flex-2 mx-auto px-0 w-full max-w-[400px] lg:px-0">
            <div className="flex flex-col justify-between h-full bg-gray-900 text-white p-4 md:p-6">
                <h2 className='text-3xl font-semibold mb-2 text-center'>Cart Total</h2>
                <div className="">
                    <strong  className='mr-2'>Sub-total:</strong>${cart.total}
                </div>
                <div className="">
                    <strong className='mr-2'>Discount:</strong>$0
                </div>
                <div className="">
                    <strong className='mr-2'>Total:</strong> ${cart.total}
                </div>

{/* ======= Checkout Button with Paypal ========== */}

                {open ? (<div className='h-full max-w-[400px]'> 

                <button className='bg-white text-gray-900 mt-2 py-2 px-4 w-full rounded-md font-medium uppercase mb-4' onClick={()=>setCash(true)}>Cash On Delivery</button>    
                <PayPalScriptProvider className="max-w-[400px]"
                options={{
                    "client-id": "AX3P9ytZ8Tho6zA3nWTUOVKIdT5sjJwAak4Ng8pr3zZCjw-2zNbcigQdtowuvGumViGX3T8V_S7Mc1Lb",
                    components: "buttons",
                    currency: "USD",
                    "disable-funding":"card,p24",
                }}
            >
				<ButtonWrapper
                    currency={currency}
                    showSpinner={false}
                />
			    </PayPalScriptProvider></div>): (<button className='bg-white text-gray-900 mt-2 py-2 px-4 w-full rounded-md font-medium uppercase' onClick={()=>setOpen(true)}>Checkout</button>)}

                

                

            </div>
        </div>

        {cash && <CashOrder total={cart.total} createOrder={createOrder}/>}
    </div>
  )
}

export default Cart