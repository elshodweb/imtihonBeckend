let IO = require("../libs/IO");
let path = require("path");
let userFile = new IO(path.resolve("database", "blogs.json"));
let historyFile = new IO(path.resolve("database", "historyViews.json"));

let GET_BLOGS = async (req, res) => {
  try {
    console.log(req.cookies);

    let id = req?.params?.id;
    let views = await historyFile.read();
    let blogs = await userFile.read();
    if (id) {
      let blog = blogs.find((b) => b.id == id);
      if (!blog) {
        throw new Error("bunday id dagi malumot topilmadi");
      }
      let findHistory = views.findIndex(v=>v.blog_id==id);
      console.log(findHistory);
      res.status(200).json(blog);
    } else {
      res.status(200).json(blogs);
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = GET_BLOGS;
