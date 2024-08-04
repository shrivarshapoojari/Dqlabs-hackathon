import React, { useEffect } from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import { Link } from 'react-router-dom'
 import { useDispatch } from 'react-redux'
import {getUserData} from '../../redux/slices/authSlice'
import Second from '../../layouts/Second'
const PaymentSuccess = () => {
const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUserData())
  })
  return (
    <Second>
    <div className='min-h-[90vh] flex items-center justify-center text-white'>
        <div className='w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_100px_purple] rounded-lg relative ' >
                <h1 className='bg-green-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-t-lg' >Payment Successfull</h1>
                <AiFillCheckCircle className='text-9xl text-green-500 absolute top-[15%] mt-2  '/>
        <div className='px-4 flex flex-col items-center justify-center space-y-2 mt-10'>
            <h2 className='text-md font-semibold'>
                Welcome, Now You are a Pro Member!
            </h2>
            <p className='text-left'>Bundle of Courses are a just click away</p>
        </div>


<Link to='/courses' className='bg-green-500 hover:bg-green-600 font-bold px-3 py-4 rounded-b-lg w-full text-center text-2xl absolute bottom-0'>Go to Courses</Link>
        </div>



    </div>
    </Second>
  )
}

export default PaymentSuccess
