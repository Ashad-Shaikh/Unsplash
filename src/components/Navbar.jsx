import React, { useState } from 'react'
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const links = [
    {
        id: 1,
        name: "Home",
        src: '#home'
    },
    {
        id: 2,
        name: "Explore",
        src: '#explore'
    },
    {
        id: 3,
        name: "Images",
        src: '#images'
    },
]

const Navbar = () => {  

    const [clicked, setClicked] = useState(false)

    const handleClick = ()=>{
        setClicked(!clicked)
    }

  return (
    <div className='max-w-[1600px] mx-auto'>
      <nav className='flex justify-between items-center w-full py-4 px-8'>
        <div className='logo cursor-pointer'>
            <img src="https://unsplash.com/assets/core/logo-black-ddbdd505b663faadbc1e1731369f0929b2616886cb1d7fe11237c473bba02a50.svg" alt="" />
        </div>
        
        <div className='hidden md:block'>
            <ul className='flex items-center gap-8'>
                {links.map((link)=>(
                    <li key={link.id} className='font-semibold hover:text-gray-500 transition-all cursor-pointer'>
                        {link.name}
                    </li>
                ))}
                <button className='font-semibold bg-black text-white py-3 px-6 rounded-xl cursor-pointer hover:text-gray-300'>Join</button>
            </ul>
        </div>
        
        <IoMenu  className='md:hidden text-3xl text-black cursor-pointer' onClick={handleClick}/>

        <div className={`md:hidden absolute top-0 ${clicked ? 'right-0' : '-right-1000'} bg-black text-white w-[60%] h-screen transition-all duration-300`}>
        <ul className='flex items-start flex-col justify-center gap-8 p-8'>
        <RxCross2 className='text-3xl text-white cursor-pointer hover:text-gray-300' 
        onClick={handleClick}/>
                {links.map((link)=>(
                    <li key={link.id} className='font-semibold hover:text-gray-300 transition-all cursor-pointer'>
                        {link.name}
                    </li>
                ))}
                <button className='font-semibold bg-white text-black py-3 px-6 rounded-xl cursor-pointer hover:text-gray-500'>Join</button>
            </ul>
        </div>
      </nav>
    </div>
  )
}


export default Navbar
