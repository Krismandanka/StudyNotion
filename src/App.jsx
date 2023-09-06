import "./App.css";
import {Route,Routes} from "react-router-dom"
import Home from "./Pages/Home";
import Navbar from "./Components/common/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import OpenRoute from "./Components/core/auth/OpenRoute";


function App() {
  return ( 
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>

        <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
      </Routes>

    </div>
  );
}

export default App;
