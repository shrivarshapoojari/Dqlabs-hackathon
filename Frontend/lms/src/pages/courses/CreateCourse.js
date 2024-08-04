import React, { useState } from 'react'
 import Second from '../../layouts/Second'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { createCourse } from '../../redux/slices/courseSlice'
import { Link } from 'react-router-dom'
import { AiOutlineArrowLeft } from 'react-icons/ai'
const CreateCourse = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate();
    const [userInput,setUserInput]=useState({
        title:"",
        description:'',
        createdBy:'',
        thumbnail:null,
        category:'',
        previewImage:''
    })
function handleImageUpload(e)
{
    e.preventDefault();
    const uploadedimg=e.target.files[0];
    if(uploadedimg)
    {
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadedimg)
        fileReader.addEventListener("load",function(){
            setUserInput({
                ...userInput,
                thumbnail:uploadedimg,
                previewImage:this.result
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
    if(!userInput.title|| !userInput.description||!userInput.category|| !userInput.thumbnail|| !userInput.createdBy)
    {
        toast.error("Please fill all details to create course")
        return;

    }
  
    const response = await dispatch(createCourse(userInput))
    if(response?.payload?.success)
    {
        setUserInput({
            title:"",
            description:'',
            createdBy:'',
            thumbnail:null,
            category:'',
            previewImage:''
        })
        navigate('/courses')
          
    }

}

  return (
    <div >
    <Second>
       
         <div className="flex justify-center items-center h-[90vh] my-10 sm:my-0 ">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg px-4 text-white w-3/4 sm:w-[700px] shadow-[0_0_100px_purple] relative"
                >
                    
                    <Link  className="absolute top-3 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft onClick={()=>{
                            
                            navigate(-1)
                            
                        }}/>

                    </Link>

                    <h1 className="text-center text-2xl font-bold mb-3 py-3">
                        Create New Course
                    </h1>
                    <main>
                        <div className='grid grid-rows-2 sm:grid-cols-2 gap-x-10 px-6 sm:h-[400px] min-h-[400px]'>
                            {/*left*/}
                            <div className='gap-y-4'> 
                                  <div>
                                    <p className='font-semibold text-lg mb-[5px]'>Thumbnail{' '}:</p>
                                    <label htmlFor="image_uploads" className='cursor-pointer'>
                                        {userInput?.previewImage ?(
                                            <img src={userInput.previewImage}
                                            className='w-full h-44 m-auto border' />
                                        ):(<div className='w-full h-44 m-auto flex items-center justify-center border '>
                                              <h1 className='font-bold text-lg'>Upload Course Thumbnail</h1>
                                        </div>) }
                                    </label>
                                    <input 
                                       className='hidden'
                                       type='file'
                                       id='image_uploads'
                                       accept='.jpg,.jpeg ,.png,.svg ,.JPG,.JPEG,.PNG,.SVG'
                                       onChange={handleImageUpload}
                                        
                                       />
                                  </div>
                                  <div className='flex flex-col gap-1'>
                                     <label htmlFor="title" className='text-lg font-semibold'>Course Title</label>   
                                  
                                  <input
                                         required
                                          type='text'
                                          name='title'
                                          id='title'
                                          placeholder='Enter Course Title'
                                          onChange={handleUserInput}
                                          value={userInput.title}
                                          className='bg-transparent px-2 py-3 w-full border'/>
                            </div>
                    </div>
                            {/*Right */}
                            <div className='flex flex-col gap-1'>
                                <div className='flex flex-col gap-1'> 
                                   <label htmlFor="createdBy" className='text-lg font-semibold'>Mentor{' '}:</label>   
                                  
                                  <input
                                         required
                                          type='text'
                                          name='createdBy'
                                          id='createdBy'
                                          placeholder='Enter Course Mentor Name'
                                          onChange={handleUserInput}
                                          value={userInput.createdBy}
                                          className='bg-transparent px-2 py-3 border w-full'/>
                              </div>
                       
                           
                              <div className='flex flex-col gap-1'>
                              <label htmlFor="category" className='text-lg font-semibold'>Category</label>   
                                  
                                  <input
                                         required
                                          type='text'
                                          name='category'
                                          id='category'
                                          placeholder='Enter Course Category'
                                          onChange={handleUserInput}
                                          value={userInput.category}
                                          className='bg-transparent px-2 py-3 border w-full'/>
                              </div>
                              <div className='flex flex-col gap-1'>
                              <label htmlFor="description" className='text-lg font-semibold'>Description</label>   
                                  
                                  <textarea
                                         required
                                          type='text'
                                          name='description'
                                          id='description'
                                          placeholder='Enter Course Description'
                                          onChange={handleUserInput}
                                          value={userInput.description}
                                          className='bg-transparent px-2 py-3 border w-full h-24 resize-none overflow-y-scroll '/>
                              </div>
                        


                              </div>

                        </div>
                        
                        
                    </main>
                    <button
                    type='submit'
                    className='w-full py-3 rounded-sm font-semibold text-lg cursor-pointer bg-transparent hover:bg-purple-500 text-white hover:font-bold border mb-5'
                    
                    >
                        Create Course
                    </button>
                </form>
                </div>
    </Second>
    </div>
  )
}

export default CreateCourse
