const express = require("express");
const PORT = require("./config").PORT || 3000;

const UserRouter = require("./routers/userRouter.js");
const BlogRouter = require("./routers/blogRouter.js");
const fileUpload = require("express-fileupload")
const cookies = require("cookie-parser");

const server = express();

server.use(cookies());

server.use(express.json());
server.use(fileUpload())
server.use(UserRouter);
server.use(BlogRouter);


server.listen(PORT,()=>console.log(PORT))