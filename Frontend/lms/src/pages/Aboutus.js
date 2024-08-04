import React from 'react'
import Second from '../layouts/Second'
import aboutMainimg from '../Assets/Images/aboutMainImage.png'
import steve from '../Assets/Images/steveJobs.png'
import apj from '../Assets/Images/apj.png'
 
import gates from '../Assets/Images/billGates.png'
import newton from '../Assets/Images/einstein.png'
const Aboutus = () => {
  return (
    <Second>
       <div className='flex flex-col text-white pl-20 pt-20'>
           <div className='flex items-center gap-5 mx-10'>
                <section className='w-1/2 space-y-10 '>
                     <h1 className='text-5xl text-purple-500 font-semibold' >
                            Affordable and Quality Education

                     </h1>
                     <p className='text-xl text-gray-200'>
                     Welcome to MERNERA, where learning meets innovation! Our online platform is dedicated to providing high-quality courses that empower you to master new skills and achieve your goals. With expert instructors, interactive content, and a supportive community, we strive to make learning accessible and enjoyable. Join us on your journey to personal and professional growth!
                     </p>
                </section>
                <div className='w-1/2'>
                    <img 
                    src={aboutMainimg} 
                    alt="about img " 
                    className='drop-shadow-2xl'
                    id='test1'

                    />

                </div>
           </div>
            <div className="carousel w-1/2 my-10 mx-auto">
                        <div id="slide1" className="carousel-item relative w-full">
                            <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                                    <img src={apj} className="w-40 rounded-full border-2 border-purple-400" />
                                    <p className='text-xl text-gray-200'> "Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work." </p>
                                     <h3 className='text-2xl font-semibold'> APJ Abdul Kalam</h3>
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide4" className="btn btn-circle">❮</a> 
                                    <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                           
                        </div>
                        </div> 
                        <div id="slide2" className="carousel-item relative w-full">
                             <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                                    <img src={newton} className="w-40 rounded-full border-2 border-purple-400" />
                                    <p className='text-xl text-gray-200'>“I am enough of an artist to draw freely upon my imagination. Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.”</p>
                                     <h3 className='text-2xl font-semibold'>Albert Eeinstein</h3>
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide1" className="btn btn-circle">❮</a> 
                                    <a href="#slide3" className="btn btn-circle">❯</a>
                                    </div>
                             </div>
                      </div> 
                        <div id="slide3" className="carousel-item relative w-full">
                             <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                                    <img src={steve} className= "w-40 rounded-full border-2 border-purple-400"  />
                                    <p className='text-xl text-gray-200'>“You can’t connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future.” </p>
                                     <h3 className='text-2xl font-semibold'>Steve Jobs</h3>
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide2" className="btn btn-circle">❮</a> 
                                    <a href="#slide4" className="btn btn-circle">❯</a>
                                    </div>
                             </div>
                        </div> 
                        <div id="slide4" className="carousel-item relative w-full">
                            <div className='flex flex-col items-center justify-center gap-4 px-[15%]'>
                                    <img src={gates} className="w-40 rounded-full border-2 border-purple-400" />
                                    <p className='text-xl text-gray-200'>“I can understand wanting to have millions of dollars, there’s a certain freedom, meaningful freedom, that comes with that. But once you get much beyond that, I have to tell you, it’s the same hamburger.”</p>
                                            <h3 className='text-2xl font-semibold'>Bill Gates</h3>
                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide3" className="btn btn-circle">❮</a> 
                                    <a href="#slide1" className="btn btn-circle">❯</a>
                                    </div>
                            </div>
                        </div>
        </div>
       </div>

    </Second>
  )
}

export default Aboutus
