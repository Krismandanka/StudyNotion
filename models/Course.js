
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        require:true
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    courseDescription:{
        type:String,
        trim:true,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
    },
    whatYouWillLearn:{
        type:String,
    },
    courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    price:{
        typr:Number
    },
    thumbnail:{
        type:String,
    },
    tag: {
		type: [String],
		required: true,
	},
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tag"
    },
    studentEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    }],
    status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    instructions: {
		type: [String],
	},


},{ timestamps: true })

module.exports = mongoose.model("Course",courseSchema);