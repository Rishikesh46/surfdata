const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const router = require("./routes/blogRoutes");
const path = require("path");

const fileName = path.join(__dirname, "data", "blog.json");
const blogs = JSON.parse(fs.readFileSync(fileName, "utf-8"));
const blogRouter = require("./routes/blogRoutes");
const app = express();
app.use(express.json());
app.use("/blogs", blogRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

app.get("/blogs", blogRouter, function (req, res) {
  var p = req.query;
  let blog = blogs.find((blog) => {
    return blog.author === p;
  });

  if (blog) {
    res.status(200).json({
      status: "Sucessfull",
      data: blog,
    });
  } else {
    res.status(404).json({
      status: "user not found",
    });
  }
});