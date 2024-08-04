import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({allowedRoles}) => 
{


    const {isLoggedIn,role}=useSelector((state)=>state.auth)

    return isLoggedIn && allowedRoles.find((currRole)=>currRole==role) ?(

        <Outlet />
    ): isLoggedIn ?(
        (<Navigate to='denied'/>)
     
    
    
    ) :(< Navigate to='/login'/>)

  
  
}

export default RequireAuth
