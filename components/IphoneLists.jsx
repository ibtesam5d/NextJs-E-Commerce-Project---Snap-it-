import IphoneCard from "./IphoneCard"


const IphoneLists = ({iphoneList}) => {
  return (
    <section className="w-full h-full p-4 flex flex-col justify-center items-center text-gray-900">
        <div className="py-4 text-center lg:py-6">
            <h1 className="uppercase text-3xl font-bold mb-2 md:text-4xl lg:text-5xl lg:mb-4 ">Latest Iphone Cases!</h1>
            <p className="text-md md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt excepturi alias atque facilis. Officiis aspernatur nisi quaerat, magni vero iste.</p>
        </div>
        <div className="w-full flex flex-col justify-evenly items-center lg:flex-row lg:gap-2 lg:flex-wrap ">

          {iphoneList.map((iphone)=>{
            return(
              <IphoneCard key={iphone._id} iphoneCase={iphone}/>
            )
          })}
            
            
        </div>
    </section>
  )
}

export default IphoneLists