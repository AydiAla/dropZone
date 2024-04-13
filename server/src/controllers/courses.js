const Course = require("../models/Courses");
const Category = require("../models/Categories");

exports.createCourse = async (req, res) => {
  try {
    // read the data from the request body
    const data = req.body;

    // create a new Course using the data
    const course = new Course(data);
    // save the Course
    const newCourse = await course.save();

    // Update the category
    await Category.updateOne(
      { _id: newCourse.categoryIds },
      { $push: { courses: newCourse } } // Save the entire course object
    );

    // send the saved Course in the response
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("attachments");
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send({ error });
  }
};
//get course by id
exports.getCourseById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // get the data from the database using the id
    const course = await Course.findById(id).populate("attachments");
    // send the course in the response
    res.status(200).send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

//update course by id
exports.updateCourseById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // get the data from the request body
    const data = req.body;
    // update the course
    const updatedCourse = await Course.findByIdAndUpdate(
      { _id: id, data },
      { new: true }
    );
    // send the updated course in the response
    res.status(200).send(updatedCourse);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete course by id
exports.deleteCourseById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // delete the course
    const course = await Course.findByIdAndDelete(id);
    // send the response
    res.status(204).send(course);
  } catch (error) {
    res.status(500).send(error);
  }
};

//delete all courses
exports.deleteCourses = async (req, res) => {
  try {
    // delete all courses
    const delcourse = await Course.deleteMany();
    // send the response to the client
    res.status(200).send(delcourse);
  } catch (error) {
    res.status(500).send(error);
  }
};
