const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const app = express();

// route
const userRoute = require("./routes/users");
const recipeRoute = require("./routes/recipes");

app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
require("dotenv").config();

app.get("/", (req, res) => {
  res.send("Hello World this is docker with nodemon");
});

const connectDb = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@cluster0.l9ikg.mongodb.net/recipe_app?retryWrites=true&w=majority`
    );
    console.log("Connected to mongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("mongoDB connected");
});

// all route

app.use("/api/users", userRoute);
app.use("/api/recipes", recipeRoute);

// error handleing middlewares
app.use((err, req, res, next) => {
  if (err) {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
  }
});

app.listen(port, () => {
  connectDb();
  console.log(`server is running on port ${port}`);
});
