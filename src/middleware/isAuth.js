import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/index.js";
import { IO } from "../libs/IO.js";
import { resolve } from "path";

const UserFile = new IO(resolve("src", "db", "users.json"));
export let verifyToken = async (req, res, next) => {
  try {
    const users = await UserFile.read();
    let token = req.cookies.token;
    const { id } = jwt.verify(token, SECRET_KEY);
    const findIndex = users.findIndex((u) => u.id === +id && !u.isDelete);
    if (findIndex < 0) {
      throw new Error("User for this id was not found");
    }
    next();
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};
