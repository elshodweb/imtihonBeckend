class Blog {
  constructor(id, title, text, user_id, imageName) {
    this.id = id;
    this.title = title;
    this.text = text;
    this.user_id = +user_id;
    this.image = imageName;
    return this;
  }
}
module.exports = Blog;
