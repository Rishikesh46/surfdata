const fs = require("fs");
const path = require("path");
const fileName = path.join(__dirname, "..", "data", "blog.json");
const router = require("../routes/blogRoutes");
const Task = require("../models/blog");
const blogs = JSON.parse(fs.readFileSync(fileName, "utf-8"));
const sendErrorMessage = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const AppError = require("../helpers/appErrorClass");

const verifyPostRequest = (req, res, next) => {
  const requiredProperties = ["author", "title", "content", "imageUrl"];

  let result = requiredProperties.every((key) => {
    return req.body[key];
  });

  if (!result) {
    sendErrorMessage(
      new AppError(400, "unsucessfull", "request is not valid"),
      req,
      res
    );
  } else {
    next();
  }
};
const createBlog = (req, res, next) => {
  console.log(req.body);
  let blog = new Task(
    req.body.author,req.body.tittle,req.body.content,req.body.imageUrl
  );
  blogs.push(blog);
  fs.writeFile(fileName, JSON.stringify(blogs, null, 2), (err) => {
    if (err) {
      sendErrorMessage(
        new AppError(400, "unsucessfull", "request body is not valid"),
        req,
        res
      );
      return err;
    }

    sendResponse(201, "Sucessful", blog, req, res);
  });
};

const getAllBlogs = (req, res, next) => {
  sendResponse(200, "Sucessful", blogs, req, res);
};

const getBlogbyId = (req, res, next) => {
  console.log(req.params);
  let blog = blogs.find((blog) => {
    return blog.id === req.params.id;
  });

  if (blog) {
    res.status(200).json({
      status: "Sucessfull",
      data: blog,
    });
  } else {
    sendErrorMessage(
      new AppError(404, "unsucessfull", "User not Found"),
      req,
      res
    );
  }
};

const updateBlog = (req, res, next) => {
  let blog = blogs.find((blog) => {
    return blog.id === req.params.id;
  });
  if (blog) {
    Object.keys(req.body).filter((key) => {
      if (blog[key]) {
        blog[key] = req.body[key];
        fs.writeFile(fileName, JSON.stringify(blogs, null, 2), (error) => {
          if (error) {
            return sendErrorMessage(
              new AppError(400, "unsucessfull", "request body is not valid "),
              req,
              res
            );
          }
        });
        sendResponse(201, "Updation-sucessful", blog, req, res);
      }
      return sendErrorMessage(
        new AppError(400, "unsucessfull", " Add Valid Keys in body"),
        req,
        res
      );
    });
  }
  return sendErrorMessage(
    new AppError(
      400,
      "unsucessfull",
      "request body is not valid-- Add valid id"
    ),
    req,
    res
  );
};
const deleteBlog = (req, res, next) => {
  const blogPosition = blogs.findIndex((blog) => {
    return blog.id === req.params.id;
  });

  if (blogPosition >= 0) {
    blogs.splice(blogPosition, 1);
    fs.writeFile(fileName, JSON.stringify(blogs, null, 2), (error) => {
      if (error) {
        return sendErrorMessage(
          new AppError(400, "unsucessfull", "request body is not valid "),
          req,
          res
        );
      }
    });
    sendResponse(201, "Deletion-sucessful", blogs, req, res);
  }
  return sendErrorMessage(
    new AppError(404, "unsucessfull", "User not Found"),
    req,
    res
  );
};

module.exports.deleteBlog = deleteBlog;
module.exports.getAllBlogs = getAllBlogs;

module.exports.getBlogbyId = getBlogbyId;

module.exports.createBlog = createBlog;
module.exports.verifyPostRequest = verifyPostRequest;
module.exports.updateBlog = updateBlog;
