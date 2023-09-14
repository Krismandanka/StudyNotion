import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { buyCourse } from "../services/operations/studentFeaturesAPI";
import { useState } from "react";
import { useEffect } from "react";
import { fetchCourseDetails } from "../services/operations/couseDetailsAPI";
import GetAvgRating from "../utils/avgRating"


const CourseDetails = () => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {loading} = useSelector((state)=>state.profile);
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const response = await fetchCourseDetails(courseId, dispatch);
        // console.log("getCourseDetails -> response", response);
        setCourseData(response);
        console.log("course details",response)
        // console.log(courseData?.ratingAndReviews)
      } catch (error) {
        console.log("course details page could not fetch details");
      }
    };
    getCourseDetails();
  }, [courseId]);


  const [avgReviewCount,setAverageReviewCount] = useState(0);
  useEffect(()=>{
    if(courseData?.ratingAndReviews?.length > 0){
        
        const count = GetAvgRating(courseData?.ratingAndReviews);
        setAverageReviewCount(count);
        console.log("getCourseDetails -> count", parseInt(count));
        }
  },[courseData])

  const [totalNoOfLecture,setTotalNoOfLecture] =useState(0);

  // useEffect(()=>{
  //   let lecture =0;
  //   response?.data?.CourseDetails?.courseContent?.forEach((sec)=>{
  //     lecture+=sec.subSection.length||0
  //   })
  //   setTotalNoOfLecture(lecture);
  //   console.log("total lex",lecture);
    


  // },[courseData])

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    
  };

  if(loading || courseData){
    return (
      <div>
        Loading...
      </div>
    )
  }
  if(!courseData){
    return (
      <div>
        Error
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <button className="bg-yellow-50 p-6 mt-10" onClick={handleBuyCourse}>
        Buy Now
      </button>
    </div>
  );
};

export default CourseDetails;
