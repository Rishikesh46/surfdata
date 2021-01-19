const uniqid = require("uniqid");
class Task {
  constructor(author, title, content, imageUrl) {
    this.id = uniqid();
    this.author = author;
    this.title = title;
    this.content = content;
    this.imageUrl = imageUrl;
  }
}

module.exports = Task;
