import axios from "axios"
import { useState } from "react"
import {AiFillCloseCircle} from "react-icons/ai"

const AddProduct = ({setClose}) => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [prices, setPrices] = useState([])
    const [materialTypes, setMaterialTypes] = useState(null)
    const [material, setMaterial] = useState([])


    const changePrice = (e,index)=>{
        const currentPrices = prices
        currentPrices[index]= e.target.value
        setPrices(currentPrices)
    }

    const handleMaterialType = (e)=>{
        setMaterialTypes({
            ...materialTypes, [e.target.name]:e.target.value
        })
    }
    const handleMaterial = (e)=>{
        setMaterial((prev)=>[...prev,materialTypes])
        
    }

    const handleAddProduct = async()=>{
        const data = new FormData()
        data.append("file", file)
        data.append("upload_preset", "myuploads")

        try {
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/diurkqueg/image/upload", data)

            const {url} = uploadRes.data

            const newProduct = {
                title,desc,prices,image:url, materialType:material
            }

            await axios.post("/api/products", newProduct)
            setClose(true)
        } catch (error) {
            console.log(error);
        }
    }
    

  return (
    <div className="absolute top-0 left-0 right-0 z-[9999] bg-gray-300/70 h-screen flex items-center p-4">
        <div className="bg-white flex flex-col justify-between items-center h-full w-full rounded-md relative py-8">
            <AiFillCloseCircle className="absolute right-2 top-2" onClick={()=>setClose(true)} size={35}/>
            <h1 className="text-2xl font-semibold text-center pt-4">Add New Iphone Case</h1>
            <div className="flex flex-col">
                <label htmlFor="image" className="text-lg text-center">Choose an image</label>
                <input className="w-[250px]" type="file" name="image" id="image" onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="title" className="text-lg text-center">Choose a title</label>
                <input className="w-[250px] text-center px-2 border-gray-900 border-2 rounded-md" type="text" id="title" placeholder="product title" onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="desc" className="text-lg text-center">Choose a description</label>
                <input className="w-[250px] text-center px-2 border-gray-900 border-2 rounded-md" type="text" id="desc" placeholder="product desc" onChange={(e)=>setDesc(e.target.value)}/>
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="price" className="text-lg text-center">Product Prices</label>
                <input className="w-[250px] text-center px-2 border-gray-900 border-2 rounded-md" type="number" id="price" placeholder="Regular"
                onChange={(e)=>changePrice(e,0)}/>
                <input className="w-[250px] text-center px-2 border-gray-900 border-2 rounded-md" type="number" id="price" placeholder="Pro"
                onChange={(e)=>changePrice(e,1)}/>
                <input className="w-[250px] text-center px-2 border-gray-900 border-2 rounded-md" type="number" id="price" placeholder="Pro-Max"
                onChange={(e)=>changePrice(e,2)}/>
            </div>
            <div className="flex flex-col items-center">
                <label htmlFor="material" className="text-lg text-center">Select Material</label>
                <input className="w-[250px] text-center px-2 border-gray-900 border-2 rounded-md" type="text" name="text" id="material" placeholder="Matte..etc" onChange={handleMaterialType}/>
                <button className="bg-gray-900 text-white w-[80px] px-4 py-1 mt-2 rounded-md" onClick={handleMaterial}>Add</button>
            </div>
            <div className="">
                {material.map((item)=><span key={item.text}>{item.text}</span>)}
            </div>
            <div className="">
                <button className="bg-gray-900 text-white px-6 py-2 rounded-md" onClick={handleAddProduct}>Add Product</button>
            </div>
        </div>
    </div>
  )
}

export default AddProduct