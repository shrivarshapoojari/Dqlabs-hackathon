import React, { useState } from 'react'
import Second from '../../layouts/Second'
import toast from 'react-hot-toast'
import { isValidPassword } from '../../helper/regexmatcher'
import { useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import  {resetForgotPassword} from '../../redux/slices/authSlice'
import { useParams } from 'react-router-dom'
const ResetForgotPass = () => {
  const[userInput,setUserInput]=useState({
    password:'',
  
  })

  const { resetToken } = useParams();
  const dispatch=useDispatch();
  const navigate=useNavigate();

 async function onFormSubmit(e)
    {
      e.preventDefault();
      if(!userInput.password)
      {
          toast.error("Please enter new password")
          return;
      }

          if(!isValidPassword(userInput.password))
          {
            toast.error("Enter a Stronger Password")
            return;
          } 
          await dispatch(resetForgotPassword([resetToken,userInput]))
          
         navigate('/login')
         toast.success("Login using new password")

  }
      
    
      
    
    function handleUserInput(e)
    {
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

       <h1 className='text-2xl text-center font-bold mb-5'>Reset Password</h1>
       


       <div className='flex flex-col gap-1'>
           <label htmlFor="password" className='font-semibold'>New Password</label>
                    <input 
                         
                         
                         
                           value={userInput.email}
                           onChange={handleUserInput}
                         type="text"
                         name='password'
                         placeholder='Enter New Password'
                         id='password'
                         className='bg-transparent px-2 py-2'

                         
                   />
       </div>
       
               <button  className='mt-2  bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg '>
                      Reset Password
               </button>
              
  </form>
 </div>
    </Second>
  )
}

export default ResetForgotPass
