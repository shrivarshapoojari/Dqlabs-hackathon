import React from "react";
 
import { Link } from "react-router-dom";
import HomePageMainImage from '../Assets/Images/homePageMainImage.png'
import Second from "../layouts/Second";
const Home = () => {
  return (
    <Second>
      <div className="pt-10 text-white flex items-center justify-center gap-10 mx-16  h-[90vh]">
        <div className="w-1/2 space-y-6">
            <h1 className="text-5xl font-semibold">
                Find Out best <span className="text-purple-500 font-bold"> Online Courses </span>
            </h1>
            <p className="text-xl text-gray-200">
                We have a laarge library of courses taught by industry experts and qualified faculties at a affordable price.
            </p>
            <div className="space-x-6">
                <Link to ='/courses'>
                    <button className="bg-purple-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-purple-600 transition-all ease-in-out duration-300">
                        Explore Courses
                    </button>
                </Link>
                <Link to ='/contact'>
                    <button className="border-purple-500 px-5 py-3 rounded-md font-semibold text-lg cursor-pointer hover:bg-purple-600 transition-all ease-in-out duration-300">
                    Contact Us
                    </button>
                </Link>
            </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
       <img src={HomePageMainImage} alt="image" />
        </div>
      </div>
      
      </Second>
  );
};

export default Home;
