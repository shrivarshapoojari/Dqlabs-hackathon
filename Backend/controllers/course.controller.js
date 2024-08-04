import AppError from "../utils/appError.js";
import Course from "../models/course.model.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";

import upload from "../middlewares/multer.middleware.js";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");
    if (courses) {
      res.status(200).json({
        success: true,
        message: "Couses fetched",
        courses,
      });
    }
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const getLecturesById = async (req, res, next) => {
  try {
    const {id} = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("No course found", 400));
    }
    res.status(200).json({
      success: true,
      message: "Course fetchecd",
      lectures: course.lectures,
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};
export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy) {
      return next(new AppError("Title and all things required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "Dummy",
        secure_url: "Dummy",
      },
    });
    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          course.thumbnail.public_id = result.public_id;
          course.thumbnail.secure_url = result.secure_url;
          // after uploading remove file from local server

          fs.rm(`uploads/${req.file.filename}`);
        }
        await course.save();
        res.status(200).json({
          success: true,
          message: "Coure Created Success",
        });
      } catch (e) {
        return next(new AppError(e.message, 500));
      }
    }
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};
export const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body, // updates the info given in reqbody
      },
      {
        runValidators: true,
      }
    );

    if (!course) {
      return next(new AppError("No course found", 404));
    }
    res.status(200).json({
      success: true,
      message: "Course Update Success",
    });
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("No course Found", 404));
    } else {
      await Course.findByIdAndDelete(id);
      res.status(200).json({
        success: true,
        message: "Deleted The Course",
      });
    }
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const addLectureToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;
    console.log(id);
    if (!title || !description) {
      return next(
        new AppError("title and description are necessary to add lecture", 500)
      );
    }
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("course doesnt exist", 500));
    }
    const lectureData = {
      title,
      description,
      lecture: {},
    };

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
        chunk_size: 50000000, // 50 mb size
        resource_type: "video",
      });

      if (result) {
        lectureData.lecture.public_id = result.public_id;
        lectureData.lecture.secure_url = result.secure_url;
        // after uploading remove file from local server

        fs.rm(`uploads/${req.file.filename}`);
      }

      await course.lectures.push(lectureData);
      course.numberOfLectures = course.lectures.length;
      await course.save();
      res.status(200).json({
        success: true,
        message: "Lecture addded",
        course,
      });
    }
  } catch (e) {
    return next(new AppError(e.message, 500));
  }
};

export const deleteLectureById = async (req, res, next) => {
 
 
 
 try
 {

 
  const {courseId} = req.params.courseId;
  const {lectureId} = req.params.lectureId;
  


   console.log( 'course id' ,req.params.courseId)
  if (!req.params.courseId) {
    return next (new AppError(
      "Course Id  required to remove a lecture",
      400
    ));
  }
  if (!req.params.lectureId) {
    return next (new AppError(
      "Lecture Id  required to remove a lecture",
      400
    ));
  }
  
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    console.log(req.params.courseId)
    return next(new AppError("Course Doesnt exist", 404));
  }
  const lectureIndex = course.lectures.findIndex(
    (lecture) => lecture._id.toString() === req.params.lectureId.toString()
  );
  if (lectureIndex === -1) {
    return next(new AppError("Lecture does not exist.", 404));
  }

  await cloudinary.v2.uploader.destroy(
    course.lectures[lectureIndex].lecture.public_id,
    {
      resource_type: "video",
    }
  );

  // Remove the lecture from the array
  course.lectures.splice(lectureIndex, 1);

  // update the number of lectures based on lectres array length
  course.numberOfLectures = course.lectures.length;
  // Save the course object
  await course.save();

  // Return response
  res.status(200).json({
    success: true,
    message: "Course lecture removed successfully",
  });
} catch(e)
{
  console.log(e)
  return next(new AppError(e.message, 500));
}

};
