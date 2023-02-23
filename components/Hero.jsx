import Image from "next/image"
import {BsFillArrowLeftCircleFill,BsFillArrowRightCircleFill} from "react-icons/bs"
import { useState } from "react"

const Hero = () => {

    const [index, setIndex] = useState(0)

    const images = [
        "/images/hero1.png",
        "/images/hero2.png",
        "/images/hero3.png"
    ]

    const handleArrow = (direction)=>{
        if(direction === "left"){
            setIndex(index !== 0 ? index -1 : 2)
        }
        if(direction === "right"){
            setIndex(index !== 2 ? index +1 : 0)
        }

        
    }

  return (
    <div className="h-[65vh] md:pt-6 w-full bg-gray-900 overflow-hidden md:h-screen">


        <BsFillArrowLeftCircleFill className="absolute top-[30%] md:top-[50%] sm:left-5 left-1 text-white text-3xl cursor-pointer z-10 md:text-4xl" onClick={()=> handleArrow("left")}/> 


        <div className='w-[300vw] h-[100%] flex ' style={{transform:`translateX(${-100*index}vw)`, transition:`all 1.5s ease-in-out`}}>
            
                {images.map((img, index)=>{
                    return(
                        <div className="relative w-full h-[100%]" key={index}>
                            <Image className="object-contain" src={img} fill alt="main hero image"/>
                        </div>
                    )
                    
                })}  
              
        </div>
        <BsFillArrowRightCircleFill className="absolute md:top-[50%] top-[30%] sm:right-5 right-1 text-white text-3xl cursor-pointer z-10 md:text-4xl" onClick={()=> handleArrow("right")}/>
    </div>
  )
}

export default Hero