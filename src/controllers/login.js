const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { resolve } = require("path");
const { SECRET_KEY } = require("./../config");
const IO = require("./../libs/IO");
const UserFile = new IO(resolve("database", "users.json"));

let scheme = new joi.object({
  username: joi.string().alphanum().min(5).max(32).required(),
});
const LOGIN = async (req, res) => {
  try {
    let { username, password } = req?.body;
    console.log(username, password);
    let users = await UserFile.read();
    if (!(username && password)) {
      throw new Error("You have not submitted password or username");
    }
    let { error } = scheme.validate({ username});
    if (error) {
      throw new Error(error.message);
    }
    let foundIndex = users.findIndex(
      async (u) =>
        (await bcrypt.compare(password, u.password)) && u.username === username
    );

    if (foundIndex < 0) {
      throw new Error("this User was not found");
    }
    if (users[foundIndex].isDelete) {
      throw new Error("this user already deleted");
    }

    let token = jwt.sign({ id: users[foundIndex].id }, SECRET_KEY, {
      expiresIn: "2 minutes",
    });

    res.cookie("token", token);

    res.status(400).json({ message: "you are login", Authorization: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = LOGIN;
