
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Login = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [error, setError] = useState(false)
    const router = useRouter()

    const handleClick = async()=>{
        try {
            await axios.post("/api/login",{
                username,password
            })
            router.push("/admin")
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }


  return (
    <div className='h-screen p-[50px] flex items-center justify-center'>
        <div className=" bg-gray-900 p-10 flex flex-col items-center justify-center md:px-12 lg:px-20 lg:py-14">
            <h1 className='text-white text-lg mb-4 md:text-2xl lg:text-3xl'>Admin Panel</h1>
            <input className='w-full lg:w-[350px] lg:h-[40px] mb-4 border-1 border-gray-900 rounded-sm lg:rounded-md' type="text" placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
            <input className='w-full lg:w-[350px] lg:h-[40px] mb-4 border-1 border-gray-900 rounded-sm lg:rounded-md' type="password" placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
            <button className='px-4 py-2 text-gray-900 font-bold bg-white rounded-md mb-4' onClick={handleClick}>Sign In</button>
            {error && <span className='text-red-500 text-lg text-center font-bold'>Wrong Credentials</span>}
        </div>
    </div>
  )
}

export default Login