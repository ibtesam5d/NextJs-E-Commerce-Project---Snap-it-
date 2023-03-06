
import dbConnect from "@/lib/mongo";
import Order from "@/models/Order";
import Product from "@/models/Product";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";


const Index = ({productList, orderList}) => {
    const [products, setProducts] = useState(productList)
    const [orders, setOrders] = useState(orderList)
    const status = ["preparing", "on the way", "delivered"]
   
    

    const handleDelete = async(id)=>{
        try {
            const res = await axios.delete("/api/products/"+id)
            setProducts(products.filter(product=> product._id !== id))
        } catch (error) {
            console.log(error);
        }
    }

    const handleStatus = async (id)=>{
        const currentItem = orders.filter(order=> order._id === id)[0]
        

        try {
            
            const res = await axios.put("/api/orders/"+id,{
                status:currentItem.status === 2 ? 0 : currentItem.status+1,
            })
            setOrders([
                res.data,
                ...orders.filter(order=>order._id !== id)
            ])
        } catch (error) {
            console.log(error);
        }
    }


  return (

        <div className='h-full mb-[6.9rem] w-full text-gray-900 mt-[5rem] flex justify-between flex-col px-[10px] py-[40px] xl:flex-row 2xl:p-[50px]'>
        
        {/* Left Side - Products */}
            <div className="lg:w-full flex flex-col gap-4 mb-20 px-4">
                <h1 className='font-bold uppercase text-2xl sm:text-3xl lg:text-4xl mb-2 text-center'>Products</h1>

            {/*====== items ======*/}
            {products.map((product)=>{
                return(<div key={product._id} className="flex flex-col items-center gap-4 xl:flex-row lg:gap-4 xl:flex-grow-0 mb-6">

                <div className="object-contain">
                    <Image src={product.image} width={100} height={100} alt="iphone" className='rounded-xl' />
                </div>
                <p className='font-medium text-lg'>{product.title}</p>
                <p><span className='font-semibold'>id</span>{product._id.slice(0,5)}</p>

                <p><span className='font-semibold'>Price:</span> ${product.prices[0]}</p>
                <div className="flex gap-4">
                    <button className="py-2 px-4 text-white bg-teal-500 rounded-md">Edit</button>
                    <button className="py-2 px-4 text-white bg-red-500 rounded-md" onClick={()=>handleDelete(product._id)}>Delete</button>
                </div>
            </div>)
            })}
                
                
         
        
            </div>
            

        {/* Right Side - Orders */}

            <div className="lg:w-full flex flex-col gap-6 mb-4 px-4">
                <h1 className='font-bold uppercase text-2xl sm:text-3xl lg:text-4xl lg:mb-8 text-center'>Orders</h1>

            {/*====== items ======*/}

            {orders.map((order)=>{
                return(<div key={order._id} className="flex flex-col items-center gap-4 xl:flex-row lg:gap-4 xl:flex-grow-0 mb-6">

                <p><span className='font-semibold'>id</span>{order._id.slice(0,5)}</p>
                <p className='font-medium text-lg'>{order.customer}</p>
                

                <p><span className='font-semibold'>Total Price:</span> ${order.total}</p>
                <p><span className='font-semibold'>Payment Method:</span> {order.method === 0 ? "Cash" : "Card"}</p>
                <p><span className='font-semibold'>Status:</span> {status[order.status]}</p>
                <div className="flex gap-4">
                    <button className="py-2 px-4 text-white bg-teal-500 rounded-md" onClick={()=>handleStatus(order._id)}>Next Phase</button>
                    
                </div>
            </div>)
            })}

                
               
                
         
        
            </div>
            
           
            
        </div>
    
  )
}
    
   

export default Index;


export const getServerSideProps = async (context) => {

    const myCookie = context.req?.cookies || ""

    if(myCookie.token !== process.env.TOKEN){
        return{
            redirect:{
                destination:"/admin/login",
                permanent: false
            }
        }
    }


    try {
        console.log("connecting to database");
    
        dbConnect();
    
        console.log("connected to database");
    
        console.log("fetching data");
    
        const products = await Product.find();
        const orders = await Order.find();
    
        console.log("fetched data");
    
        return {
          props: {
            productList: JSON.parse(JSON.stringify(products)),
            orderList: JSON.parse(JSON.stringify(orders)),
            
          },
        };
      } catch (error) {
        console.log(error);
        return {
          notFound: true,
        };
      }
  };