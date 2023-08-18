

const express = require("express");
const app = express();


const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");

const database = require("./config/database");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const {cloudinaryConnect}=require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT ||4000;
database.connect();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))
app.use(fileUpload({
    udeTempFiles:true,
    tempFileDir:"/temp"
}));

// clo
cloudinaryConnect();

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/auth",profileRoutes);
app.use("/api/v1/auth",courseRoutes);
app.use("/api/v1/auth",paymentRoutes);

// def routes

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"ypur server is up and running"
    })
})

app.listen(PORT,()=>{
    console.log("app is running at 4000");
})