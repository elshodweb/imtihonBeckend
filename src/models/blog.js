class Blog {
  constructor(id,title,text,imageName){
    this.id = id ;
    this.title = title ;
    this.text = text ;
    this.image = imageName ;
    return this;
  }
}
module.exports = Blog