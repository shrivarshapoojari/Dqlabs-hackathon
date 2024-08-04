import React, { useState } from 'react'
 import Second from '../../layouts/Second'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { getUserData } from '../../redux/slices/authSlice'
import { updateProfile } from '../../redux/slices/authSlice'
import { BsPersonCircle } from 'react-icons/bs'
import { Link } from 'react-router-dom'
const EditProfile = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [data,setData]=useState({
        fullname:'',
        previewImage:'',
        avatar:undefined,
        userId:useSelector((state)=>state?.auth?.data?._id)
        
    })
    


    function handleImageUploads(e)
    {
        e.preventDefault();
        const uploadedImg=e.target.files[0];
        if(uploadedImg)
        {
            const fileReader=new FileReader()
            fileReader.readAsDataURL(uploadedImg)
            fileReader.addEventListener("load",function(){
                setData({
                    ...data,
                    previewImage:this.result,
                    avatar:uploadedImg
                })
            })

        }


    }
    function handleInputChange(e){
     const {name,value}=e.target
     setData({
    ...data,
    [name]:value
     });
    }
async function onFormSubmit(e)
{
    e.preventDefault();
    
     
    if(!data.fullname || !data.avatar)
    {
        toast.error("All Fields are required")
        return;
    }
    if(data.fullname.length<5)
    {
        toast.error("Invalid Name")
        return;
    }
    const formData=new FormData();
    formData.append('fullname',data.fullname)
    formData.append('avatar',data.avatar)
     await dispatch(updateProfile([data.userId,formData]))
 
    await dispatch(getUserData())
    navigate('/user/profile')
}

  return (
   <Second>
<div className="flex items-center justify-center h-[100vh]">
                <form
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_200px_purple]"
                >
                    <h1 className="text-center text-2xl font-semibold">Edit profile</h1>
                    <label className="cursor-pointer" htmlFor="image_uploads">
                        {data.previewImage ? (
                            <img 
                                className="w-28 h-28 rounded-full m-auto"
                                src={data.previewImage}

                            />
                        ): (
                            <BsPersonCircle className="w-28 h-28 rounded-full m-auto" />
                        )}
                    </label>
                    <input 
                    type="file"
                    onChange={handleImageUploads}
                    id='image_uploads'
                    name='image_uploads' 
                    accept='.jpg, .JPG,.jpeg, .JPEG, .png, .PNG, .svg, .SVG'
                    className='hidden'/>


<div className='flex flex-col gap-1'>
    <label htmlFor='fullname' className='text-lg  font-semibold'>
        Name
    </label>
    <input
    required
     type="text" 
     name="fullname" 
     id="fullname"
     placeholder='Enter your name ' 
     value={data.fullname}
     onChange={handleInputChange}
     className='bg-transparent px-2 py-2 border'/>
     
</div>


<button
   type='submit'
   className='w-full bg-purple-500 hover:bg-purple-600 rounded-sm px-2 py-2 text-center font-semibold hover:font-bold  cursor-pointer'
>
UPDATE
</button>
<Link to='/user/profile'>
    <p className='text-center text-accent cursor-pointer '> Go Back</p>
</Link>

                    </form>
                    </div>
   </Second>
  )
}

export default EditProfile
