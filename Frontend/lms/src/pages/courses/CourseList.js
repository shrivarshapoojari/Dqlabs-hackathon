import React, { useEffect } from 'react'
 
import Second from '../../layouts/Second'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCourses } from '../../redux/slices/courseSlice'
import CourseCard from '../../components/CourseCard'

const CourseList = () => {
    const dispatch= useDispatch()

    const {courseList}=useSelector((state)=>
    state.course
)
  
  async function loadCourses()
  {
    await dispatch(getAllCourses());  
    
     
  }
 useEffect(()=>{
    loadCourses();
 },[])

 
  return (
     <Second>
        <div className=' min-h-[90vh] pt-12 pl-20 flex flex-col  gap-10 text-white min-w-[414px]'>
                <h1 className='text-center text-4xl font-semibold mb-5'> 
                    Explore courses made by {" "}
                    <span className='font-bold text-purple-500'>Industry Experts</span>
                    
                 </h1>
                 <div className='mb-10 flex sm:flex-row flex-wrap sm:gap-14 sm:justify-evenly flex-col justify-center gap-8 '>
                       {courseList?.map((element)=>{
                         return <CourseCard key={element._id} data={element}/>
                           })} 
         </div>
        </div>
        
     </Second>
  )
}

export default CourseList