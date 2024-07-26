const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./router/userRoute"); // Correct path to userRoute

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.URI)
  .then(() => {
    console.log("Connected successfully");

    app.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.error("Error starting server:", err);
      } else {
        console.log(`Server is running on port ${process.env.PORT || 8000}`);
      }
    });
  })
  .catch((error) => {
    console.log("Error", error);
  });

// Use the user routes
app.use("/users", userRouter);

app.get("/", (req, res) => {
  res.send("API running");
});



