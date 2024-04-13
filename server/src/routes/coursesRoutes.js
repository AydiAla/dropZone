const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const Attachment = require("../models/Attachments");
const Course = require("../models/Courses");
const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
} = require("../controllers/courses");

const courseRouter = express.Router();

const dir = "./files";
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

courseRouter.post("/create", createCourse);
courseRouter.get("/all", getAllCourses);
courseRouter.get("/getCoursById/:id", getCourseById);
courseRouter.put("/update/:id", updateCourseById);
courseRouter.delete("/delete/:id", deleteCourseById);

courseRouter.post(
  "/upload/:courseId",
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file was uploaded" });
    }

    const name = req.body.name;
    const file = req.file.path;
    const courseId = req.params.courseId;

    if (!name || !courseId) {
      return res
        .status(400)
        .json({ message: "Name and course ID are required" });
    }

    try {
      const attachment = await Attachment.create({
        name: name,
        file: file,
        courseId: courseId,
      });

      const course = await Course.findById(courseId);

      if (!course) {
        return res
          .status(404)
          .json({ status: "error", message: "Course not found" });
      }

      course.attachments.push({ id: attachment._id, name: attachment.name });
      await course.save();

      res
        .status(201)
        .json({ status: "ok", message: "File uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: "error", message: error.toString() });
    }
  }
);

courseRouter.get("/get-files/:courseId", async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const attachments = await Attachment.find({ courseId: courseId });

    if (attachments.length === 0) {
      return res
        .status(404)
        .send({ status: "error", message: "Files not found" });
    }

    res.send({ status: "ok", data: attachments });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

courseRouter.get("/get-files/:file", function (req, res) {
  var file = req.params.file;
  var fileLocation = path.join(__dirname, "../../files", file);
  res.sendFile(fileLocation, {
    headers: { "Content-Type": "application/pdf" },
  });
});
;




module.exports = courseRouter;
