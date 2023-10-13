import "./App.css";
import {Route,Routes} from "react-router-dom"
import Home from "./Pages/Home";
import Navbar from "./Components/common/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import OpenRoute from "./Components/core/auth/OpenRoute";
import VerifyOtp from "./Pages/VerifyOtp";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import Setting from "./Components/core/Dashboard/Settings";
import Catalog from "./Pages/Catalog";
import CourseDetails from "./Pages/CourseDetails";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch } from "react";
import Cart from "./Components/core/Dashboard/Cart/index";








function App() {
  // const user = useSelector((state) => state.profile.user);
  // const dispatch = useDispatch();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  return ( 
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>

        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>

        <Route path="/verify-email" element={<VerifyOtp/>}/>

        <Route path="/forgot-password" element={<ForgotPassword/>}/>

        <Route path="/update-password/:id" element={<ResetPassword/>}/>

        <Route path="dashboard/my-profile" element={<MyProfile />} />

        <Route path="dashboard/settings" element={<Setting />} />

        <Route path="/catalog/:catalog" element={<Catalog />} />

        <Route path="/courses/:courseId" element={<CourseDetails />} />

        {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="dashboard/cart" element={<Cart />} />
              {/* <Route
                path="dashboard/enrolled-courses"
                element={<EnrollledCourses />}
              />
              <Route
                path="dashboard/purchase-history"
                element={<PurchaseHistory />}
              /> */}
            </>
          )}

      </Routes>

    </div>
  );
}

export default App;
