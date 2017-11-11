const fs = require('fs');
const superagent = require('superagent');
const tesseract = require('node-tesseract');
const ocr = require('./ocr');

module.exports = {
  download: function (url) {
    return new Promise(async (resolve, reject) => {
      try {
        let filePath = `./static/uploads/${Date.now()}.jpg`;
        await saveFile(url, filePath);

        let text = await ocr.recognize(filePath);

        resolve({
          status: true,
          text: text,
          url: url
        });

        let log = `[${new Date().toLocaleString()}], download: ${url}`;
        ocr.write2Log('./log.txt', log);
      } catch (err) {
        // reject(err);
        resolve({
          status: false,
          text: err.message,
          url: url,
        });
      }
    })
  }
}

function saveFile(target, filePath) {
  return new Promise((resolve, reject) => {
    try {
      superagent
        .get(target)
        .responseType('blob')
        .end(function (err, res) {
          if (err) {
            reject(err);
          } else {
            // save image to local disk
            fs.writeFile(filePath, res.body, 'binary', function (err) {
              if (err) throw err;
              resolve();
            });
          }
        });
    } catch (err) {
      reject(err);
    }
  })
}
