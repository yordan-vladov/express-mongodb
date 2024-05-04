const express = require("express");
const mongoose = require("mongoose");
const movieRoute = require("./routes/movie.route.js");
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.use("/api/movies", movieRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

mongoose
  .connect(
    "mongodb://localhost:27017/sample_mflix"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
