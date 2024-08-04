import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Second from '../layouts/Second';
import { BsPersonCircle } from 'react-icons/bs';
import { isEmail,isValidPassword } from '../helper/regexmatcher';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { createAccount } from '../redux/slices/authSlice';


const Signup = () => {



    const navigate=useNavigate();
    const dispatch=useDispatch();



    const [signupDetails,setSignupDetails]=useState({
        email:'',
        fullname:'',
        password:'',
        avatar:''
    })
    const [previewImage,setPreviewImage]=useState("");



  async function onFormSubmit(e)

   {
        e.preventDefault();
        if(!signupDetails.avatar)
        {
          toast.error("Please upload profile photo")
          return;
        }
        if(!signupDetails.email || !signupDetails.fullname || !signupDetails.password)
        {
            toast.error("Please fill all details")
            return;
        }
        if(signupDetails.fullname.length<5)
        {
            toast.error("Name Should be atleast of 5 characters");
            return;
        }
        if(!isEmail(signupDetails.email))
        {
            toast.error("Invalid Email");
            return;
        }
        if(!isValidPassword(signupDetails.password))
        {
            toast.error("Choose a stroger password");
            return;
        }

        const formData=new FormData();
        formData.append('fullname',signupDetails.fullname)
        formData.append('email',signupDetails.email)
        formData.append('password',signupDetails.password)
        formData.append('avatar',signupDetails.avatar)
   const response= await dispatch(createAccount(formData))
  console.log(response);
  if(response?.payload?.data)
  {
    toast.success("Login to Continue")
    navigate("/login");
  }
  setSignupDetails({
    email:'',
    fullname:'',
    password:'',
    avatar:''
})

setPreviewImage('');


}





   function handleUserInput(e)
   {
     const {name,value}=e.target;
     setSignupDetails({
        ...signupDetails,
        [name]:value
     })

   }
   function handleImage(e)
   {
      e.preventDefault();
      const uploadedImg=e.target.files[0];
      if(!uploadedImg)
      {
        return;
      }
      setSignupDetails({
        ...signupDetails,
        avatar:uploadedImg
      })

     const fileReader=new FileReader();
     fileReader.readAsDataURL(uploadedImg);
     fileReader.addEventListener('load',function(){
        setPreviewImage(this.result);
     })
   }
  return (
   <Second>
      <div className='flex overflow-x-auto items-center justify-center h-[100vh]'>
       <form onSubmit={onFormSubmit} noValidate  className='flex flex-col justify-center gap-3 rounded-lg p-4 text-white'> 

            <h1 className='text-2xl text-center'>Can We have Your Information Please !!</h1>
            <label htmlFor="image_uploads" className='cursor-pointer'>
            {
                previewImage ? 
                (
                    
                    <img className='w-24 h-24 rounded-full m-auto' src={previewImage} />
                    
                    
                    
                    ):(


                <BsPersonCircle className= 'w-24 h-24 rounded-full m-auto'/>

                    )
            }

            </label>
            <input
                
                onChange={handleImage}
                type='file'  
                className='hidden ' 
                name='image_uploads'
                id='image_uploads'
                accept='.jpg, .JPG,.jpeg, .JPEG, .png, .PNG, .svg, .SVG'

                
            />
            <div className='flex flex-col gap-1'>
                <label htmlFor="fullname" className='font-semibold'>Name</label>
                         <input 
                              onChange={handleUserInput}
                              required
                              type="text"
                              name='fullname'
                              value={signupDetails.fullname}
                              placeholder='Enter Your Name..'
                              id='fullname'
                              className='bg-transparent px-2 py-2'

                              
                        />
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                         <input 
                              required
                              onChange={handleUserInput}
                              value={signupDetails.email}
            
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
                              value={signupDetails.password}
                              type="password"
                              name='password'
                              placeholder='Enter Your Password..'
                              id='password'
                              className='bg-transparent px-2 py-2'

                              
                        />
            </div>
                    <button className='mt-2  bg-purple-500 hover:bg-purple-600 transition-all ease-in-out duration-300 cursor-pointer py-2 font-semibold text-lg '>
                            Create Account
                    </button>
                    <p className='text-center'>
                        Existing User ? <Link to='/login' className='cursor-pointer text-accent'>Login</Link>
                    </p>
       </form>
      </div>


   </Second>   
  )
}

export default Signup
