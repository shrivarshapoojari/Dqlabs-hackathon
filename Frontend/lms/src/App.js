 
import './App.css';
 
import Home from './components/Home';
import Notfound from './pages/Notfound';
import Signup from './pages/Signup';
import {

  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Aboutus from './pages/Aboutus';
import SignIn from './pages/SignIn';
import Contactus from './pages/Contactus';
import Denied from './pages/Denied';
import CourseList from './pages/courses/CourseList';
import CourseDescription from './pages/courses/CourseDescription';
import CreateCourse from './pages/courses/CreateCourse';
import RequireAuth from './components/Auth/RequireAuth';
 import Profile from './pages/User/Profile';
import EditProfile from './pages/User/EditProfile';
import Changepassword from './pages/User/Changepassword';
import ForgotPassword from './pages/User/ForgotPassword';
import ResetForgotPass from './pages/User/ResetForgotPass'
import Checkout from './pages/Payments/Checkout';
import PaymentSuccess from './pages/Payments/PaymentSuccess';
import PaymentFailed from './pages/Payments/paymentFailed';
import Second from './layouts/Second';
import Display from './pages/Dashboard/Display';
import Addlecture from './pages/Dashboard/AddLecture';
import Job from './pages/Job';
function App() {
  return (
    <>
      <BrowserRouter>
                 <Routes>
                        
                         <Route exact path='/' element={<Home/>}/>
                         <Route exact path='/second' element={<Second/>}/>
                         <Route exact path='/about' element={<Aboutus/>}/>
                         <Route exact path='/signup' element={<Signup/>}/>
                         <Route exact path='/job' element={<Job/>}/>
                         <Route exact path='/login' element={<SignIn/>}/>
                         <Route exact path='/forgot' element={<ForgotPassword/>}/>
                         <Route exact path='/api/user/reset/:resetToken'element={<ResetForgotPass/>}/>
                         <Route exact path='/contact' element={<Contactus/>}/>
                         <Route exact path='/courses' element={<CourseList/>}/>
                         <Route exact path='/course/description' element={<CourseDescription/>}/>
                            <Route element={<RequireAuth allowedRoles={["ADMIN"]}/>}>
                              <Route exact path='/courses/create' element={<CreateCourse/>}/>
                              <Route exact path='/course/addlecture' element={<Addlecture/>}/>
                            </Route>
                            <Route element={<RequireAuth allowedRoles={["ADMIN","USER"]}/>}>
                              <Route exact path='/user/profile' element={<Profile/>}/>
                              <Route exact path='/user/editprofile' element={<EditProfile/>}/>
                              <Route exact path='/user/changepassword' element={<Changepassword/>}/>
                              <Route exact path='/checkout' element={<Checkout/>}/>
                              <Route exact path='/checkout/success' element={<PaymentSuccess/>}/>
                              <Route exact path='/checkout/failed' element={<PaymentFailed/>}/>
                              <Route exact path='/course/displayLectures' element={<Display/>}/>
                              
                            </Route>

                         <Route exact path='/denied' element={<Denied/>}/>
                         

                         <Route exact path='*' element={<Notfound/>}/>
                 </Routes>
      </BrowserRouter>
      
    </>
   
  )
}

export default App;


 