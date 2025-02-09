const User = require("../models/userModule");
const createError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendConfirmationEmail } = require("../lib/nodeMailer");

// register a user
exports.signup = async (req, res, next) => {
  try {
    const characters =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let activationCode = "";
    for (let i = 0; i < 25; i++) {
      activationCode +=
        characters[Math.floor(Math.random() * characters.length)];
    }

    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return next(new createError("User already exists", 400));
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create new user
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
      activationCode: activationCode,
    });
    await newUser.save();

    // Send email with activation code
    sendConfirmationEmail(newUser.email, newUser.activationCode);

    // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, "secretkey123", {
      expiresIn: "90d",
    });

    // Send response with token and user data
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
      user: {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,
        activationCode: newUser.activationCode,
      },
    });
  } catch (err) {
    next(err);
  }
};

// verify user
exports.verifyUser = async (req, res, next) => {
  User.findOne({ activationCode: req.params.activationCode }).then((user) => {
    if (!user) {
      return res.send({
        message: "ce code d'activation est faux",
      });
    }
    user.isActivee = true;
    user.save().then(() => {
      res.send({
        message: "votre compte est activé",
      });
    });
  });
};

// login a user
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return next(new createError("User not found", 404));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return next(new createError("Incorrect password", 401));
    }

    if (!user.isActivee) {
      return res.status(401).json({
        accessToken: null,
        message: "Please verify your email for activation",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, "secretkey123", {
      expiresIn: "90d",
    });

    res.status(200).json({
      status: "success",
      message: "User logged in successfully",
      token,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


// get me using token
exports.authentificateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return next(new createError("unauthorized", 401));
  jwt.verify(token, "secretkey123", async (err, user) => {
    if (err) return next(new createError("unauthorized", 401));
    const currentUser = await User.findById(user.id);
    res.status(200).json({
      status: "success",
      user: {
        _id: currentUser._id,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        role: currentUser.role,
      },
    });
  });
};
