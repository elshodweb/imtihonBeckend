let IO = require("../libs/IO");
let path = require("path");
let userFile = new IO(path.resolve("database", "blogs.json"));
let uuid = require("uuid").v4;
let Blog = require("../models/blog");
let historyFile = new IO(path.resolve("database", "historyViews.json"));

let POST_BLOG = async (req, res) => {
  try {
    let { title, text } = req.body;
    let image = req?.files?.image;
    let blogs = await userFile.read();
    let views = await historyFile.read();
    console.log(views);
    if (!(title && text && image)) {
      throw new Error("malumotlar toliq emas yuborilmagan!");
    }

    let fileType = path.extname(image.name);
    let imageName = uuid() + fileType;

    let id = (blogs?.at(-1)?.id || 0) + 1;
    let blog = new Blog(id, title, text, imageName);
    let pathImg = path.resolve("fileUpload", imageName);

    blogs.push(blog);
    image.mv(pathImg);
    userFile.write(blogs);
    views.push({blog_id:id,views_users:[]});

    historyFile.write(views)
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = POST_BLOG;
