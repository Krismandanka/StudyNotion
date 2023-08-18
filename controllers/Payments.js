const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");


// capture the payment initiate thr razorpay order

exports.capturePayment = async (req, res) => {
  try {
    // get course id user id
    const { course_id } = req.body;
    const userId = req.user.id;

    // validation
    // valid course id
    if (!course_id) {
      return res.json({
        success: false,
        message: "plz provides valid course id",
      });
    }
    // valid course deatls
    let course;
    try {
      course = await Course.findById(course_id);
      if (!course) {
        return res.json({
          success: false,
          message: "could not find the coursw",
        });
      }
      const uid = new mongoose.Types.ObjectId(userId);

      if (course.studentEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "student is already enrolled",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // order create
    const amount = course.price;
    const currency = "INR";
    const option = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        course_id: course_id,
        userId,
      },
    };

    try {
      const paymentResponse = await instance.orders.create(option);
      console.log(paymentResponse);
      return res.status(200).json({
        success: true,
        ourseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,

        message: error.message,
      });
    }

    // returb
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// verify signature
exports.verifySignature = async (req, res) => {
  const webhookSecret = "12345678";
  const signature = req.headers["x-razorpay-signature"];
  const shasum = crypto.createHmac("sha256", webhookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest == signature) {
    console.log("payment authorize");

    const { course_Id, userId } = req.user.payload.payment.entity.notes;

    try {
      const enrolledCourse = await Course.findOne(
        { _id: course_Id },
        {
          $push: { studentEnrolled: userId },
        },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "course not found",
        });
      }
      console.log(enrolledCourse);
      // find the student and add course list of enroole courdser
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { courses: course_Id },
        },
        { new: true }
      );
      console.log(enrolledStudent);
    //   mail send counfrinmation
        const emailResponse = await mailSender(
                                enrolledStudent.email,
                                "congratulation from code help",
                                "Concratulation you onorded into new code help coourse,",
                                
        );
        console.log(emailResponse);
        return res.status(200).json({
            success:true,
            message:"Signature verified and course added"
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
  }
  else{
    return res.status(400).json({
        success:false,
        message:"invalid req"
    })
  }
};
xports.sendPaymentSuccessEmail = async (req, res) => {
  const {amount,paymentId,orderId} = req.body;
  const userId = req.user.id;
  if(!amount || !paymentId) {
      return res.status(400).json({
          success:false,
          message:'Please provide valid payment details',
      });
  }
  try{
      const enrolledStudent =  await User.findById(userId);
      await mailSender(
          enrolledStudent.email,
          `Study Notion Payment successful`,
          paymentSuccess(amount/100, paymentId, orderId, enrolledStudent.firstName, enrolledStudent.lastName),
      );
}
  catch(error) {
      console.error(error);
      return res.status(500).json({
          success:false,
          message:error.message,
      });
  }
}












