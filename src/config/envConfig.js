require("dotenv").config();


const env = {
  PORT : process.env.PORT,
  SECRET_KEY : process.env.SECRET_KEY  
}

module.exports = env;
