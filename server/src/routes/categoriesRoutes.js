const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getAllCoursesInCategory,
} = require("../controllers/categories");
const { upload } = require("../controllers/categories.js");

const categoryRouter = express.Router();

categoryRouter.post("/create", upload.single("imageUrl"), createCategory);
categoryRouter.get("/all", getAllCategories);
categoryRouter.get("/getCategoryById/:id", getCategoryById);
categoryRouter.get("/getAllCoursesInCategory/:id", getAllCoursesInCategory);
categoryRouter.put("/update/:id", updateCategoryById);
categoryRouter.delete("/delete/:id", deleteCategoryById);

module.exports = categoryRouter;
