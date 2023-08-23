import React from 'react'
import { Link } from 'react-router-dom'
import CTAButton from "../Components/core/HomePage/Button";
import HighlightText from '../Components/core/HomePage/HighlightText';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../Components/core/HomePage/CodeBlocks';


const Home = () => {
  return (
    <div>
        {/* section1 */}
        <div  className=' mx-auto relative flex flex-col w-11/12 items-center justify-between text-white max-w-maxContent'>
          <Link to={"/signup"}>
            <div className='group mx-auto mt-16 p-1 rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
              <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                <p>Become a Instructor</p>
                <p>@</p>
              </div>
            </div>
          </Link>
          <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future with <HighlightText text={"Coding Skills"}/>
          </div>
          <div className=' mt-4 w-[90%] text-left md:text-center text-sm md:text-lg font-bold text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
          </div>
          <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
              learn More
            </CTAButton>
            <CTAButton active={false} linkto={"/signup"}>
              Book a Demo
            </CTAButton>

          </div>
          <div className='shadow-blue-200 mx-3 my-12 mx-3 my-12 shadow-blue-200 w-[70%] relative'>
            <div className='grad2 -top-10 w-[800px]'></div>
            <video muted loop autoPlay>
              <source src={Banner} type='video/mp4'/>
            </video>

          </div>
          {/* code section 1 */}
          <div>
            <CodeBlocks 
              position={"lg:flex-row"}
              heading={
                <div className='text-4xl font-semibold'>
                  Unlock Your
                  <HighlightText text={"coding potential"}/>
                  with our online courses
                </div>
              }
              subheading = {
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }
              ctabtn1={
                  {
                      btnText: "Try it yourself",
                      linkto: "/signup",
                      active: true,
                  }
              }
              ctabtn2={
                  {
                      btnText: "learn more",
                      linkto: "/login",
                      active: false,
                  }
              }

              codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
              codeColor={"white"}
              backgroudGradient={"grad"}

            />
          </div>

          {/* 2code  */}<div>
            <CodeBlocks 
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start
                        <HighlightText text={"coding in seconds"}/>
                    </div>
                }
                subheading = {
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {
                        btnText: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-25"}
                backgroudGradient={"grad1"}
            />
        </div>



        </div>
      
        


        {/* secrion2 */}
        {/* section 3 */}
        {/* <footer></footer> */}
    </div>
  )
}

export default Home