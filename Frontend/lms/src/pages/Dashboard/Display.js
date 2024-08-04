import React, { useEffect, useState } from 'react'
import Second from '../../layouts/Second'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCourseLecture } from '../../redux/slices/lectureSlice'
import {deleteLecture} from '../../redux/slices/lectureSlice'
const Display = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {state}=useLocation()

   
    const { lectures } = useSelector(state => state?.lecture) || { lectures: [] };
    
    const {role}=useSelector((state)=>state?.auth)

const [currentVideo,setCurrentVideo]=useState(0);

async function onLectureDelete(courseId,LectureId)
{
    await dispatch(deleteLecture({courseId:courseId,lectureId:LectureId } ))
    await dispatch(getCourseLecture(state._id))
}
useEffect(()=>{
    if(!state){
         navigate('/courses')
        
    }
     
  
console.log(state)  
    dispatch(getCourseLecture(state._id))
},[])

  return (
    <Second>
           <div className='flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]'>
                <div className='text-center text-2xl font-semibold text-purple-500 '>
                  Course Name :{state?.title}
                </div>
                {lectures && lectures.length>0 && (
                <div className='flex flex-col justify-center ga10 w-full md:flex-row shadow-[0_0_10px_black] md:shadow-none '>  
                      <div className='space-y-5 md:w-[28rem] p-2 rounded-lg md:shadow-[0_0_10px_black] w-full'> 
                          <video
                            src={lectures[currentVideo]?.lecture?.secure_url}
                           className='object-fill rounded-t-lg w-full' 
                           controls
                              disablePictureInPicture
                              controlsList='nodownload'
                              muted/>
                              <h1>
                                <span className='text-purple-500'>
                                  Title :{' '}
                                </span>
                                {lectures[currentVideo].title}
                              </h1>
                              <p>
                              <span className='text-purple-500'>
                                  Description :{' '}
                                </span>
                                {lectures[currentVideo].description}
                              </p>
                      </div>
                      <ul className='space-y-5 md:w-[28rem] p-2 rounded-lg md:shadow-[0_0_10px_black] md:mx-5 w-full'>
                            <li className='font-semibold text-xl text-purple-500 flex items-center justify-between'>
                            
                              Lecutures List 
                              {
                                role=='ADMIN' &&
                                (
                                  <button className='btn btn-ghost'  onClick={()=>navigate('/course/addlecture',{state:{...state}})}>Add Lecture</button>
                                )
                              }
                            </li>
                            {
                              lectures.map((lecture,idx)=>{
                                return(
                                  <li className='space-y-2 relative ' key={lecture._id} >
                                    <p className='cursor-pointer inline 'onClick={()=>setCurrentVideo(idx)}>
                                       <span>Lecture {idx+1} : {' '}</span>{lecture.title}
                                    </p>
                                    {role=="ADMIN" && (
                                      <button className='text-red-400 rounded-lg p-1 border hover:bg-purple-500 transition-all ease-out duration-300 absolute right-0 top-[-12px] btn-ghost ' onClick={()=>onLectureDelete(state?._id,lecture._id)}>Delete</button>
                                    )}
                                  </li>
                                )
                              })
                            }
                      </ul>
                </div>
                
                
                )  

                             
              }
                {
                  lectures && lectures.length==0 && role=='ADMIN' &&
                  
                     
                  (
                    <div className='flex items-center justify-center'>
                          <button className='btn btn-primary'  onClick={()=>navigate('/course/addlecture',{state:{...state}})}>Add Lecture</button>
                      </div>
                  )
                }

           </div>
    </Second>
  )
}

export default Display
