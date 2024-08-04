import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Second from '../layouts/Second';
 
import { isEmail} from '../helper/regexmatcher';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import {login } from '../redux/slices/authSlice';


const SignIn = () => {



    const navigate=useNavigate();
    const dispatch=useDispatch();



    const [signInDetails,setsignInDetails]=useState({
        email:'',
        
        password:'',
       
    })
    



  async function onFormSubmit(e)

   {
        e.preventDefault();
       
        
        if(!signInDetails.email || !signInDetails.password)
        {    
            toast.error("Please fill all details")
           
            return;
        }
        
         
        if(!isEmail(signInDetails.email))
        {
            toast.error("Invalid Email");
            return;
        }
        
 
         
            const response= await dispatch(login(signInDetails))
            console.log(response);
  if(response?.payload?.data)
  {
    navigate("/");
  }
  setsignInDetails({
    email:'',
     
    password:'',
 
})

 


}





   function handleUserInput(e)
   {
     const {name,value}=e.target;
     setsignInDetails({
        ...signInDetails,
        [name]:value
     })

   }
    
  return (
   <Second>
      <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
       <form onSubmit={onFormSubmit} noValidate  className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white'> 

            <h1 className='text-2xl text-center font-bold mb-5'>Login to continue</h1>
            
 
 
            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                         <input 
                              required
                              onChange={handleUserInput}
                              value={signInDetails.email}
            
                              type="text"
                              name='email'
                              placeholder='Enter Your Email..'
                              id='email'
                              className='bg-transparent px-2 py-2'

                              
                        />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                         <input 
                              required
                              onChange={handleUserInput}
                              value={signInDetails.password}
                              type="password"
                              name='password'
                              placeholder='Enter Your Password..'
                              id='password'
                              className='bg-transparent px-2 py-2'

                              
                        />
            </div>
                    <button className='mt-2  bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg '>
                            Sign In
                    </button>
                    <div className='flex gap-3'>
                    <p className='inline'>
                      New User ? <Link to='/signup' className='cursor-pointer text-accent '>SignUp</Link>
                    </p>
                    <p className='inline'>
                       <Link to='/forgot' className='cursor-pointer text-accent '>ForgotPassword?</Link>
                    </p>
                    </div>
       </form>
      </div>


   </Second>   
  )
}

export default SignIn
