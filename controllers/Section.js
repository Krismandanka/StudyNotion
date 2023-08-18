const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data validatiokn
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "missing propertirs",
      });
    }
    // createsection
    const newSection = await Section.create({ sectionName });

    // update courses
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      { courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    // return res
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create sectcion plz try gain",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "missing propertirs",
      });
    }
    const sectcion = await Section.findByIdAndUpdate(
      { sectionId },
      { sectionName },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "section updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update sectcion plz try gain",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    await Section.findByIdAndDelete({ sectionId });

    // 5Todo do we need to delete the entry from th ]e course schems
    

    return res.status(200).json({
      success: true,
      message: "section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delelte sectcion plz try gain",
      error: error.message,
    });
  }
};
