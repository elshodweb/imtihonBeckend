let jwt = require("jsonwebtoken");
let { resolve } = require("path");
let { SECRET_KEY } = require("./../config");
let IO = require("./../libs/IO");

let userFile = new IO(resolve("database", "users.json"));

let isAuth = async (req, res, next) => {
  try {
    let token = req?.cookies?.token;
    if (!token) {
      throw new Error(
        "sizda token yo'q.Siz token olish uchun ro'yhatdan o'tin yokiy tizimga kiring"
      );
    }
    let users = await userFile.read();
    let { id } = jwt.verify(token, SECRET_KEY);
    let findIndex = users.findIndex((u) => u.id == id);
    if (findIndex < 0) {
      throw new Error("bunday idagi user o'chib ketgan");
    }
    req.user_id = id;
    next();
  } catch (err) {
    res.status(400).json({ status: 400, message: err.message });
  }
};
module.exports = isAuth;
