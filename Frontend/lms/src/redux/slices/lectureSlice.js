import axiosInstance from "../../config/axiosInstance"
import toast from "react-hot-toast"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

const initialState={
    lectures:[]
}

export const getCourseLecture=createAsyncThunk("/course/lecture/get" ,async(courseId)=>{
    try{
        console.log(courseId)
        const response=axiosInstance.get(`/courses/${courseId}`)
    toast.promise(response,{
        loading:"Finding lectures",
        success:"Lectures Fetched Successfully",
        error:"Failed to fetch lectures"
    })
        return (await response).data


    }catch(e){
        console.log(e)
        toast.error(e?.response?.data?.message)
    }

})


export const addLecture= createAsyncThunk("/course/addLecture",async(data)=>{
    try{
        const formData=new FormData();
        formData.append("lecture",data.lecture)
        formData.append("description",data.description)
        formData.append("title",data.title)

        const response =axiosInstance.post(`/courses/${data.id}`,formData)
        toast.promise(response,{
            loading:"Uploading lectures",
            success:"Lectures Uploaded Successfully",
            error:"Failed to Upload  lectures"
        })
            return (await response).data

    }
    catch(e){
        console.log(e)
        toast.error(e?.response?.data?.message)
    }
})
export const deleteLecture= createAsyncThunk("/course/deleteLecture",async(data)=>{
    try{
         

        const response =axiosInstance.delete(`/courses/${data.courseId}/${data.lectureId}`)
        toast.promise(response,{
            loading:"Deleting lecture",
            success:"Lecture deleted Successfully",
            error:"Failed to delete lectures"
        })
            return (await response).data

    }
    catch(e){
        console.log(e)
        toast.error(e?.response?.data?.message)
    }
})

const lectureSlice=createSlice({
    name:'lecture',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLecture.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.lectures;
        })
        .addCase(addLecture.fulfilled, (state, action) => {
            console.log(action);
            state.lectures = action?.payload?.course?.lectures;
        })
         


    }

})
export default lectureSlice.reducer