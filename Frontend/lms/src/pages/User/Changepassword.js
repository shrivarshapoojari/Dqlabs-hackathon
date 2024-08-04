import React, { useState } from 'react'
 import Second from '../../layouts/Second'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
 
import { useDispatch,useSelector } from 'react-redux'
import { changePassword } from '../../redux/slices/authSlice'
const Changepassword = () => {
    
const dispatch=useDispatch();
    const [userInput,setUserInput]=useState({
        oldPassword:'',
        newPassword:''
       
    })
    const navigate=useNavigate();
    const userId=useSelector((state)=>state?.auth?.data?._id)

    function handleUserInput(e){
        
        const{name,value}=e.target
        setUserInput({
            ...userInput,
            [name]:value

        })
  

    }
    
   async function onFormSubmit(e){
        e.preventDefault();
       
      if(!userInput.oldPassword||!userInput.newPassword)
      {
        toast.error("All Fields are required!")
        return;
      }
      await dispatch(changePassword([userId,userInput]))
      setUserInput({
        oldPassword:'',
        newPassword:''
      })
      toast.success("Login Using New Password")
      navigate('/login')

    }
  return (
    <Second>
         <div className='flex overflow-x-auto items-center justify-center h-[90vh]'>
       <form onSubmit={onFormSubmit} className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white shadow-[0_0_200px_purple]'> 

            <h1 className='text-2xl text-center font-bold mb-5'>Change Password</h1>
            
 
 
            <div className='flex flex-col gap-1'>
                <label htmlFor="CurrentPassword" className='font-semibold'>Current Password</label>
                         <input 
                              
                              
                              
                                value={userInput.oldPassword}
                                onChange={handleUserInput}
                              type="text"
                              name='oldPassword'
                              placeholder='Enter the Current Password'
                              id='oldPassword'
                              className='bg-transparent px-2 py-2'

                              
                        />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="NewPassword" className='font-semibold'>New Password</label>
                         <input 
                              
                              onChange={handleUserInput}
                             value={userInput.newPassword}
                              type="text"
                              name='newPassword'
                              placeholder='Enter New Password..'
                              id='NewPassword'
                              className='bg-transparent px-2 py-2'

                              
                        />
            </div>
                    <button  className='mt-2  bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg '>
                            Change Password
                    </button>
                    <p className='text-center'>
                      <Link to='/user/profile' className='cursor-pointer text-accent'>Go Back</Link>
                    </p>
       </form>
      </div>

    </Second>
  )
}

export default Changepassword
