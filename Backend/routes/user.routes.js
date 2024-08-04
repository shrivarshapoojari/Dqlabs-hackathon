import express from "express";
import upload from "../middlewares/multer.middleware.js";
const router = express.Router();
import {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
} from "../controllers/user.controller.js";
import {isLoggedIn} from "../middlewares/auth.middleware.js";

router.post("/register", upload.single("avatar"), register);

router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getProfile);

router.post("/reset", forgotPassword);
router.post("/reset/:resetToken", resetPassword);
router.post("/change/:id", isLoggedIn, changePassword);
router.put("/update/:userId", isLoggedIn, upload.single("avatar"), updateProfile);



export default router;
