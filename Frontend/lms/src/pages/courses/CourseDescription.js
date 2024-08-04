import React, { useEffect } from 'react'
 
import Second from '../../layouts/Second'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUserData } from '../../redux/slices/authSlice'
import { useDispatch} from 'react-redux'
const CourseDescription = () => {

    const {state}=useLocation() // acces the data sent by course card
    const navigate=useNavigate();

const isLoggedIn=useSelector((state)=>state?.auth?.isLoggedIn)
const dispatch=useDispatch()
  async function loadUser(){
   if(isLoggedIn)
   {
    await dispatch(getUserData())
   }
      
    }
   
   
    useEffect(()=>{

      loadUser();
    },[])
 
    const {role , data }=useSelector((state)=>state.auth)
    

  return (
    <Second>
      <div className='flex items-center justify-center md:w-3/4 w-full'>
          <div className='min-h-[90vh] pt-12 px-20 flex flex-col items-center justify-center text-white '>
           <div className='sm:grid sm:gap-10 py-10 relative sm:grid-cols-2 px-5 '>
                <div className='space-y-5 px-10 py-5 mb-5  '>
                    <img
                        src={state?.thumbnail?.secure_url}
                        alt="thumbnail"
                        className='w-full h-64' />
                        <div className='space-y-4'>
                            <div className='flex flex-col ibtems-center justify-between text-xl'>
                                <p className='font-semibold'>
                                    <span className='font-bold text-purple-500'> Total Duration:{ " "} </span>{state?.numberOfLectures}
                                </p>
                                <p className='font-semibold'>
                                    <span className='font-bold text-purple-500'> Mentor:{ " "} </span>{state?.createdBy}
                                </p>
                            </div>
                            {(role=='ADMIN' || data?.subscription?.status=='active') ?
                               ( <button 
                                        className='text-purple-500 text-xl rounded-md border border-current bg-transparent px-5 py-2 w-full hover:bg-purple-500 hover:text-white hover:font-bold'
                                        onClick={()=>navigate('/course/displayLectures',{state:{...state}})}
                                        
                                        >
                                          { role=='ADMIN' && "Manage Course"}
                                          { role=='USER' && "Start Learning"}
                                            
                                          
                                        </button>):(
                               <button 
                                    className='text-purple-500 text-xl rounded-md border border-current bg-transparent px-5 py-2 w-full hover:bg-purple-500 hover:text-white hover:font-bold'
                                         onClick={()=>navigate('/checkout')}>
                                     
                                         Subscribe
                                </button>)
                            }
                        </div>
                </div>
                 {/* Right Side of grid*/}
                  < div className='space-y-2 text-xl'>
                  <h1 className='text-3xl font-bold text-purple-500 text-center mb-5'>
                    {state?.title}
                  </h1>
                
                  <p className='text-purple-400 text-center'>
                    Course Overview: {" "}
                  </p>
                  <div className='w-full'> 
                  <p className='text-center whitespace-pre-wrap break-words'>
                    {state?.description}
                  </p>
                  
                  </div>
                 </div>
           </div>
          </div>
          </div>
    </Second>
  )
}

export default CourseDescription