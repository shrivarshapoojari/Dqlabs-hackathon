import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance  from "../../config/axiosInstance"
const initialState={
    isLoggedIn:localStorage.getItem("isLoggedIn") || false,
    role:localStorage.getItem("role") || "",
    data: JSON.parse(localStorage.getItem('data'))||{}
    
}
//   data: localStorage.getItem('data') !== undefined ? JSON.parse(localStorage.getItem('data')) : {},
export const createAccount=createAsyncThunk('/auth/signup',async(data)=>{
  try{
       const response=  axiosInstance.post('/user/register',data)
       toast.promise(response,{
        loading:"Please hang on ! We are working on creating your account",
         success:(data)=>{
            return data?.data?.message
         },
         error:"Sorry ! Account creation failed.."
       })
       return await response;
  } 
  catch(error){
    toast.error(error?.response?.data?.message);
     console.log(error)
  }
})




export const updateProfile=createAsyncThunk('/auth/update/profile',async(data)=>{
  try{
       
       const response= axiosInstance.put(`/user/update/${data[0]}`,data[1])
       toast.promise(response,{
        loading:"Please hang on ! We are updating your account",
         success: "Profile update succesfully",
         error:"Sorry ! Can't update your profile .. Try again"
       })
       return (await response).data;
  } 
  catch(error){
    toast.error(error?.response?.data?.message);
     console.log(error)
  }

})
export const changePassword=createAsyncThunk('/auth/changePassword',async(data)=>{
  try{
       
       const response= axiosInstance.post(`/user/change/${data[0]}`,data[1])
       toast.promise(response,{
        loading:"Please hang on ! We are updating your password",
         success: "Password updated succesfully",
         error:"Sorry ! Can't update your password .. Try again"
       })
       return (await response).data;
  } 
  catch(error){
    toast.error(error?.response?.data?.message);
     console.log(error)
  }

})
export const forgotPassword=createAsyncThunk('/auth/forgot',async(data)=>{
  try{
    
       
       const response= axiosInstance.post('/user/reset',data)
       toast.promise(response,{
        loading:"Sending recovery mail",
         success: "Password Recovery mail sent!",
         error:"Failed to send password recovery mail"
       })
       return (await response);
  } 
  catch(error){
    toast.error(error?.response?.data?.message);
     console.log(error)
  }

})
export const resetForgotPassword=createAsyncThunk('/auth/resetForgotPassword',async(data)=>{
  try{
 
       
       const response= axiosInstance.post(`/user/reset/${data[0]}`,data[1])
       toast.promise(response,{
        loading:"We are Updating your password",
         success: "Succesfully updated your password",
         error:"Failed to update password"
       })
       return (await response).data;
  } 
  catch(error){
    toast.error(error?.response?.data?.message);
     console.log(error)
  }

})




export const getUserData=createAsyncThunk('/auth/getdetails',async()=>{
  try{
       const response=  axiosInstance.get('/user/me')
      
       return (await response).data;
  } 
  catch(error){
    toast.error(error?.message);
     console.log(error)
  }
})
export const login=createAsyncThunk('/auth/login',async(data)=>{
  try{
       const response=  axiosInstance.post('/user/login',data)
       toast.promise(response,{
        loading:"Please hang on ! We are finding your account",
         success:(data)=>{
            return data?.data?.message
         },
         error:"Sorry ! Login Failed Please try again.."
       })
       return await response;
  } 
  catch(error){
    toast.error(error?.response?.data?.message);
     console.log(error)
  }
})
export const logout=createAsyncThunk('/auth/logout',async()=>{
  try{
       const response=  axiosInstance.get('/user/logout')
       toast.promise(response,{
        loading:"Please hang on ! We are Logging you Out",
         success:(data)=>{
            return data?.data?.message
         },
         error:"Sorry ! Logout Failed Please try again.."
       })
       return await response;
  } 
  catch(error){
    toast.error(error?.response?.data?.message);
     console.log(error)
  }
})


const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder
      .addCase(login.fulfilled,(state,action)=>{
        console.log(action.payload)
        localStorage.setItem("data",JSON.stringify(action?.payload?.data))
        localStorage.setItem("isLoggedIn",true)
        localStorage.setItem("role",action?.payload?.data?.user?.role)
        state.isLoggedIn=true;
        state.role=action?.payload?.data?.user?.role
        state.data=action?.payload?.user

      })
      .addCase(logout.fulfilled,(state)=>{
         localStorage.clear();
         state.isLoggedIn=false;
        state.role="";
        state.data= {};
      })
      .addCase(getUserData.fulfilled,(state,action)=>{
        
        localStorage.setItem("data",JSON.stringify(action?.payload?.user))
        localStorage.setItem("isLoggedIn",true)
        localStorage.setItem("role",action?.payload?.user?.role)
        state.isLoggedIn=true;
        state.role=action?.payload?.user?.role
        state.data=action?.payload?.user
      })
       
      
    }
});

export default authSlice.reducer;