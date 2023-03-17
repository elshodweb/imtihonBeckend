class User {
  constructor(id,name,username,password,imageName){
    this.id = +id ;
    this.name = name ;
    this.username = username ;
    this.password = password ;
    this.image = imageName ;
    return this;
  }
}
module.exports = User