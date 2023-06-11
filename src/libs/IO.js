let {readFile, writeFile } = require("fs/promises")

 class IO {
  constructor(path) {
    this.path = path;
  }
  async read() {
    let data = await readFile(this.path, { encoding: "utf-8" });
    return data ? JSON.parse(data) : [];
  }
  write(data) {
    writeFile(this.path, JSON.stringify(data, null, 2) );
    return;
  }
}
module.exports = IO;