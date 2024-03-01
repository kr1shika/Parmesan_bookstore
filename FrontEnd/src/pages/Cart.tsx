import Headerr from '../components/Headerr'
import mm12 from '../parmasan_icons/sputnik.jpg'

function Cart() {
  return (
    <div className='bg-[#F3EAE4] h-screen'>
        <Headerr/>

        <div className='text-[#272E87]  flex'>

             <div>
                    <p className='text-6xl tracking-wide font-medium font-jomhu text-[#272E87] mx-8 my-5' > 
                            #Your Cart
                    </p>

                    <div className='flex tracking-wide bg-[#F3EAE4] h-36 w-96 ml-14 mt-0 rounded-lg border shadow-lg '>

                        <div className="inline-flex items-center ">
                                <label className="-mr-2 relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="customStyle">
                                    <input type="checkbox"
                                    className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg- transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-[#272E87] checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                                    id="customStyle"  />
                                    <span
                                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                    </svg>
                                    </span>
                                </label>
                        </div>

                         <img src={mm12} className=' h-32 mx-2 my-2 rounded-lg' alt="My Image" />

                         <div>
                            <p className='font-jomhu text-4xl mx-2 my-2'> Sputnik Sweetheart </p>
                            <p className='font-jomhu text-3xl  mx-2 my-2'> HAruki Murakami</p>
                            <p className='font-jomhu text-3xl  mx-2 my-2'>Vintage </p>

                         </div>
                    </div>


                    {/* <div className='flex tracking-wide bg-[#F3EAE4] h-36 w-96 ml-14 rounded-lg border shadow-lg mt-10'>

                      
                        <div className="inline-flex items-center">
                                <label className="-mr-2 relative flex items-center p-3 rounded-full cursor-pointer" htmlFor="customStyle">
                                    <input type="checkbox"
                                    className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg- transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-[#272E87] checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                                    id="customStyle"  />
                                    <span
                                    className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                        stroke="currentColor" stroke-width="1">
                                        <path fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"></path>
                                    </svg>
                                    </span>
                                </label>
                        </div>

                         <img src={mm12} className=' h-32 mx-2 my-2 rounded-lg' alt="My Image" />

                         <div>
                            <p className='font-jomhu text-4xl mx-2 my-2'> Master And Margarita </p>
                            <p className='font-jomhu text-3xl  mx-2 my-2'> Mikhail Bulgakov</p>
                            <p className='font-jomhu text-3xl  mx-2 my-2'> Publisher </p>
                         </div>
                    </div> */}
             </div>
            
             <div className=''>

                    <img
                        src="src\parmasan_icons\MEOW.png"
                        alt="Registration Image"
                        className="mx-auto -mt-6  h-64   object-cover transition ease-in-out delay-120 hover:translate-y-2 hover:scale-90"
                    /> 

             </div>

        </div>
    </div>
  )
}

export default Cart