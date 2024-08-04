import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Notfound = () => {
    const navigate= useNavigate
  return (
    <div className='h-screen w-full flex flex-col justify-center items-center bg=[#1A2238]'>
          <h1 className='text-9xl font-extrabold text-white'>404</h1>
          <div className='bg-black text-white absolute px-2 text-sm rounded rotate-12 '>
            Page not found ..
          </div>
          <button className='mt-5 '>
              <Link to='/' className='relative inline-block text-sm font-medium text-[#FF6A3D] active:text-purple-500'>
                <span className='relative block px-8 py-3 bg-[#1A2238] border border-current'>Go Back</span>
              </Link>
          </button>
    </div>
  )
}

export default Notfound
