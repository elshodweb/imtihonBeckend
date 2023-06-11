let path = require("path");
let IO = require("../libs/IO");
let userFile = new IO(path.resolve("database", "blogs.json"));
let historyFile = new IO(path.resolve("database", "historyViews.json"));


let GET_BLOGS = async (req, res) => {
  try {
    let id = req?.params?.id;
    let views = await historyFile.read();
    let blogs = await userFile.read();
    if (id) {
      let blog = blogs.find((b) => b.id == id);
      if (!blog) {
        throw new Error("bunday id dagi malumot topilmadi");
      }
      let findIndexHistory = views.findIndex((v) => v.blog_id == id);
      let history = views[findIndexHistory];
      let user_id = req.user_id;
      let findIndexUserFromHistory = history.views_users.some(
        (i) => i == user_id
      );
      if (!findIndexUserFromHistory) {
        views[findIndexHistory].views_users.push(user_id);
      }
      historyFile.write(views);
      res.status(200).json(blog);
    } else {
      res.status(200).json(blogs);
    }
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};

module.exports = GET_BLOGS;
