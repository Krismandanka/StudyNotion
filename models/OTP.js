
const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
// const mailSender = require("../utils/mailSender");
 const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// pre-save or post hook
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse= await mailSender(email,"verificatin aemai from study notion",emailTemplate(otp));
        console.log("email sebd succesfullt",mailResponse);
    }catch(error){
        console.log("error accured while sending mail",error);
        throw error;
    }
}
OTPSchema.pre("save",async function(next){
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})



module.exports = mongoose.model("OTP",OTPSchema);