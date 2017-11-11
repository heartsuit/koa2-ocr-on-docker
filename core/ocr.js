const fs = require('fs');
const tesseract = require('node-tesseract');

module.exports = {
  recognize: function (imagePath) {
    return new Promise((resolve, reject) => {
      tesseract.process(imagePath, function (err, text) {
        if (err) {
          reject(err);
        }
        resolve(text);
      });
    })
  },

  write2Log: function (filePath, info) {
    try {
      fs.appendFile(filePath, info + "\r\n", (err) => {
        if (err) {
          throw (err);
        } else {
        }
      });
    } catch (err) {
      throw (err);
    }
  }
}