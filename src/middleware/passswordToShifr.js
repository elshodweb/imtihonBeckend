let bcrypt = require("bcrypt");

const toShifr = async (req, res, next) => {
  try {
    let password = req?.body?.password;
    if (password) {
      password = await bcrypt.hash(password, 12);
      req.body.password = password;
    }
    next();
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = toShifr;
