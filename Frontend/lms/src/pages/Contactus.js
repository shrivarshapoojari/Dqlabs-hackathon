import React, { useState } from 'react'
import Second from '../layouts/Second'
import toast from 'react-hot-toast';
 import { isEmail } from '../helper/regexmatcher';
import axiosInstance from '../config/axiosInstance';
const Contactus = () => {

  const [userInput,setUserInput]=useState({
    name:"",
    email:"",
    message:''
  });



    function handleInputChange(e){
       const{name,value}=e.target
      setUserInput({
        ...userInput,
        [name]:value
      })
    }


    async function onFormSubmit(e)
    {
      e.preventDefault();
      if(!userInput.email || !userInput.name || !userInput.message)
      {
        toast.error("All fields are  required ")
        return;
      }
      if(!isEmail(userInput.email))
      {
        toast.error("Please enter a valid email")
        return;
      }
      
      try{
         const response=  axiosInstance.post("/misc/contact",userInput)
         toast.promise(response,{
          loading:'Hang on ! Your Query is being submitted',
          success:"Query Submitted Succesfully",
          error :'Failed to submit query.. Please try again'
         })
         const responseData=await response;
         if(responseData?.payload?.data)
         setUserInput({
          email:'',
          name:'',
          message:''
         })
      }
      catch(error){

         toast.error(error.message)
      }
    
    }
  return (
    <>
      <Second>
        <div className='flex items-center justify-center h-[100vh] '>
           <form onSubmit={onFormSubmit} noValidate className='flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_100px_purple] md:w-1/3 w-[90%]'>
               <h1 className='text-3xl font-semibold'>Contact Form</h1>
                 <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="name" className='text-xl font-semibold'>
                        Name
                    </label>
                    <input 
                        type="text" 
                        id='name'
                        placeholder='Enter your name'
                        className='bg-transparent border px-2 py-2 rounded-sm text-white'
                        onChange={handleInputChange}
                        name='name'
                        value={userInput.name}/>
                       
                 </div>
                 <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="email" className='text-xl font-semibold'>
                        Email
                    </label>
                    <input 
                        type="email" 
                        id='email'
                        className='bg-transparent border px-2 py-2 rounded-sm text-white'
                        placeholder='Enter Your Email' 
                        onChange={handleInputChange}
                        name='email' 
                        value={userInput.email}
                         />
                       
                 </div>


                 <div className='flex flex-col w-full gap-1'>
                    <label htmlFor="message" className='text-xl font-semibold'>
                        Message
                    </label>
                    <textarea
                        type="text" 
                        id='message'
                        className='bg-transparent border px-2 py-2 rounded-sm  resize-none'
                        placeholder='Enter Your Message' 
                        onChange={handleInputChange}
                        name='message'
                        value={userInput.message}/>
                       
                 </div>
                 <button type='submit'className='w-full bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg'>
                  Submit
                 </button>
       
         </form>
         </div>
      </Second>
    </>
  )
}

export default Contactus
