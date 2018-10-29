const fs = require('fs');
const path = require('path');

class Explorer {
  constructor() {
    this.files = [];
  }

  listFiles(path) {
    this.files = [];
    this.walk(path);
    return this.files;
  }

  getFiles() {
    return this.files;
  }

  getFileContent(file) {
    return fs.readFileSync(file).toString();
  }

  walk(directoryName, callback) {
    const self = this;
    let files = [];
    fs.readdir(directoryName, function(e, files) {
      if (e) {
        console.log('Error: ', e);
        return;
      }
      files.forEach(function(file) {
        var fullPath = path.join(directoryName,file);
        fs.stat(fullPath, function(e, f) {
          if (e) {
            console.log('Error: ', e);
            return;
          }
          if (f.isDirectory()) {
            self.walk(fullPath);
          } else {
            if(path.extname(fullPath) === '.hpgl') {
              self.files.push(fullPath);
            }
          }
        });
      });
    });
  };
}

module.exports = Explorer;
