const express = require("express");
const courseRouter = require("./coursesRoutes");
const categoryRouter = require("./categoriesRoutes");
const attachmentRouter = require("./attachmentRoutes");
const authRouter = require("./authRoutes");

const rootRouter = express.Router();
rootRouter.use("/courses", courseRouter);
rootRouter.use("/categories", categoryRouter);
rootRouter.use("/attachments", attachmentRouter);
rootRouter.use("/auth", authRouter); // Correct usage of authRouter as middleware

module.exports = rootRouter;
