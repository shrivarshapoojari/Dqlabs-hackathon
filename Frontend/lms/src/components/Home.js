 


import React from "react";
 
import { Link } from "react-router-dom";
import HomePageMainImage from '../Assets/Images/homePageMainImage.png'
import Second from "../layouts/Second";
const Home = () => {
  return (
    <Second>
      <div className="pt-10 text-white flex md:flex-row items-center justify-center gap-10 mx-16  h-[90vh] flex-col">
        <div className="md:w-1/2 space-y-6">
            <h1 className="text-5xl font-semibold">
                Find Out best <span className="text-purple-500 font-bold"> Online Courses </span>
            </h1>
            <p className="md :text-xl  text-gray-200 text-lg">
            Gramin Shakthi is a low-cost platform designed to equip rural populations with relevant life and career skills, fostering financial independence and sustainable growth. Through affordable and interactive training, we bridge the skills gap and enhances employability.
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