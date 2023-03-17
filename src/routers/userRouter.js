let { Router } = require("express");
const { REGISTER_USER } = require("../controllers/register");
const LOGIN  = require("../controllers/login");
const toShifr = require("./../middleware/passswordToShifr");
const UserRouter = Router();

UserRouter.post("/register", toShifr, REGISTER_USER);
UserRouter.post("/login", LOGIN);

module.exports = UserRouter;
