import React, { useEffect } from 'react'
 import Second from '../../layouts/Second'
import { Link } from 'react-router-dom'
 import { useDispatch } from 'react-redux'
import {getUserData} from '../../redux/slices/authSlice'
import HomeLayout from '../../layouts/HomeLayout'
import {RxCrossCircled} from 'react-icons/rx'
const PaymentFailed = () => {
const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(getUserData())
  })
  return (
    <Second>
    <div className='min-h-[90vh] flex items-center justify-center text-white'>
        <div className='w-80 h-[26rem] flex flex-col justify-center items-center shadow-[0_0_100px_purple] rounded-lg relative ' >
                <h1 className='bg-red-500 absolute text-center top-0 w-full py-4 text-2xl font-bold rounded-t-lg' >Payment Failed</h1>
                <RxCrossCircled className='text-8xl text-red-500 absolute top-[15%] mt-2  '/>
        <div className='px-4 flex flex-col items-center justify-center space-y-2 mt-10'>
            <h2 className='text-md font-semibold'>
                Sorry Payment Failed!
            </h2>
            <p className='text-left'>Sorry , Payment is incomplete.If your money is deducted please report to support team</p>
        </div>


<Link to='/contact' className='bg-red-500 hover:bg-red-600 font-bold px-3 py-4 rounded-b-lg w-full text-center text-2xl absolute bottom-0'>Register Your Ticket</Link>
        </div>



    </div>
    </Second>
  )
}

export default PaymentFailed
