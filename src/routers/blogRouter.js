let { Router } = require("express");
const POST_BLOG = require("../controllers/blog");
const GET_BLOGS = require("../controllers/getBlogs");

const BlogRouter = Router();

BlogRouter.post("/blog", POST_BLOG);
BlogRouter.get(["/blog", "/blog/:id"], GET_BLOGS);

module.exports = BlogRouter;
