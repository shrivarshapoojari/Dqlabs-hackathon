import React, { useState } from 'react'
import Second from '../../layouts/Second'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { forgotPassword } from '../../redux/slices/authSlice'
import { isEmail } from '../../helper/regexmatcher'
const ForgotPassword = () => {

    const[userInput,setUserInput]=useState({
        email:''
    })
    const dispatch=useDispatch();
   async function onFormSubmit(e)
    {

        e.preventDefault();
        if(!userInput.email)
        {
            toast.error("Please provide email address")
            return;

        }
        if(!isEmail(userInput.email)){
          toast.error("Provide Valid Email")
          return
        }
      
await dispatch(forgotPassword(userInput))


    }
    function handleUserInput(e){
        const{name,value}=e.target
        setUserInput({
            ...userInput,
            [name]:value

        })


    }
  return (
    <Second>
    <div className='flex overflow-x-auto items-center justify-center h-[90vh]'>
  <form onSubmit={onFormSubmit} noValidate className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-[0_0_200px_purple] w-[350px]'> 

       <h1 className='text-2xl text-center font-bold mb-5'>Forgot Password</h1>
       


       <div className='flex flex-col gap-1'>
           <label htmlFor="email" className='font-semibold'>Enter Your Email</label>
                    <input 
                         
                         
                         
                           value={userInput.email}
                           onChange={handleUserInput}
                         type="email"
                         name='email'
                         placeholder='Enter the registered mail address'
                         id='email'
                         className='bg-transparent px-2 py-2'

                         
                   />
       </div>
       
               <button  className='mt-2  bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg '>
                       Forgot Password
               </button>
               <p className='text-center'>
                 <Link to='/user/profile' className='cursor-pointer text-accent'>Go Back</Link>
               </p>
  </form>
 </div>

</Second>
  )
}

export default ForgotPassword
