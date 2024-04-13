const mongoose = require("mongoose");
const Category = require("../models/Categories");
const multer = require("multer");

let filename = ""; // Define filename variable outside the storage

const storage = multer.diskStorage({
  destination: "../uploads", // Adjust the destination path as per your project structure
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    filename = fl; // Assign filename to the variable defined outside
  },
});

exports.upload = multer({ storage: storage });

exports.createCategory = async (req, res) => {
  try {
    const data = req.body;
    const category = new Category(data);
    category.imageUrl = filename; // Assign the filename to imageUrl
    const savedCategory = await category.save();
    filename = ""; // Reset filename after saving
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get the Category by id
exports.getCategoryById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // get the data from the database using the id
    const category = await Category.findById(id).populate("courses");
    // send the Category in the response
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

//get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("courses");
    res.status(200).send(categories);
  } catch (error) {
    res.status(500).send(error);
  }
};
//update Category by id
exports.updateCategoryById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // get the data from the request body
    const data = req.body;
    // update the Category
    const updatedCategory = await Category.findByIdAndUpdate(id, data, {
      new: true,
    });
    // send the updated Category in the response
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(500).send(error);
  }
};
//delete Category by id
exports.deleteCategoryById = async (req, res) => {
  try {
    // get the id from the request
    const id = req.params.id;
    // delete the Category
    const category = await Category.findByIdAndDelete(id);
    // send the deleted Category in the response
    res.status(200).send(category);
  } catch (error) {
    res.status(500).send(error);
  }
};

// get All courses in categories
exports.getAllCoursesInCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate("courses");
    res.status(200).send(category.courses);
  } catch (error) {
    res.status(500).send(error);
  }
};
