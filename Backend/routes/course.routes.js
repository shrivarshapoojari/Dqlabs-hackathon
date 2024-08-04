import express from "express";
const router = express.Router();
import {isLoggedIn,authorizedRoles,authorizedSubscriber} from "../middlewares/auth.middleware.js";
import {
  getAllCourses,
  createCourse,
  getLecturesById,
  updateCourse,
  deleteCourse,
  addLectureToCourseById,
  deleteLectureById
} from "../controllers/course.controller.js";

import upload from "../middlewares/multer.middleware.js";
 

router.get("/", getAllCourses);

router.post("/",isLoggedIn,authorizedRoles('ADMIN') , upload.single("thumbnail"), createCourse);

router.get("/:id", isLoggedIn,authorizedSubscriber,getLecturesById);
router.put("/:id", isLoggedIn, authorizedRoles('ADMIN') ,updateCourse);
router.delete("/:id", isLoggedIn, authorizedRoles('ADMIN') ,deleteCourse);
router.post("/:id", isLoggedIn, authorizedRoles('ADMIN') ,upload.single("lecture"),addLectureToCourseById);
router.delete("/:courseId/:lectureId", isLoggedIn, authorizedRoles('ADMIN') ,deleteLectureById);

export default router;
