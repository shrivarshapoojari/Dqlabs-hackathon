import React, { useState } from 'react'
 import Second from '../../layouts/Second'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { addLecture } from '../../redux/slices/lectureSlice'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import { getCourseLecture } from '../../redux/slices/lectureSlice'
const Addlecture = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate();
    const [userInput,setUserInput]=useState({
        title:"",
        description:'',
        video:'',
        previewVideo:''
    })

    
   
    const {state}=useLocation()
    const videoDetails={
        lecture:'',
        description:'',
        title:'',
        id:''

    }
    
function handleVideoUpload(e)
{
    e.preventDefault();
    const uploadedVideo=e.target.files[0];
    if(uploadedVideo)
    {
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadedVideo)
        fileReader.addEventListener("load",function(){
            setUserInput({
                ...userInput,
               video:uploadedVideo,
                previewVideo:this.result
            })
        })

    }
}
function handleUserInput(e){
      const{name,value}=e.target
      setUserInput({
        ...userInput,
        [name]:value
      })
}
async function onFormSubmit(e)
{
    e.preventDefault();
    if(!userInput.title|| !userInput.description || !userInput.video)
    {
        toast.error("Please fill all details to upload lecture")
        return;

    }

  videoDetails.lecture=userInput?.video;
  videoDetails.title=userInput?.title;
  videoDetails.description=userInput?.description;
  videoDetails.id=state?._id;
    const response = await dispatch(addLecture(videoDetails))
    if(response?.payload?.success)
    {
        setUserInput({
            title:"",
            description:'',
          
           
           video:'',
            previewVideo:''
        })

         
        navigate('/')
        toast.success("Video Updated Succesfully")
          
    }

}

  return (
    <div >
    <Second>
       
         <div className="flex justify-center items-center h-[90vh] my-10 sm:my-0 ">
                <form noValidate
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg px-4 text-white w-3/4 sm:w-[700px] shadow-[0_0_100px_purple] relative h-[100%] "
                >
                    
                    <Link  className="absolute top-3 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft onClick={()=>{
                            
                            navigate(-1)
                            
                        }}/>

                    </Link>

                    <h1 className="text-center text-2xl font-bold mb-3 py-3">
                        Upload a new video
                    </h1>
                    <main>
                        <div className='flex flex-col items-center justify-center px-6 sm:h-[400px] min-h-[400px] mt-10'>
                        
                            <div className='gap-y-4 w-[100%]'> 
                                  <div className='w-[100%]'>
                                    <p className='font-semibold text-lg mb-[5px]'>Video {" "}:</p>
                                    <label htmlFor="video_uploads" className='cursor-pointer'>
                                        {userInput?.previewVideo ?(
                                            <video src={userInput.previewVideo}
                                            className='w-full h-44 m-auto border' />
                                        ):(<div className='w-full h-44 m-auto flex items-center justify-center border '>
                                              <h1 className='font-bold text-lg'>Upload New Video</h1>
                                        </div>) }
                                    </label>
                                    <input 
                                       className='hidden'
                                       type='file'
                                       id='video_uploads'
                                       accept='.mp4 , .MP4, .mkv .MKV , .mov , .MOV'
                                       onChange={handleVideoUpload}
                                       name='video_uploads'
                                        
                                       />
                                  </div>
                                  <div className='flex flex-col gap-1'>
                                     <label htmlFor="title" className='text-lg font-semibold'>Lecture Title</label>   
                                  
                                  <input
                                         required
                                          type='text'
                                          name='title'
                                          id='title'
                                          placeholder='Enter Lecture Title'
                                          onChange={handleUserInput}
                                          value={userInput.title}
                                          className='bg-transparent px-2 py-3 w-full border'/>
                            </div>

                            <div className='flex flex-col gap-1'>
                              <label htmlFor="description" className='text-lg font-semibold'>Description</label>   
                                  
                                  <textarea
                                         required
                                          type='text'
                                          name='description'
                                          id='description'
                                          placeholder='Enter Lecture Description'
                                          onChange={handleUserInput}
                                          value={userInput.description}
                                          className='bg-transparent px-2 py-3 border w-full h-24 resize-none overflow-y-scroll '/>
                              </div>
                              <div className='flex flex-col gap-1'>
                                            
                              <button
                    type='submit'
                    className='w-full py-3 rounded-sm font-semibold text-lg cursor-pointer bg-transparent hover:bg-purple-500 text-white hover:font-bold border mt-5 mb-5'
                    
                    >
                        Upload
                    </button>
                            </div>

                    </div>
                        
                            
                               
                       
                           
                             
                             
                        


                        </div>
                        
                        
                    </main>
                 
                </form>
                </div>
    </Second>
    </div>
  )
}

export default Addlecture
