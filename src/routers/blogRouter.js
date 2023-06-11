let { Router } = require("express");
const POST_BLOG = require("../controllers/blog");
const GET_BLOGS = require("../controllers/getBlogs");
const isAuth = require("../middleware/isAuth");

const BlogRouter = Router();

BlogRouter.post("/blog",isAuth, POST_BLOG);
BlogRouter.get(["/blog", "/blog/:id"], isAuth, GET_BLOGS);

module.exports = BlogRouter;
