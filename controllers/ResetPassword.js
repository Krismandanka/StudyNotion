const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
// resetPasswordToken
exports.resetPasswordToken = async (req, res, next) => {
  try {
    //get email
    const { email } = req.body;

    // check user for this email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "your email not registered",
      });
    }
    // link generate token
    const token = crypto.randomUUID();
    // user update by adding token expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordToken: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );
    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail
    await mailSender(
      email,
      "Password reset link",
      `password reset link: ${url}`
    );
    // return response
    return res.json({
      success: true,
      message: "email sent successfully,plz chexk your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "issue in resetpassword ",
    });
  }
};

// resetpassword
exports.resetPassword = async (req, res, next) => {
  try {
    // data fetc
    const { password, confirmpassword, token } = req.body;
    // data validation
    if (password !== confirmpassword) {
      return res.json({
        success: false,
        message: "pass not matching",
      });
    }

    const userDetails = await User.findOne({ token: token });
    // gat user details form token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "token invalid ",
      });
    }
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "time expires token",
      });
    }
    // no entry invalid token
    // token time expire
    // password hash
    const hashedPassword = await bcrypt.hash(password, 10);
    // pass update
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "password reset successfull",
    });
    // return response
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "reset passe rror",
    });
  }
};
