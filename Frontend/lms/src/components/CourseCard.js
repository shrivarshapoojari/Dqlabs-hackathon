import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseCard = ({data}) => {
    const navigate=useNavigate();
  return (
     <div onClick={()=>navigate('/course/description',{state:{...data}})} className='text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden bg-zinc-700'> 
         <div className='overflow-hidden '>
            <img 
            src={data?.thumbnail?.secure_url}
            alt="Thumbnail"
            className='h-48 w-full rounded-tl-lg rounded-tr-lg group hover:scale=[1,2] transition-all ease-in-out duration-300' />
         </div>
         <div className='p-3 space-y-1 text-white'>
            <h2 className='text-xl font-bold text-purple-500 line-clamp-2'>
                {data?.title}
            </h2>
            <p className='line-clamp-2'>{data?.description} </p>
            <p className='font-semibold'>
            Category: <span className='fb'>{data?.category}</span>
            </p>
            <p className='font-semibold'>
            Instructor: <span className='fb'>{data?.createdBy}</span>
            </p>
            <p className='font-semibold'>
            Total Duration: <span className='fb'>{(data?.numberOfLectures)}{' '}hrs</span>
            </p>
         </div>
     </div>
  )  
}

export default CourseCard