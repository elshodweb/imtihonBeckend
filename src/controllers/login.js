 const IO  = require("./../libs/IO");
 const { resolve }=  require("path");
 const jwt = require("jsonwebtoken");
 const { SECRET_KEY } = require("./../config");
 const bcrypt = require('bcrypt');
const UserFile = new IO(resolve("database","users.json"));
const LOGIN = async (req, res) => {
  try {
    let { username, password } = req?.body;
    console.log(username, password );
    let users = await UserFile.read();
    if (!(username && password)) {
      throw new Error("You have not submitted password or username");
    }
    
    
    let foundIndex = users.findIndex(
      async (u) => await bcrypt.compare(password,u.password) && u.username === username 
    );
    
    
    if (foundIndex < 0) {
      throw new Error("this User was not found");
    }
    if (users[foundIndex].isDelete) {
      throw new Error("this user already deleted");
    }

    
    let token = jwt.sign({id:users[foundIndex].id},SECRET_KEY,{expiresIn:"2 minutes"});
    
    res.cookie("token",token);

    res
      .status(400)
      .json({ message: "you are login" , Authorization: token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = LOGIN