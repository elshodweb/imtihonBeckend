const express = require("express");
const PORT = require("./config").PORT || 3000;

const UserRouter = require("./routers/userRouter.js");
const BlogRouter = require("./routers/blogRouter.js");
const fileUpload = require("express-fileupload")
const cookie = require("cookie-parser");

const server = express();


server.use(express.json());
server.use(fileUpload())
server.use(UserRouter);
server.use(BlogRouter);
server.use(cookie());


server.listen(PORT,()=>console.log(PORT))