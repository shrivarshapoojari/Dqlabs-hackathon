 

import React from 'react'
import {useSelector } from 'react-redux/es/hooks/useSelector'
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { BsBook } from "react-icons/bs";
import NewFooter from '../components/NewFooter';

const Second = ({children}) => {
    

    const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn)
    const role=useSelector((state)=>state?.auth?.role);
    const userimg=useSelector(((state)=>state?.auth?.data?.avatar?.secure_url))
    const dispatch=useDispatch()
    const navigate=useNavigate()

    async function  onLogout(e)
    {
        e.preventDefault();
    

      const response=  await dispatch(logout())
      if(response?.payload?.data)
      {
        navigate("/")
      }

       
    }
    function handlebutton(){
        navigate('/courses')
    }

  return (
    <div className='min-h-[90vh] bg-slate-900 min-w-[500px] '>
    <div className="navbar bg-base-100 bg-slate-900">
  <div className="flex-1">
    
    <Link className='btn btn-ghost text-xl text-purple-500 font-semibold border border-purple-500 hover:font-bold hover:border-purple-600 ' to='/'>MERNERA</Link>
  </div>
  <div className="flex-none">
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <BsBook className='w-10 h-8 mr-1 text-purple-500'/>
        </div>
      </label>
      <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52  shadow-[0_0_100px_purple] bg-slate-900">
        <div className="card-body">
          <span className="font-bold text-lg text-white">View Courses</span>
          <span className="text-info text-white">at  ₹ 499</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block " onClick={handlebutton}>View Courses</button>
          </div>
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end ">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className=" rounded-full w-10">
            {
                userimg?(<img src={userimg}/>):<BsPersonCircle className='h-[100%] w-[100%] object-cover text-purple-500'/>
            }
          
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2   rounded-box w-52 shadow-[0_0_100px_purple] bg-slate-900">
        <li>
            
          <Link to='/' className='justify-between text-white hover:text-white hover:bg-purple-500'>Home</Link>
        </li>
        <li> <Link to='/about' className='justify-between text-white hover:text-white hover:bg-purple-500'>About Us</Link> </li>
        <li> <Link to='/contact' className='justify-between text-white hover:text-white hover:bg-purple-500'>Contact Us</Link> </li>
        <li><Link to='/job' className='justify-between text-white hover:text-white hover:bg-purple-500'>Find a Job</Link></li>
        <li><Link to='/courses' className='justify-between text-white hover:text-white hover:bg-purple-500'>Courses</Link></li>
        {
            isLoggedIn && role=="ADMIN" &&
            (<li>
                <Link to='/courses/create' className='justify-between text-white hover:text-white hover:bg-purple-500'>Add Course</Link>
            </li>)
            
         }
        {
            !isLoggedIn ? ( <div>
            <li><Link to='/login' className='justify-between text-white hover:text-white hover:bg-purple-500'>Login</Link></li>
            <li><Link to='/signup' className='justify-between text-white hover:text-white'>Sign Up</Link></li> 
            </div>):(<div>
            <li><Link to='/user/profile' className='justify-between text-white hover:text-white hover:bg-purple-500'>Profile</Link></li>
            <li><Link onClick={onLogout} className='justify-between text-white hover:text-white hover:bg-purple-500'>Logout</Link></li> 
            </div>
            )

        }

      </ul>
    </div>
  </div>
</div>
{children}
        <NewFooter/>
</div>
  )
}

export default Second