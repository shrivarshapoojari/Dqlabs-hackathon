import React from 'react'
import { useNavigate } from 'react-router-dom'

const Denied = () => {
    const navigate=useNavigate();
  return (
     <main className='h-screen w-full flex flex-col justify-center items-center bg-[#1A2238] relative'>

<h1 className='text-9xl font-semibold text-white tracking-widest'>
    403
</h1>
<div  className='bg-black text-white px-2 text-sm rounded rotate-12 absolute'>
    Access Denied
</div>
          <button 
                className='m-5 ' 
                onClick={()=>navigate('/')}>
             
           <span className='relative block px-8 py-3 border border-current bg-orange-400 text-white'> Go Back</span>  
    
            </button>
     </main>
  )
}

export default Denied
