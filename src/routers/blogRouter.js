let {Router} = require("express");
const POST_BLOG = require("../controllers/blog");

const BlogRouter = Router();

BlogRouter.post("/blog",POST_BLOG)


module.exports = BlogRouter;