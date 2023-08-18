const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");

// create sub section
exports.createSubSection = async (req, res) => {
  try {
    // fetch data from req boy
    const { title, timeDuration, description, sectionId } = req.body;
    // extact file
    const video = req.files.videoFile;

    // validation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "all field are require",
      });
    }
    // upload video to cloudinar

    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // create sub section
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });
    // push subsection id to section
    const updatedSection = await Section.findByIdAndUpdate(
      { courseId },
      {
        $push: {
          subSection: SubSectionDetails._id,
        },
      },
      { new: true }
    ).populate("subSection");;
    // res
    return res.status(200).json({
      success: true,
      message: "Sub section created successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create sub section",
      error: error.message,
    });
  }
};

// update subsection
exports.updateSubSection = async (req, res) => {
  try {
    const { SubsectionId, title, description, courseId } = req.body;
    const video = req?.files?.videoFile;

    let uploadDetails = null;
    if (video) {
      uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_VIDEO
      );
    }

    const SubSectionDetails = await SubSection.findByIdAndUpdate(
      { _id: SubsectionId },
      {
        title: title || SubSection.title,
        // timeDuration: timeDuration,
        description: description || SubSection.description,
        videoUrl: uploadDetails?.secure_url || SubSection.videoUrl,
      },
      { new: true }
    );
    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();
    return res.status(200).json({ success: true, data: updatedCourse });
  } catch (error) {
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// delete subsection
exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, courseId } = req.body;
    const sectionId = req.body.sectionId;

    if (!subSectionId || !sectionId) {
      return res.status(404).json({
        success: false,
        message: "all fields are required",
      });
    }

    const ifsubSection = await SubSection.findById({ _id: subSectionId });
    const ifsection = await Section.findById({ _id: sectionId });
    if (!ifsubSection) {
      return res.status(404).json({
        success: false,
        message: "Sub-section not found",
      });
    }
    if (!ifsection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }
    await SubSection.findByIdAndDelete({ subSectionId });
    await Section.findByIdAndUpdate(
      { ifsection },
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      { new: true }
    );
    const updatedCourse = await Course.findById(courseId)
      .populate({ path: "courseContent", populate: { path: "subSection" } })
      .exec();
    return res
      .status(200)
      .json({
        success: true,
        message: "Sub-section deleted",
        data: updatedCourse,
      });
  } catch (error) {
    console.error("Error deleting sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
  }
};
