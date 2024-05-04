const express = require("express");
const movieRoute = require("./routes/movie.route.js");
const app = express();
const port = 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// routes
app.use("/api/movies", movieRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API Server Updated");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});